# WikiKab — Consignes officielles de design

## 1. Objet du document

Ce document définit les règles de conception visuelle, UX et responsive de **WikiKab**, encyclopédie consacrée à la Kabylie.

Il sert de référence commune pour :

- le thème MediaWiki ;
- les TemplateStyles ;
- les infoboxes ;
- les navboxes ;
- les amboxes ;
- les tableaux ;
- les portails ;
- la page d’accueil ;
- les pages d’articles ;
- les pages de catégories ;
- les pages communautaires ;
- les composants mobiles ;
- l’affichage du kabyle en alphabet latin et en tifinagh.

L’objectif n’est pas de copier Wikipédia, mais de reprendre ses qualités fondamentales :

- lisibilité ;
- neutralité ;
- sobriété ;
- hiérarchie claire ;
- densité documentaire ;
- navigation efficace ;
- compatibilité avec de très longs articles.

WikiKab doit disposer d’une identité propre, inspirée de la Kabylie, sans tomber dans un design décoratif ou militant.

---

# 2. Principes fondamentaux

## 2.1. Priorité au contenu

Le contenu encyclopédique est prioritaire sur le décor.

Éviter :

- grands fonds illustrés ;
- animations inutiles ;
- dégradés lourds ;
- effets 3D ;
- cartes trop colorées dans le corps des articles ;
- interfaces de type réseau social.

## 2.2. Sobriété

Le design doit rester :

- clair ;
- institutionnel ;
- moderne ;
- léger ;
- facilement lisible.

## 2.3. Identité kabyle discrète

L’identité kabyle doit apparaître principalement dans :

- les noms en kabyle ;
- le tifinagh ;
- les cartes ;
- certains motifs géométriques très subtils ;
- les couleurs secondaires ;
- les portails ;
- les illustrations culturelles ;
- la typographie des titres secondaires.

Elle ne doit pas gêner la lecture.

## 2.4. Neutralité visuelle

Un sujet politique, historique ou controversé ne doit jamais recevoir une présentation visuelle qui suggère une prise de position de WikiKab.

---

# 3. Palette officielle

## 3.1. Couleurs principales

```css
:root {
  --wk-white: #ffffff;
  --wk-background: #ffffff;
  --wk-background-subtle: #f8f9fa;
  --wk-background-muted: #f2f3f5;

  --wk-text: #202122;
  --wk-text-secondary: #54595d;
  --wk-text-muted: #72777d;

  --wk-border: #a2a9b1;
  --wk-border-light: #eaecf0;

  --wk-link: #3366cc;
  --wk-link-hover: #2a4b8d;
  --wk-link-visited: #795cb2;
  --wk-link-missing: #ba0000;

  --wk-blue: #1f5f8b;
  --wk-blue-light: #eaf3f8;

  --wk-green: #3d7652;
  --wk-green-light: #eef6f0;

  --wk-ochre: #b47a3c;
  --wk-ochre-light: #fbf5ec;

  --wk-info: #3366cc;
  --wk-success: #14866d;
  --wk-warning: #ac6600;
  --wk-danger: #b32424;
}
```

## 3.2. Usage

### Bleu
Utiliser pour :

- liens ;
- actions ;
- navigation ;
- éléments interactifs ;
- accent principal du site.

### Vert
Utiliser avec modération pour :

- patrimoine naturel ;
- environnement ;
- succès ;
- certains portails géographiques.

### Ocre
Utiliser pour :

- histoire ;
- patrimoine ;
- archéologie ;
- éléments culturels.

### Rouge
Réservé aux :

- erreurs ;
- suppression ;
- danger ;
- liens vers pages inexistantes.

---

# 4. Typographie

## 4.1. Texte courant

```css
body {
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Arial,
    sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--wk-text);
}
```

## 4.2. Titres

```css
h1,
h2 {
  font-family:
    Georgia,
    "Times New Roman",
    serif;
}
```

## 4.3. Échelle typographique

```text
Body           16px
Small          14px
Metadata       12–13px

H1             32px
H2             24px
H3             20px
H4             17px
H5             16px
```

## 4.4. Hauteur de ligne

```text
Texte courant  1.55 à 1.65
Titres         1.2 à 1.3
Métadonnées    1.4
```

---

# 5. Kabyle latin et tifinagh

## 5.1. Kabyle latin

Tester systématiquement :

```text
č ḍ ǧ ḥ ɛ ɣ ṛ ṣ ṭ ẓ
```

## 5.2. Tifinagh

Exemple de pile :

```css
.lang-tfng {
  font-family:
    "Noto Sans Tifinagh",
    "Segoe UI Historic",
    sans-serif;
}
```

Ne jamais rendre le site dépendant d’une seule police.

## 5.3. Sous-titre kabyle

Sous le titre principal :

```text
Tizi Ouzou
Tizi Wezzu · ⵜⵉⵣⵉ ⵡⴻⵣⵣⵓ
```

Le sous-titre doit être :

- plus petit ;
- discret ;
- gris foncé ;
- facilement copiable.

---

# 6. Espacements

Base :

```text
4px
```

Échelle :

```text
4px
8px
12px
16px
24px
32px
48px
64px
```

Utiliser cette échelle dans tout le thème.

---

# 7. Grille générale du site

## 7.1. Desktop large

```text
┌────────────────────────────────────────────────────────────┐
│ Header                                                     │
├────────────┬─────────────┬────────────────────┬────────────┤
│ Navigation │ Sommaire    │ Article            │ Outils     │
│ principale │ sticky      │                    │ optionnels │
└────────────┴─────────────┴────────────────────┴────────────┘
```

Largeurs recommandées :

```text
Navigation      220–240px
Sommaire        190–220px
Article         680–960px
Outils          180–220px
```

## 7.2. Desktop standard

```text
Navigation + Article
```

Le sommaire peut être intégré dans la colonne gauche ou dans l’article.

## 7.3. Tablette

- sidebar réduite ;
- sommaire intégré ;
- infobox plus étroite ;
- article prioritaire.

## 7.4. Mobile

Ordre :

```text
Header
Titre
Sous-titre kabyle
Actions
Hatnote
Introduction
Infobox
Sommaire
Contenu
Références
Navboxes
Portails
Catégories
Footer
```

---

# 8. Header

## 8.1. Structure

```text
☰   WIKIKAB
    Encyclopédie de la Kabylie

[ Rechercher dans WikiKab.................... ]

FR | Taqbaylit | ⵜⵉⴼⵉⵏⴰⵖ

Créer un compte | Connexion
```

## 8.2. Règles

Le header doit être :

- blanc ;
- compact ;
- sticky uniquement si nécessaire ;
- sans grande hauteur ;
- responsive ;
- accessible au clavier.

---

# 9. Logo

Le logo doit fonctionner :

- en grand ;
- en petit ;
- monochrome ;
- sur fond blanc ;
- dans le favicon ;
- dans les miniatures sociales.

Éviter un logo trop détaillé.

Prévoir :

```text
logo complet
symbole
favicon
version monochrome
version sombre
```

---

# 10. Barre latérale principale

## Explorer

```text
Accueil
Kabylie
Histoire
Géographie
Villages
Langue kabyle
Culture
Patrimoine
Personnalités
Société
Politique et institutions
```

## Découvrir

```text
Article au hasard
Chronologie
Cartes
Galeries
Portails
Listes
```

## Participer

```text
Contribuer
Créer un article
Articles à améliorer
Articles demandés
Ajouter une source
Ajouter une image
Communauté
```

## Outils

```text
Modifications récentes
Pages spéciales
Aide
```

---

# 11. Page d’article

## 11.1. Structure

```text
Titre
Sous-titre kabyle / tifinagh
Description courte

Onglets article

Hatnote éventuelle

Introduction
Infobox

Sommaire

Sections

Voir aussi
Notes et références
Bibliographie
Liens externes

Navboxes
Portails
Autorité
Catégories
```

## 11.2. Titre

Exemple :

```text
Kabylie
Tamurt n Leqbayel · ⵜⴰⵎⵓⵔⵜ ...
```

Sous le titre peut apparaître une description :

```text
Région historique, géographique et culturelle d’Afrique du Nord
```

---

# 12. Titres de sections

## H2

```text
Histoire
────────────────────────────────
```

## H3

Plus discret, sans bordure lourde.

Éviter :

- couleurs différentes à chaque niveau ;
- encadrés inutiles ;
- capitales systématiques.

---

# 13. Sommaire

## Desktop

Sommaire vertical.

Fonctions :

- sticky ;
- section active ;
- H2 visibles ;
- H3 repliables ;
- scrolling interne si très long.

## Mobile

Bouton :

```text
☰ Sommaire
```

Puis panneau repliable.

## Règles

- ne pas afficher plus de profondeur que nécessaire ;
- ne jamais dépasser visuellement le contenu principal ;
- garder les ancres stables.

---

# 14. Infobox — règles générales

## 14.1. Dimensions

Desktop :

```text
width: 300–340px
```

Mobile :

```text
width: 100%
float: none
```

## 14.2. Structure

```text
Titre
Nom kabyle
Tifinagh
Image
Légende

Bloc 1
Bloc 2
Bloc 3

Carte
Coordonnées
Site officiel
```

## 14.3. Style

```css
.wikikab-infobox {
  width: min(100%, 320px);
  float: right;
  margin: 0 0 1rem 1.5rem;
  border: 1px solid var(--wk-border);
  background: var(--wk-background-subtle);
  font-size: 0.9rem;
}
```

## 14.4. Mobile

```css
@media (max-width: 720px) {
  .wikikab-infobox {
    float: none;
    width: 100%;
    max-width: none;
    margin: 1rem 0;
  }
}
```

---

# 15. Infobox Commune / Village

Blocs :

```text
Identité
Administration
Géographie
Population
Langues
Patrimoine
Organisation traditionnelle
Coordonnées
```

Pour un village :

```text
Village
Nom kabyle
Tifinagh

Commune
Daïra
Wilaya

Tajmaɛt
Aṛc
Confédération

Population
Altitude
Coordonnées
```

---

# 16. Infobox Tajmaɛt

Structure :

```text
TAJMAƐT
Nom local
Nom tifinagh

Village
Commune
Aṛc
Confédération

Organisation
Composition
Mode de désignation

Compétences
Qanun
Biens communs
Médiation

Période
Statut actuel

Sources
```

Le style doit différencier les blocs sans donner l’impression d’une administration moderne lorsque ce n’est pas le cas.

---

# 17. Infobox Aṛc / Arch

Blocs :

```text
Identité
Territoire historique
Villages
Confédération
Organisation
Histoire
Événements
Cartographie
Sources
```

---

# 18. Infobox Personnalité politique

Structure :

```text
Nom
Nom kabyle
Photo

Fonctions
Mandats
Institution

Naissance
Formation
Profession

Parti
Mouvement
Groupe

Distinctions
Autorité
```

Les fonctions doivent pouvoir être répétées.

---

# 19. Infobox Parti politique

Structure :

```text
Nom
Sigle
Logo
Nom kabyle

Fondation
Fondateur

Direction
Siège

Idéologie
selon sources

Affiliations

Organisation de jeunesse
Publication

Représentation

Site officiel
```

Les qualificatifs idéologiques doivent être sourcés.

---

# 20. Infobox Institution

Blocs :

```text
Identité
Type
Statut

Création
Texte fondateur

Juridiction
Territoire

Direction
Composition

Mode de désignation
Durée des mandats

Institution précédente
Institution suivante

Site officiel
```

Pour les institutions non territoriales :

```text
Statut :
Institution en exil
Institution associative
Projet institutionnel
Institution historique
```

---

# 21. Wikitable

## 21.1. Style

```css
.wikitable {
  border-collapse: collapse;
  width: 100%;
  background: #fff;
}

.wikitable th,
.wikitable td {
  border: 1px solid var(--wk-border);
  padding: 8px 10px;
}

.wikitable th {
  background: var(--wk-background-subtle);
  text-align: left;
}
```

## 21.2. Variantes

```text
wikitable
wikitable sortable
wikitable compact
wikitable numeric
wikitable chronology
wikitable population
wikitable elections
wikitable institutions
wikitable discography
```

## 21.3. Responsive

```css
.wikikab-table-scroll {
  max-width: 100%;
  overflow-x: auto;
}
```

Ne jamais diminuer excessivement le texte.

---

# 22. Navbox

## Structure

```text
Titre
Groupe 1
Liste 1
Groupe 2
Liste 2
...
```

Exemple :

```text
ORGANISATION TRADITIONNELLE KABYLE

Village
Thaddart · quartiers

Institutions
Tajmaɛt · Qanun

Groupements
Aṛc · Confédération
```

## Mobile

- repliée par défaut ;
- bouton accessible ;
- groupes empilés.

---

# 23. Ambox

## Types

- information ;
- contenu ;
- style ;
- avertissement ;
- danger ;
- protection.

## Exemples WikiKab

```text
À sourcer
Sources insuffisantes
Neutralité
Nom kabyle à vérifier
Tifinagh à vérifier
Toponymie à vérifier
Limites historiques incertaines
Structure traditionnelle à sourcer
Statut institutionnel à préciser
Projet institutionnel
Institution historique
Institution en exil
```

## Style

```css
.wikikab-ambox {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 12px;
  padding: 12px 16px;
  margin: 16px 0;
  border: 1px solid var(--wk-border);
  border-left-width: 4px;
  background: var(--wk-background-subtle);
}
```

---

# 24. Hatnotes

Style discret en haut d’article.

Exemples :

```text
Voir aussi...
Ne pas confondre avec...
Pour les autres usages...
Article principal...
```

Pas de grosse boîte.

---

# 25. Images et vignettes

Les images doivent avoir :

- légende ;
- texte alternatif ;
- source ;
- licence.

Style :

```text
photo
────────────────
légende
```

Le fond de vignette peut être légèrement gris.

---

# 26. Galeries

Utiliser des grilles responsive.

Desktop :

```text
3–5 colonnes
```

Mobile :

```text
1–2 colonnes
```

Pas de galerie décorative sans valeur encyclopédique.

---

# 27. Cartes

Types :

- carte de localisation ;
- carte historique ;
- carte linguistique ;
- carte administrative ;
- carte des Aṛc ;
- carte des villages ;
- carte topographique.

Une carte historique doit toujours afficher :

```text
période
source
légende
incertitude éventuelle
```

---

# 28. Références

Les références doivent être lisibles et compactes.

Desktop :

- possibilité de plusieurs colonnes pour de longues listes.

Mobile :

- une seule colonne.

Les notes doivent disposer d’ancres aller/retour.

---

# 29. Catégories

Zone en bas :

```text
Catégories :
Personnalité kabyle
Écrivain kabyle
Naissance à ...
...
```

Style discret.

Pas de cartes graphiques.

---

# 30. Portails

Les portails peuvent être plus visuels que les articles.

Portails principaux :

```text
Kabylie
Géographie
Histoire
Langue kabyle
Culture
Patrimoine
Personnalités
Tajmaɛt et Aṛc
Politique et institutions
Économie
Société
Sport
```

---

# 31. Page d’accueil

## Hero

```text
WIKIKAB
Encyclopédie de la Kabylie

[ Rechercher dans WikiKab........................ ]

12 000+ articles
```

## Explorer

Cartes principales :

```text
Géographie
Histoire
Langue
Culture
Patrimoine
Villages
Société
Politique et institutions
Personnalités
```

## Contenus

Sections :

```text
Article à la une
Image à la une
Le saviez-vous ?
Chronologie
Carte de la Kabylie
Nouveaux articles
Articles à améliorer
Contribuer
```

---

# 32. Design des cartes de portail

Style :

- fond blanc ;
- bordure légère ;
- icône ou illustration minimale ;
- titre ;
- description de 1–2 lignes.

Éviter les cartes fortement ombrées.

---

# 33. Responsive

## Breakpoints indicatifs

```css
--wk-xs: 360px;
--wk-sm: 560px;
--wk-md: 720px;
--wk-lg: 1000px;
--wk-xl: 1280px;
```

## Règle

Privilégier :

- CSS Grid ;
- Flexbox ;
- container queries si possible ;
- dimensions fluides.

---

# 34. Mobile

À moins de 720 px :

- masquer sidebar fixe ;
- afficher menu hamburger ;
- infobox pleine largeur ;
- sommaire repliable ;
- navboxes repliées ;
- tableaux scrollables ;
- actions article compactes ;
- références sur une colonne.

---

# 35. Accessibilité

Objectif :

```text
WCAG 2.2 AA
```

Obligatoire :

- focus visible ;
- contraste suffisant ;
- navigation clavier ;
- alt image ;
- labels formulaires ;
- boutons ≥ 40 px ;
- ne jamais transmettre une information uniquement par couleur ;
- respect du zoom 200 % ;
- lecteur d’écran.

---

# 36. États interactifs

## Hover

Discret.

## Focus

Très visible.

```css
:focus-visible {
  outline: 2px solid var(--wk-link);
  outline-offset: 2px;
}
```

## Disabled

Contraste suffisant.

---

# 37. Boutons

Types :

```text
Primary
Secondary
Quiet
Danger
Icon button
```

Les articles encyclopédiques doivent comporter peu de boutons.

---

# 38. Recherche

La recherche doit être centrale.

Fonctions futures :

- autocomplétion ;
- recherche kabyle/français ;
- variantes orthographiques ;
- redirections ;
- recherche en tifinagh ;
- suggestions ;
- aperçu d’article.

---

# 39. Page de recherche

Afficher :

```text
Titre
Extrait
Catégorie
Miniature éventuelle
Correspondance du terme
```

Filtres possibles :

```text
Articles
Personnes
Lieux
Œuvres
Organisations
Fichiers
```

---

# 40. Pages de catégorie

Structure :

```text
Titre
Description

Sous-catégories
Pages principales
Liste alphabétique
Pages
```

Pour les grandes catégories, possibilité d’ajouter un bloc introductif.

---

# 41. Pages de personnalité

Éléments possibles :

```text
photo
biographie
chronologie
œuvres
fonctions
bibliographie
autorité
```

Ne pas transformer en profil social.

---

# 42. Pages politiques et institutionnelles

Toujours distinguer visuellement et textuellement :

```text
HISTORIQUE
ce qui a existé

ACTUEL
ce qui existe aujourd’hui

PROJETÉ
ce qu’un texte propose
```

Aucune couleur ne doit donner plus de légitimité à un statut.

---

# 43. Projets institutionnels

Ajouter un bloc explicite :

```text
STATUT DOCUMENTAIRE

Nature :
Projet / proposition / texte adopté par une organisation

Date :

Auteur :

Application territoriale actuelle :

Source :
```

Le bloc doit être informatif, pas militant.

---

# 44. Page Tajmaɛt / Aṛc

Possibilité d’ajouter un schéma :

```text
Thaddart
   ↓
Tajmaɛt
   ↓
Aṛc
   ↓
Confédération
```

Le schéma doit être accompagné d’un texte indiquant que les structures varient selon les périodes et les régions.

---

# 45. Design historique

Pour les articles historiques :

- cartes ;
- frises chronologiques ;
- documents d’archives ;
- citations courtes ;
- tableaux de périodes.

Palette spécifique possible :

```text
ocre très léger
gris
bleu
```

Sans créer un thème différent du site.

---

# 46. Frise chronologique

Exemple :

```text
1830 ───── 1871 ───── 1954 ───── 1962 ───── 1980 ───── 2001 ───── aujourd’hui
```

Sur mobile :
- scroll horizontal ;
- étapes accessibles.

---

# 47. Bloc citation

Style :

```text
│ Citation...
│
│ — Auteur, source
```

Pas de guillemets géants décoratifs.

---

# 48. Code et données

```css
code,
pre {
  font-family:
    ui-monospace,
    SFMono-Regular,
    Consolas,
    monospace;
}
```

Fond gris très clair.

---

# 49. Mathématiques

Prévoir MathJax / extension Math.

Les formules ne doivent pas déborder sur mobile.

---

# 50. Audio

Particulièrement utile pour :

- prononciation ;
- langue kabyle ;
- musique ;
- archives.

Lecteur sobre.

---

# 51. Vidéo

Réserver aux documents ayant une valeur encyclopédique.

Pas d’autoplay.

---

# 52. Footer

Sections :

```text
À propos
Licence
Confidentialité
Conditions
Contact
Aide
API
Statistiques
Version mobile
```

Footer sobre.

---

# 53. Mode impression

Masquer :

- menus ;
- boutons ;
- sidebar ;
- actions.

Conserver :

- titre ;
- infobox ;
- article ;
- images pertinentes ;
- références ;
- bibliographie.

---

# 54. Mode sombre

Option future.

Ne pas concevoir les composants avec des couleurs codées uniquement en valeurs absolues.

Utiliser des variables CSS.

---

# 55. Design tokens

Prévoir :

```text
Color
Typography
Spacing
Radius
Border
Shadow
Breakpoints
Z-index
Animation
```

---

# 56. Radius

WikiKab ne doit pas ressembler à une application mobile de cartes arrondies.

Utiliser :

```text
0px à 4px
```

Maximum conseillé :

```text
6px
```

---

# 57. Ombres

Très rares.

Préférer les bordures.

---

# 58. Icônes

Style cohérent :

- simple ;
- linéaire ;
- monochrome ;
- SVG.

Ne pas utiliser un mélange d’émojis dans l’interface finale.

---

# 59. Animation

Durée :

```text
100–200 ms
```

Uniquement pour :

- ouverture menu ;
- TOC ;
- navbox ;
- tooltip.

Respecter :

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

# 60. Breakpoints de test

Tester obligatoirement :

```text
320px
360px
390px
430px
560px
720px
768px
1024px
1280px
1440px
1920px
```

---

# 61. Navigateurs

Tester :

```text
Chrome
Firefox
Safari
Edge
Android Chrome
iOS Safari
```

---

# 62. Pages de test obligatoires

Créer dans l’environnement de staging :

```text
Test:Article long
Test:Infobox très longue
Test:Tifinagh
Test:Kabyle latin
Test:Grand tableau
Test:Navbox
Test:Infobox politique
Test:Infobox artiste
Test:Infobox personnalité
Test:Infobox institution
Test:Infobox village
Test:Infobox tajmaɛt
Test:Infobox aṛc
Test:Infobox confédération
Test:Infobox projet institutionnel
Test:Infobox ville
Test:Infobox mouvement politique
Test:Infobox drapeau
Test:Infobox carte
Test:Sommaire très long
Test:Frise chronologique
Test:Carte historique
Test:Image à la une
Test:Image à la une très grande
Test:Ambox
Test:Galerie
Test:Carte
Test:Références
Test:Article politique
Test:Tajmaɛt
Test:Aṛc
Test:Village
```

---

# 63. Pages particulièrement sensibles

Vérifier manuellement le rendu pour :

- Kabylie ;
- Langue kabyle ;
- Histoire de la Kabylie ;
- grandes personnalités ;
- mouvements politiques ;
- institutions ;
- tajmaɛt ;
- aṛc ;
- projets institutionnels.

---

# 64. Hiérarchie éditoriale du design

Priorité :

```text
1. lisibilité
2. accessibilité
3. contenu
4. navigation
5. cohérence
6. performance
7. identité visuelle
8. décoration
9. moderne
```

---

# 65. Ce qu’il faut éviter

Ne pas utiliser :

- grandes ombres ;
- gros arrondis ;
- gradients omniprésents ;
- cartes de type dashboard dans les articles ;
- animations décoratives ;
- arrière-plans chargés ;
- couleur différente par opinion politique ;
- drapeaux comme arrière-plan ;
- textes centrés sur de longues sections ;
- police fantaisie dans le corps ;
- boutons partout.

---

# 66. Résultat visuel recherché

WikiKab doit donner l’impression d’être :

```text
une encyclopédie
+
un atlas numérique
+
une bibliothèque historique
+
une base documentaire de la Kabylie
```

Le lecteur doit immédiatement percevoir :

- sérieux ;
- profondeur ;
- neutralité ;
- identité kabyle ;
- modernité ;
- facilité de consultation.

---

# 67. Architecture visuelle cible

```text
WIKIKAB
│
├── Header
│   ├── Logo
│   ├── Recherche
│   ├── Langues
│   └── Compte
│
├── Navigation principale
│
├── Page
│   ├── Titre
│   ├── Sous-titre kabyle
│   ├── Actions
│   ├── Hatnote
│   ├── Introduction
│   ├── Infobox
│   ├── Sommaire
│   ├── Sections
│   ├── Médias
│   ├── Tableaux
│   ├── Références
│   ├── Navboxes
│   ├── Portails
│   └── Catégories
│
└── Footer
```

---

# 68. Principe final

Le design de WikiKab doit rester assez neutre et stable pour accueillir dans le même système :

- un village ;
- une montagne ;
- une personnalité ;
- un chanteur ;
- une tajmaɛt ;
- un aṛc ;
- une ville ;
- un confédération ;
- un mouvement politique ;
- un parti politique ;
- une institution ;
- un parti politique ;
- une institution ;
- un événement historique ;
- un projet constitutionnel ;
- une œuvre culturelle ;
- un article linguistique.

Tous ces contenus doivent appartenir à la même encyclopédie et utiliser le même langage visuel.
