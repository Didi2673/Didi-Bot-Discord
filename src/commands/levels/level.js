const { SlashCommandBuilder } = require('@discordjs/builders');
const { getUserData } = require('../../utils/levelSystem.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Affiche votre niveau et XP actuel.'),

    async execute(interaction) {
        const userData = getUserData(interaction.user.id, interaction.guild.id);
        await interaction.reply(`🎮 Tu es au niveau ${userData.level} avec ${userData.xp} XP.`);
    },
};
