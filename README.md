# Hand Hygiene Educational Portal
**St. Therese de Lisieux Women and Children Medical Center**
NCM 110L — Nursing Informatics Laboratory | Batangas State University

---

## Overview

A static, multi-page educational website on proper hand hygiene practices for nursing students and healthcare workers. Built with plain HTML, CSS, and JavaScript — no frameworks or dependencies required.

---

## File Structure

```
project/
│
├── index.html          # Home page
├── module1.html        # Module 1 — Basics of Hand Hygiene
├── module2.html        # Module 2 — WHO 5 Moments
├── module3.html        # Module 3 — Alcohol-Based Hand Rubs
├── quiz.html           # 10-question knowledge check
│
├── style.css           # Global styles (tokens, nav, hero, footer, etc.)
├── modules.css         # Styles for module and quiz pages
│
├── main.js             # Home page scripts (popup, video playlist)
├── module.js           # Module page scripts (progress bar, TOC highlight)
└── quiz.js             # Quiz logic (questions, scoring, results)
```

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Landing page with hero, stats, module cards, video section, and CTA |
| Module 1 | `module1.html` | What is hand hygiene, how infection spreads, types and timing |
| Module 2 | `module2.html` | The WHO My 5 Moments framework explained in depth |
| Module 3 | `module3.html` | ABHR science, ABHR vs soap & water, correct technique |
| Quiz | `quiz.html` | 10-question quiz with hints, feedback, and scored results |

---

## How to Use

1. Download or clone all files into the same folder.
2. Open `index.html` in any modern browser — no server or installation needed.
3. All internal links between pages work automatically as long as files stay in the same directory.

---

## CSS Design Tokens

All colors are defined as CSS variables in `style.css` and can be changed in one place:

```css
:root {
  --rose:   #e8547a;   /* Primary / accent color */
  --blush:  #f4a7bc;   /* Secondary pink */
  --petal:  #fde8ef;   /* Light background tint */
  --cream:  #fff9f7;   /* Page background */
  --ink:    #2a1520;   /* Dark text / footer */
  --muted:  #9a7282;   /* Secondary text */
}
```

---

## Quiz

- 10 questions drawn from all three modules
- Each question includes a hint and a post-answer explanation
- Results screen shows score, correct/incorrect count, and a message based on performance
- To add or edit questions, modify the `questions` array in `quiz.js`

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Edge, Safari). Does not require internet access except for loading Google Fonts and placeholder images.

---

*Developed for NCM 110L Nursing Informatics Laboratory — Batangas State University, College of Health Sciences.*

*first freelance project