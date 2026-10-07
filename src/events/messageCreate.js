const { Events, EmbedBuilder } = require('discord.js');
const { addXP } = require('../utils/levelSystem');
const { getCountingConfig, updateCounting } = require('../utils/countingManager');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // Ignore les messages du bot et les messages privés
        if (message.author.bot || !message.guild) return;

        // ─────────────────────────────────────────────
        // Système de Counting
        // ─────────────────────────────────────────────
        const counting = getCountingConfig(message.guild.id);

        if (counting.channelId && message.channel.id === counting.channelId) {
            const content = message.content.trim();
            const number = parseInt(content, 10);
            const expected = counting.current + 1;

            // 1. Ce n'est pas un nombre entier valide → suppression silencieuse
            if (isNaN(number) || String(number) !== content) {
                try { await message.delete(); } catch { /* ignoré */ }
                return; // On ne donne pas d'XP et on s'arrête
            }

            // 2. Le même utilisateur tente de compter deux fois de suite
            if (counting.lastUser === message.author.id) {
                try { await message.delete(); } catch { /* ignoré */ }

                const sameUserEmbed = new EmbedBuilder()
                    .setTitle('⛔ Tu ne peux pas compter deux fois de suite !')
                    .setDescription(`${message.author}, laisse un autre membre compter avant toi.\nProchain nombre attendu : **${expected}**`)
                    .setColor(0xED4245)
                    .setTimestamp();

                const warn = await message.channel.send({ embeds: [sameUserEmbed] });
                setTimeout(() => warn.delete().catch(() => {}), 7000);
                return;
            }

            // 3. Le nombre est incorrect
            if (number !== expected) {
                try { await message.delete(); } catch { /* ignoré */ }

                const wrongEmbed = new EmbedBuilder()
                    .setTitle('❌ Mauvais nombre !')
                    .setDescription(
                        `${message.author} a écrit **${number}** mais le nombre attendu est **${expected}**.\n\n` +
                        `Le compteur reste à **${counting.current}**, continuez depuis **${expected}** !`
                    )
                    .setColor(0xED4245)
                    .setFooter({ text: `Prochain nombre attendu : ${expected}` })
                    .setTimestamp();

                const warn = await message.channel.send({ embeds: [wrongEmbed] });
                setTimeout(() => warn.delete().catch(() => {}), 7000);
                return;
            }

            // 4. ✅ Nombre correct — on valide
            updateCounting(message.guild.id, number, message.author.id);

            try {
                await message.react('✅');
            } catch { /* ignoré si pas de permission */ }

            // On ne donne pas d'XP pour éviter les abus dans ce salon
            return;
        }

        // ─────────────────────────────────────────────
        // Système de niveaux (hors salon counting)
        // ─────────────────────────────────────────────
        const leveledUp = addXP(message.author.id, message.guild.id, 10);

        if (leveledUp) {
            message.reply(
                `🎉 Félicitations ${message.author.username}, tu es passé au **niveau ${leveledUp.level}** !`
            );
        }
    },
};