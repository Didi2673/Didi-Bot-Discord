const { handleTicketReasonSelection, handleTicketButton } = require('../handlers/ticketHandler');

module.exports.handleTicketInteraction = async (interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === 'ticket-reason') {
        // Gérer la sélection de la raison du ticket
        handleTicketReasonSelection(interaction);
    }

    if (interaction.isButton()) {
        // Gérer les boutons d'acceptation/refus du ticket
        handleTicketButton(interaction);
    }
};
