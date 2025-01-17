const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../data/levels.json');
if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify({}));
}

const levels = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function saveLevels() {
    fs.writeFileSync(filePath, JSON.stringify(levels, null, 2));
}

function getUserData(userId, guildId) {
    if (!levels[guildId]) levels[guildId] = {};
    if (!levels[guildId][userId]) levels[guildId][userId] = { xp: 0, level: 1 };
    return levels[guildId][userId];
}

function addXP(userId, guildId, xpToAdd) {
    const userData = getUserData(userId, guildId);
    userData.xp += xpToAdd;

    const nextLevelXP = userData.level * 100;
    if (userData.xp >= nextLevelXP) {
        userData.level += 1;
        userData.xp -= nextLevelXP;
        saveLevels();
        return userData;
    }

    saveLevels();
    return null;
}

module.exports = {
    addXP,
    getUserData,
};
