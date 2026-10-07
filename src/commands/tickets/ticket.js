const { ActionRowBuilder, StringSelectMenuBuilder, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const { createTicketMessage } = require('../../handlers/ticketHandler');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Créer un ticket"),


    async execute(interaction) {
        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('ticket-reason')
                .setPlaceholder('Choisissez la raison du ticket')
                .addOptions(
                    { label: 'Problème technique', value: 'technical' },
                    { label: 'Problème de compte', value: 'account' },
                    { label: 'Autre', value: 'other' }
                )
        )
        await interaction.reply({
            content: 'Cliquez sur le sélecteur pour créer un ticket.',
            components: [row],
        });
    }
        // Envoyer le message dans le canal où la commande est utilisée
};
