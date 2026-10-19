# Virtual Dog Park

A responsive dog encyclopedia and virtual pet website built with HTML, CSS, and
vanilla JavaScript for AIE1101 Week 5 Lab 2.

## Run the project

Open this folder in VS Code and run `index.html` with Live Server. Use the same
browser and local address when testing saved progress; the dog is stored in that
browser's `localStorage`, not in an online account.

## Features

- Search an illustrated encyclopedia of Beagles, Golden Retrievers, and Poodles.
- Adopt one dog with a non-empty name of up to 20 characters.
- Feed or play to add 10 happiness, capped at 100.
- Advance a day to reduce happiness by 5, down to 0.
- Grow from Puppy on Day 1, to Young Dog on Days 2-3, and Adult Dog on Day 4 onward.
- Restore saved progress after refreshing, or use Start Over to confirm and delete it.

## Test checklist

1. Search for `poodle`, then search for a word with no match.
2. Try adopting with a blank name; then adopt a dog with a valid name and breed.
3. Feed or play and check happiness increases by 10 without changing the day.
4. Advance the day and check happiness drops by 5 and the growth stage changes
   on Days 2 and 4.
5. Advance until happiness reaches 0, and feed until it reaches 100.
6. Refresh and confirm the dog and progress remain. Cancel Start Over and confirm
   the dog remains; confirm Start Over and check the saved dog is removed.
7. Check the page at a narrow window width and confirm all images load.

## GitHub submission

After testing, open a terminal in this folder and run:

```powershell
git add index.html style.css script.js README.md assets
git commit -m "feat: complete virtual dog park"
```

Create an empty public repository on GitHub named `virtual-dog-park`, then connect
and push it (replace `YOUR-USERNAME` with your GitHub username):

```powershell
git remote add origin https://github.com/YOUR-USERNAME/virtual-dog-park.git
git branch -M main
git push -u origin main
```

Submit the GitHub repository URL and your approximately 100-word reflection.
Never include passwords, access tokens, or unrelated private files in the repo.

## Reflection draft (edit to match your own experience)

I built Virtual Dog Park with HTML for structure, CSS for responsive design, and
JavaScript for search and pet-care interactions. It includes three illustrated
breeds and an adoption form that checks the dog's name. Feeding and playing
increase happiness; Next Day reduces it and advances growth. I tested the
happiness limits, stage changes, refresh persistence, and Start Over confirmation
in a browser. Git helped me save project milestones, while the README explains
how to run and test the site. This work taught me to break a project into small
features, test edge cases, and review AI-generated code. Next, I would add more
breeds and improve the illustrations.
