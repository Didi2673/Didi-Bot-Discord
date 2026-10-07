const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getUserData, saveLevels, updateLevelFromTotal } = require('../../utils/levelSystem.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xp')
        .setDescription('Gérer l\'XP des utilisateurs')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Réservé aux admins
        .addSubcommand(sub =>
            sub.setName('add')
                .setDescription('Ajouter de l\'XP à un utilisateur')
                .addUserOption(opt => opt.setName('cible').setDescription('L\'utilisateur').setRequired(true))
                .addIntegerOption(opt => opt.setName('montant').setDescription('Montant d\'XP').setRequired(true)))
        .addSubcommand(sub =>
            sub.setName('remove')
                .setDescription('Retirer de l\'XP à un utilisateur')
                .addUserOption(opt => opt.setName('cible').setDescription('L\'utilisateur').setRequired(true))
                .addIntegerOption(opt => opt.setName('montant').setDescription('Montant d\'XP').setRequired(true)))
        .addSubcommand(sub =>
            sub.setName('set')
                .setDescription('Définir l\'XP totale d\'un utilisateur')
                .addUserOption(opt => opt.setName('cible').setDescription('L\'utilisateur').setRequired(true))
                .addIntegerOption(opt => opt.setName('montant').setDescription('Montant d\'XP').setRequired(true)))
        .addSubcommand(sub =>
            sub.setName('reset')
                .setDescription('Réinitialiser l\'XP d\'un utilisateur')
                .addUserOption(opt => opt.setName('cible').setDescription('L\'utilisateur').setRequired(true))),

    async execute(interaction) {
        const sub = interaction.options.getSubcommand();
        const target = interaction.options.getUser('cible');
        const amount = interaction.options.getInteger('montant');
        const guildId = interaction.guild.id;
        const userData = getUserData(target.id, guildId);

        let message = "";

        if (sub === 'add') {
            userData.totalXP = (userData.totalXP || 0) + amount;
            updateLevelFromTotal(target.id, guildId);
            message = `✅ Ajouté **${amount} XP** à ${target.username}.`;
        } 
        
        else if (sub === 'remove') {
            userData.totalXP = Math.max(0, (userData.totalXP || 0) - amount);
            updateLevelFromTotal(target.id, guildId);
            message = `⚠️ Retiré **${amount} XP** à ${target.username}. Son niveau a été recalculé.`;
        } 
        
        else if (sub === 'set') {
            userData.totalXP = amount;
            updateLevelFromTotal(target.id, guildId);
            message = `⚙️ XP de ${target.username} définie à **${amount}**.`;
        } 
        
        else if (sub === 'reset') {
            userData.totalXP = 0;
            userData.xp = 0;
            userData.level = 1;
            saveLevels();
            message = `🔄 Progression de ${target.username} réinitialisée.`;
        }

        await interaction.reply({ content: message, ephemeral: true });
    },
};