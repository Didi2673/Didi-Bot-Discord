const fs = require('fs');
const path = require('path');

// Le chemin pointe vers src/data/guildConfig.json
const filePath = path.resolve(__dirname, '../data/guildConfig.json');

if (!fs.existsSync(filePath)) {
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify({}));
}

function getFileData() {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function setLogChannel(guildId, channelId) {
    const config = getFileData();
    if (!config[guildId]) config[guildId] = {};
    config[guildId].logChannel = channelId;
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
}

function getLogChannel(guildId) {
    const config = getFileData();
    return config[guildId]?.logChannel || null;
}

module.exports = { setLogChannel, getLogChannel };