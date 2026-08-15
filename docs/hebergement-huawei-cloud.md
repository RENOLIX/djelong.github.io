# Heberger Djelong Papiers sur Huawei Cloud

Le site est une application React statique. La solution adaptee est **Huawei Cloud OBS** avec un domaine personnalise et, pour une diffusion plus rapide, **Huawei Cloud CDN**.

## 1. Generer la version Huawei

Depuis le dossier du projet :

```powershell
npm run build:huawei
```

Le dossier `dist` contient la version a publier. Cette commande utilise `/` comme chemin de base afin que les images, styles et scripts fonctionnent sur le domaine Huawei.

## 2. Creer le stockage OBS

1. Dans Huawei Cloud, ouvrir **Object Storage Service (OBS)** puis creer un bucket, par exemple `djelong-papiers-web`.
2. Choisir la region la plus proche des visiteurs et activer le chiffrement par defaut si le compte le propose.
3. Importer le **contenu** du dossier `dist` a la racine du bucket : `index.html`, `assets/`, `images/`, etc. Ne pas importer le dossier `dist` comme sous-dossier.
4. Dans **Basic Configurations > Static Website Hosting**, activer l'hebergement statique.
5. Renseigner `index.html` comme document d'index et aussi comme document d'erreur. Cela permet aux liens directs comme `/a-propos` ou `/contact` de revenir correctement dans l'application React.

## 3. Rendre le site accessible sur le domaine

Huawei recommande un domaine personnalise pour un site OBS. Il est possible de relier un sous-domaine tel que `www.djelongpapiers.com` au bucket, puis de creer le CNAME indique dans le DNS du domaine.

Pour une version professionnelle, ajouter Huawei Cloud CDN :

1. Ajouter le domaine dans **CDN > Domains**.
2. Choisir le bucket OBS comme origine et cocher **Static website hosting**.
3. Activer HTTPS avec un certificat SSL pour le domaine.
4. Pointer le CNAME fourni par Huawei CDN dans le DNS du domaine.

## 4. Avant l'ouverture officielle

- Verifier l'accueil, les pages A propos, Actualites et Contact sur mobile et ordinateur.
- Tester une URL directe, par exemple `https://votre-domaine.fr/contact`.
- Apres chaque mise a jour : lancer `npm run build:huawei`, remplacer le contenu du bucket par le nouveau `dist`, puis purger le cache CDN.

## Informations necessaires pour le publier pour de vrai

- L'acces au compte Huawei Cloud qui contient OBS.
- La region du bucket.
- Le nom de domaine choisi ou achete.
- L'acces DNS du domaine pour ajouter le CNAME.
