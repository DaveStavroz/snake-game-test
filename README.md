# 🐍 Snake Game - Test Project

## 📋 Description
Jeu Snake simple développé en HTML5/CSS3/JavaScript pour tester l'environnement de développement.

## 🚀 Fonctionnalités
- ✅ Jeu Snake classique
- ✅ Score et High Score persistant
- ✅ Interface moderne et responsive
- ✅ Contrôles clavier (flèches)
- ✅ Boutons Start/Pause/Reset

## 🛠️ Technologies
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Canvas**: HTML5 Canvas pour le rendu
- **Storage**: LocalStorage pour le high score

## 📦 Installation et lancement

### Prérequis
- Navigateur web moderne
- Serveur HTTP local (optionnel)

### Lancement rapide
```bash
# Option 1: Ouvrir directement index.html dans le navigateur
open index.html

# Option 2: Serveur HTTP simple avec Python
python -m http.server 8000
# Puis aller sur http://localhost:8000

# Option 3: Serveur HTTP avec Node.js
npx http-server
```

## 🎮 Comment jouer
1. Cliquez sur "Démarrer"
2. Utilisez les flèches du clavier pour diriger le serpent
3. Mangez la nourriture rouge pour grandir
4. Évitez les murs et votre propre corps
5. Battez votre high score !

## 🏗️ Structure du projet
```
snake-game-test/
├── index.html              # Page principale
├── src/
│   ├── game.js             # Logique du jeu
│   └── style.css           # Styles CSS
├── assets/                 # Assets (images, sons)
├── docs/                   # Documentation
├── tests/                  # Tests (à implémenter)
├── scripts/                # Scripts d'automatisation
└── README.md              # Ce fichier
```

## 🔧 Développement

### Branches Git
- `main`: Version stable
- `feature/*`: Nouvelles fonctionnalités
- `bugfix/*`: Corrections de bugs
- `hotfix/*`: Corrections urgentes

### Workflow de développement
```bash
# Créer une nouvelle fonctionnalité
git checkout -b feature/nouvelle-fonctionnalite
git add .
git commit -m "feat: ajouter nouvelle fonctionnalité"
git push -u origin feature/nouvelle-fonctionnalite

# Merger vers main
git checkout main
git merge feature/nouvelle-fonctionnalite
git push origin main
```

## 📈 Améliorations futures
- [ ] Système de niveaux
- [ ] Effets sonores
- [ ] Animations CSS
- [ ] Mode multijoueur
- [ ] Sauvegarde cloud des scores
- [ ] Tests automatisés
- [ ] PWA (Progressive Web App)

## 🧪 Tests
```bash
# Tests à implémenter
npm test
```

## 📝 Changelog
### v1.0.0 (2025-09-26)
- ✅ Jeu Snake fonctionnel
- ✅ Interface utilisateur
- ✅ Système de score
- ✅ Contrôles clavier

## 👨‍💻 Auteur
**DaveStavroz** - Projet de test environnement de développement

## 📄 Licence
MIT License - Voir LICENSE pour plus de détails.
