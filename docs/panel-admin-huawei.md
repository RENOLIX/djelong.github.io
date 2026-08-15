# Panneau administrateur Djelong

Le panneau est disponible a l'adresse `https://djelong.com/admin` apres publication.

## Architecture

- Le site et le panneau React sont heberges sur OBS.
- L'API `serverless/news-api` est executee sur Huawei FunctionGraph.
- Huawei RDS MySQL conserve les comptes et les actualites.
- Les images de couverture sont stockees dans OBS puis leur URL est renseignee depuis le panneau.

## Deploiement Huawei

1. Creer une instance **RDS MySQL 8.0** dans `AF-Johannesburg`, dans le meme VPC que la fonction.
2. Dans DAS, executer `serverless/news-api/schema.sql`.
3. Creer l'utilisateur API dans MySQL et lui donner les droits uniquement sur la base `djelong`.
4. Dans `serverless/news-api`, lancer `npm install`, puis compresser le contenu du dossier avec `node_modules`.
5. Creer une fonction Huawei FunctionGraph Node.js, importer l'archive et utiliser `index.handler` comme handler.
6. Ajouter les variables de `.env.example` dans la configuration FunctionGraph, sans jamais les placer dans Git.
7. Relier la fonction a API Gateway avec ces routes : `POST /auth/login`, `GET /news`, `GET|POST /admin/news`, `PATCH|DELETE /admin/news/{id}`.
8. Ajouter l'URL API Gateway dans l'environnement du site : `VITE_NEWS_API_URL=https://api.djelong.com/api`, puis executer `npm run build:huawei`.

## Premier compte administrateur

Le premier compte doit etre cree uniquement apres le choix du mot de passe definitif. Le mot de passe est hache avec bcrypt avant insertion dans la table `admin_users`; il ne doit jamais etre enregistre en clair.
