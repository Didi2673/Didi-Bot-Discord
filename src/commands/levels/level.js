const { SlashCommandBuilder } = require('@discordjs/builders');
const { getUserData } = require('../../utils/levelSystem.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Affiche votre niveau et XP actuel.'),

    async execute(interaction) {
        const userData = getUserData(interaction.user.id, interaction.guild.id);
        // On affiche maintenant les deux informations
        await interaction.reply(
            `🎮 **Niveau :** ${userData.level}\n` +
            `✨ **XP palier :** ${userData.xp} / ${userData.level * 100}\n` +
            `🏆 **XP Totale :** ${userData.totalXP || userData.xp}`
        );
    },
};