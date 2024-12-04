# Exemple d'Authentication avec JWT

Ce projet est une application de démonstration pour montrer comment implémenter l'authentification à l'aide de JSON Web Tokens (JWT) avec Node.js et Express.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

## Installation

1. Installez les dépendances :

```sh
npm install
```

2. Configurez les variables d'environnement :

- Créez un fichier `.env` à la racine du projet en copiant le contenu de `.env.sample` :

```sh
cp .env.sample .env
```

- Remplissez les variables `JWT_SECRET`, `JWT_LIFETIME`, et `COOKIE_SECRET` dans le fichier [`.env`](./.env).

## Utilisation

### En développement

Pour démarrer le serveur en mode développement avec `nodemon`, exécutez :

```sh
npm run dev
```

### En production

Pour démarrer le serveur en mode production, exécutez :

```sh
npm start
```

### Structure du projet

- **public/** : Contient les fichiers statiques (HTML, CSS, JS).
- **src/** : Contient le code source de l'application.
  - **controllers/** : Logique des contrôleurs.
  - **errors/** : Gestion des erreurs personnalisées.
  - **middlewares/** : Middlewares Express.
  - **routes/** : Définition des routes.

### Routes de l'API

- **POST /api/v1/login** : Authentifie un utilisateur.
- **GET /api/v1/dashboard** : Accède au tableau de bord (protégé).

### Licence

Ce projet est sous licence ISC.
