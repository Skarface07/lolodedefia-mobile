# Lɔlɔ̃dedefia Fe Do — Application mobile (Expo / React Native)

Application mobile de mise en relation entre familles/entreprises et jeunes
prestataires. **Deux parcours distincts** cohabitent dans une seule app, avec
un choix de profil à la connexion — comme demandé.

## 🚀 Installation

Prérequis : [Node.js](https://nodejs.org/) (v18 ou plus) et npm installés.

```bash
cd lolodedefia-mobile
npm install
npm start
```

Scannez le QR code avec l'app **Expo Go** (Android/iOS), ou `npm run android` / `npm run ios` / `npm run web`.

## 🧭 Parcours de démonstration

1. **Écran de bienvenue** → « Commencer »
2. **Choix du profil** : Famille/Entreprise ou Jeune prestataire
3. **Connexion** : numéro de téléphone → code à 4 chiffres (n'importe lequel fonctionne, c'est une démo sans backend)
4. Vous arrivez sur l'espace correspondant à votre choix

### Côté Famille / Entreprise
Accueil (catalogue de services) → **Nouvelle demande** (formulaire) → **Prestataires proposés** → **Profil du prestataire** → confirmation → **Suivi de la mission** (timeline de statut) → **Évaluation** post-mission. Onglets : Accueil, Mes demandes, Messages, Compte.

### Côté Jeune prestataire
Accueil (nouvelles propositions + missions en cours) → **Détail de mission** (accepter/refuser) → **Pointage** arrivée/départ → **Alerte SOS** → **Évaluation de la famille**. Onglets : Accueil, Planning (disponibilités/zones), Passeport (QR code, badges, historique), Compte (avec Académie en ligne).

Une mission de démonstration est préchargée (« Garde d'enfants », Adidogomé), visible immédiatement côté Jeune (Kokou Mensah) dès la connexion.

## 📁 Structure du projet

```
lolodedefia-mobile/
├── App.js                      # Point d'entrée (Providers + RootNavigator)
├── src/
│   ├── context/
│   │   ├── AuthContext.js      # Rôle choisi, connexion, utilisateur courant
│   │   └── MissionsContext.js  # Données de missions partagées (démo en mémoire)
│   ├── navigation/
│   │   ├── RootNavigator.js    # Bascule Auth / Famille / Jeune
│   │   ├── AuthNavigator.js    # Bienvenue, choix du profil, connexion, OTP
│   │   ├── FamilyTabs.js + FamilyNavigator.js
│   │   └── YouthTabs.js + YouthNavigator.js
│   ├── screens/
│   │   ├── auth/                     # Welcome, RoleSelect, PhoneLogin, Otp
│   │   ├── family/                   # 9 écrans du parcours famille
│   │   └── youth/                    # 10 écrans du parcours jeune
│   ├── components/              # Header, SearchBar, PromoBanner, ServiceGrid...
│   ├── theme/theme.js           # Couleurs, espacements, typographie
│   └── data/demoData.js         # Données de démonstration (catalogue de services)
```

## 🎨 Palette

Reprise de l'identité visuelle de l'association DZIDZƆ ƑE XƆSE :
- Vert principal : `#0F5C33`
- Or / accent : `#C9A227`
- Fond clair : `#F7F8FA`

## 🔜 Prochaines étapes suggérées

1. Brancher `AuthContext` et `MissionsContext` sur l'API du backend Spring Boot (remplacer les données en mémoire).
2. Authentification réelle par SMS (OTP).
3. Vraie génération de QR code sur l'écran Passeport (actuellement un visuel statique).
4. Géolocalisation réelle pour le pointage (actuellement simulée par un simple bouton).
5. Notifications push (nouvelle proposition de mission, confirmation, etc.).
6. Paiement intégré (Mobile Money).

## 🛠️ Stack technique prévue pour l'ensemble du projet

- **Mobile** : React Native (Expo) — ce dossier
- **Backend** : Spring Boot (API REST)
- **Base de données** : MySQL (via XAMPP en développement local)
- **Web admin** : à concevoir dans un second temps

