module.exports.createTicketChannel = async (guild, member) => {
    const ticketChannel = await guild.channels.create({
        name: `ticket-${member.username}`,
        type: 'GUILD_TEXT',
        permissionOverwrites: [
            {
                id: guild.id,
                deny: ['VIEW_CHANNEL'], // Refuser l'accès au canal général
            },
            {
                id: member.id,
                allow: ['VIEW_CHANNEL'], // Permettre à l'utilisateur d'accéder
            },
            {
                id: guild.roles.cache.find(role => role.id === '1219032087756148816').id,
                allow: ['VIEW_CHANNEL'], // Permettre aux membres du staff d'accéder
            },
        ],
    });

    return ticketChannel;
};
