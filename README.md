# didibot

Voici le code de mon bot discord en js.

## Les dépendances

voici les commandes à taper sur le terminal pour installer des dépendances :
`npm install discord.js`
`npm install @discordjs/rest`
`npm install fs`
`npm install path`


## Les scripts

### index

le fichier `index.js` est le fichier à exécuter pour démarrer le bot à l'aide de la commande `node index.js`.
Ce fichier contient le code permettant de trouver les commandes, les events et de démarrer le bot.

### deploy-commands

Le fichier `deploy-commands.js` est à exécuter quand une nouvelle commande a été créée à l'aide de la commande `node deploy-commands.js`. 
Ce fichier va actualiser la liste de toutes les commandes du bot.

### les commandes

toutes les commandes se situent dans le répertoire `/commands`
Les commandes sont triées par catégories, voici les catégories :
`/commands/funs` : les commandes de fun
`/commands/infos` : les commandes permettant d'avoir accès aux infos du serveur ou d'un membre
`/commands/mods` : les commandes de modération de base

### les events

les évènements se situent dans le répertoire `/events`
le fichier `/events/ready.js` affiche dans la console un message pour indiquer que le bot a bien démarré
le fichier `/events/interactionCreate.js` permet de vérifier si une commande existe ou non, quand l'utilisateur tape une commande incorrecte, ce fichier va afficher dans la console l'erreur.

### config

le fichier `config.json` contient l'id du serveur, l'id du bot et son token.
Ce fichier permet de stocker des variables qui seront utilisées partout dans le projet.
