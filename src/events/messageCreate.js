const { addXP } = require('../utils/levelSystem');

module.exports = {
    async execute(message, client) {
        // Ignore les messages du bot
        if (message.author.bot) return;

        // Ajoute des XP à l'utilisateur
        const userData = addXP(message.author.id, message.guild.id, 10);

        // Si le niveau de l'utilisateur augmente, on peut envoyer un message
        if (userData && userData.level > 1) {
            message.channel.send(
                `🎉 ${message.author.username} est maintenant au niveau ${userData.level} !`
            );
        }
    },
};
