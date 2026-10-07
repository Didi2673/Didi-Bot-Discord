// src/events/voiceStateUpdate.js
const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.VoiceStateUpdate,
    execute(oldState, newState) {
        if (!oldState.channel && newState.channel) {
            sendLog(newState.guild, "🎙️ Vocal", `${newState.member} a rejoint ${newState.channel}`, "#00FF00");
        } else if (oldState.channel && !newState.channel) {
            sendLog(oldState.guild, "🎙️ Vocal", `${oldState.member} a quitté ${oldState.channel}`, "#FF0000");
        }
    }
};