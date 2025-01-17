const { SlashCommandBuilder, MessageEmbed } = require('discord.js');

const responses = [
    'For sure.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes definitely.',
    'You can count on it.',
    'As I see it, yes.',
    'Probably.',
    'Prospects are good.',
    'Yes.',
    'The signs point to yes.',
    'Fuzzy response, try again.',
    'Ask later.',
    'I can\'t predict it at the moment.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My answer is no.',
    'The outlook is not so good.',
    'Very doubtful.'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask a question to the magic 8ball.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question you want to ask the magic 8ball.')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');

        const response = responses[Math.floor(Math.random() * responses.length)];

        const answerEmbed = {
            color: 3447003,
            title: 'Magic 8-Ball',
            fields: [
                {
                    name: 'Question',
                    value: question
                },
                {
                    name: 'Answer',
                    value: response
                }
            ]
        };

        await interaction.reply({ embeds: [answerEmbed] });

    },
};

