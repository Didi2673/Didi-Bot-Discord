const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.GuildMemberUpdate,
    execute(oldMember, newMember) {
        // Log du Timeout (Mute moderne)
        if (!oldMember.communicationDisabledUntil && newMember.communicationDisabledUntil) {
            sendLog(newMember.guild, "🔇 Membre Mute (Timeout)", `${newMember.user.tag} est mute jusqu'au ${newMember.communicationDisabledUntil}`, "#FF0000");
        }
        if (oldMember.communicationDisabledUntil && !newMember.communicationDisabledUntil) {
            sendLog(newMember.guild, "🔊 Membre Demute", `${newMember.user.tag} peut de nouveau parler.`, "#00FF00");
        }

        // Log du Boost
        if (!oldMember.premiumSince && newMember.premiumSince) {
            sendLog(newMember.guild, "🚀 Nouveau Boost !", `${newMember.user.tag} vient de booster le serveur !`, "#FF73FA");
        }
    }
};