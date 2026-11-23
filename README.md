# Nintendo Shrine 🍄

Site fan non officiel dédié à l'univers Nintendo : héros des licences, frise
des consoles, histoire de l'entreprise et quiz interactif.

> Avertissement : projet de fan créé pour le plaisir. Nintendo et toutes les
> licences associées sont des marques de Nintendo Co., Ltd. Ce site n'est ni
> affilié ni approuvé par Nintendo. Tous les visuels sont dessinés en CSS,
> aucun asset officiel n'est utilisé.

## Contenu

- `index.html` — structure de la page (hero, stats, licences, consoles, timeline, quiz, footer)
- `styles.css` — styles, thème « rouge Nintendo », animations et responsive
- `script.js` — interactions : menu mobile, reveal au scroll, compteurs animés, carrousel des consoles, quiz

## Lancer le site

Aucune dépendance ni build : c'est du HTML/CSS/JS statique.

```bash
# avec Python
python3 -m http.server 8000
# ou avec Node
npx serve .
```

Puis ouvrir http://localhost:8000.

## Publication

Le site peut être publié gratuitement avec **GitHub Pages** :
`Settings → Pages → Source: Deploy from a branch → main / (root)`.
