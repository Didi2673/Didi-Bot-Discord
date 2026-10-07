const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { createTicketChannel } = require('../utils/ticketUtils');

module.exports.handleTicketReasonSelection = async (interaction) => {
    const reason = interaction.values[0];
    const member = interaction.user;
    const guild = interaction.guild;

    // Créer un salon privé pour le ticket
    const ticketChannel = await createTicketChannel(guild, member);

    // Envoyer un message dans le salon du ticket
    await ticketChannel.send(`Ticket créé pour ${member.username} concernant : ${reason}`);

    // Notifier le staff
    const staffChannel = guild.channels.cache.get('1223004925621960840');
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('accept-ticket')
            .setLabel('Accepter')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId('deny-ticket')
            .setLabel('Refuser')
            .setStyle(ButtonStyle.Danger)
    );

    await staffChannel.send({
        content: `Un nouveau ticket a été créé par ${member.username}.`,
        components: [row],
    });

    // Répondre à l'utilisateur
    await interaction.reply({
        content: 'Votre ticket a été créé ! Un membre du staff va bientôt le traiter.',
        ephemeral: true,
    });
};

module.exports.handleTicketButton = async (interaction) => {
    const { customId, member, channel } = interaction;

    if (customId === 'accept-ticket') {
        // Créer un salon privé pour l'utilisateur
        const ticketChannel = await createTicketChannel(interaction.guild, member);

        await ticketChannel.send(`Le ticket de ${member.username} a été accepté.`);
        await interaction.reply({ content: 'Ticket accepté et salon privé créé!', ephemeral: true });

    } else if (customId === 'deny-ticket') {
        // Refuser le ticket et fermer le salon
        await interaction.reply({ content: 'Ticket refusé.', ephemeral: true });
        await channel.delete(); // Supprimer le salon du ticket
    }
};
