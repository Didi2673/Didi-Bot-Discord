const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { setLogChannel } = require('../../utils/configManager.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlogs')
        .setDescription('Définit le salon des logs système')
        .addChannelOption(opt => opt.setName('salon').setDescription('Le salon de log').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channel = interaction.options.getChannel('salon');
        setLogChannel(interaction.guild.id, channel.id);
        await interaction.reply({ content: `✅ Salon des logs défini sur ${channel}.`, ephemeral: true });
    },
};