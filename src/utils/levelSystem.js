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
    // AJOUT : On initialise totalXP à 0 si l'utilisateur est nouveau
    if (!levels[guildId][userId]) levels[guildId][userId] = { xp: 0, totalXP: 0, level: 1 };
    return levels[guildId][userId];
}

function addXP(userId, guildId, xpToAdd) {
    const userData = getUserData(userId, guildId);
    
    // On met à jour les deux valeurs
    userData.xp += xpToAdd;
    userData.totalXP = (userData.totalXP || 0) + xpToAdd; // Utilise || 0 pour les anciens comptes

    const nextLevelXP = userData.level * 100;
    if (userData.xp >= nextLevelXP) {
        userData.level += 1;
        userData.xp -= nextLevelXP; // L'XP actuelle est reset, mais pas totalXP
        saveLevels();
        return userData;
    }

    saveLevels();
    return null;
}

function updateLevelFromTotal(userId, guildId) {
    const userData = getUserData(userId, guildId);
    let total = userData.totalXP || 0;
    let newLevel = 1;
    
    // On recalcule le niveau en fonction de l'XP totale
    // Palier Niv 1 -> 2 : 100 XP | Niv 2 -> 3 : 200 XP, etc.
    while (total >= newLevel * 100) {
        total -= newLevel * 100;
        newLevel++;
    }
    
    userData.level = newLevel;
    userData.xp = total;
    saveLevels();
    return userData;
}

module.exports = {
    addXP,
    getUserData,
    saveLevels, // On l'exporte pour pouvoir modifier les données directement
    updateLevelFromTotal
};