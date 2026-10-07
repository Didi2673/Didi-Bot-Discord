const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Affiche le top 10 des joueurs du serveur.'),

    async execute(interaction) {
        const filePath = path.resolve(__dirname, '../../data/levels.json');
        
        // Lecture du fichier JSON
        if (!fs.existsSync(filePath)) {
            return await interaction.reply("Aucune donnée de niveau n'a encore été enregistrée.");
        }

        const levels = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const guildId = interaction.guild.id;

        // Vérifier si le serveur a des données
        if (!levels[guildId]) {
            return await interaction.reply("Personne n'a encore gagné d'XP sur ce serveur !");
        }

        // Transformer l'objet en tableau pour le trier
        const sortedUsers = Object.entries(levels[guildId])
            .map(([userId, data]) => ({
                userId,
                totalXP: data.totalXP || data.xp, // Fallback si totalXP n'existe pas encore
                level: data.level
            }))
            .sort((a, b) => b.totalXP - a.totalXP) // Tri du plus grand au plus petit
            .slice(0, 10); // Garder le top 10

        // Construction de l'affichage
        let description = "";
        for (let i = 0; i < sortedUsers.length; i++) {
            const user = sortedUsers[i];
            // On essaie de récupérer le pseudo, sinon on affiche "Utilisateur Inconnu"
            const member = await interaction.guild.members.fetch(user.userId).catch(() => null);
            const name = member ? member.user.username : `Utilisateur #${user.userId}`;
            
            description += `**${i + 1}.** ${name} — Niv. **${user.level}** (${user.totalXP} XP total)\n`;
        }

        const embed = new EmbedBuilder()
            .setTitle(`🏆 Classement de ${interaction.guild.name}`)
            .setColor('#F1C40F')
            .setDescription(description || "Le classement est vide.")
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};