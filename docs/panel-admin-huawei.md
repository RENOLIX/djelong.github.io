# Panneau administrateur Djelong

Le panneau est disponible a l'adresse `https://djelong.com/admin` apres publication.

## Architecture

- Le site et le panneau React sont heberges sur OBS.
- L'API `serverless/news-api` est executee sur Huawei FunctionGraph.
- Les actualites sont stockees dans `admin/news.json` dans le bucket OBS.
- Les images de couverture sont stockees dans OBS puis leur URL est renseignee depuis le panneau.

## Deploiement Huawei

1. Compresser les fichiers du dossier `serverless/news-api` sans `node_modules` : FunctionGraph fournit son client OBS Node.js.
2. Creer une fonction Huawei FunctionGraph Node.js, importer l'archive et utiliser `index.handler` comme handler.
3. Creer une cle IAM limitee au bucket `djelong-papiers-web-2026`, ou attribuer une agence FunctionGraph avec les droits OBS de lecture/ecriture sur ce bucket.
4. Generer le hash du mot de passe avec `node generate-password-hash.mjs "votre-mot-de-passe"`, puis ajouter les variables de `.env.example` dans FunctionGraph. Ne jamais placer de secret dans Git.
5. Relier la fonction a API Gateway avec ces routes : `POST /auth/login`, `GET /news`, `GET|POST /admin/news`, `PATCH|DELETE /admin/news/{id}`.
6. Ajouter l'URL API Gateway dans l'environnement du site : `VITE_NEWS_API_URL=https://api.djelong.com/api`, puis executer `npm run build:huawei`.

## Premier compte administrateur

Le compte est defini uniquement dans les variables Huawei. Le mot de passe est hache avec bcrypt avant d'etre place dans `ADMIN_PASSWORD_HASH`; il ne doit jamais etre enregistre en clair.
