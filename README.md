# Welcome to Opendwind! 💨 🦄

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Community-Driven Tailwind UI Kit

---

## Request new component 🤓

Want to request a new component? Just create an issue and include `[element]` in the title. Our smart bot automatically detects your intence and creates a label. Each new issue can be viewed on our page, on the [/board](https://openwind.vercel.app/board) page.

## How to contribute? 📚

Find an interesting issue and write a comment with `in progress`. That will indicate that you started working on it and it will automatically assign you to this ticket. This issue will move to the `In progress` column in our [kanban board](https://openwind.vercel.app/board).

Now, the magic begins.

```bash
npm run create-element
# or
yarn create-element
```

In this step you need to pick category and type. You can choose from 4 categories:

- default - general components/sections
- marketing - marketing related components, ex. newsletters, stats
- ecommerce - ecommerce components, ex. product details, product lists, categories
- business - businesss related components, ex. testimonials, team

Each category include a number of types:

- default
  - applicationShells
  - headings
  - dataDisplay
  - lists
  - forms
  - feedback
  - navigation
  - overlays
  - elements
  - layout
  - pageExamples
- marketing
  - pageSections
  - elements
  - feedback
  - pageExamples
- ecommerce
  - components
  - pageExamples
- business
  - components
  - pageExamples

After you pick category and type you can provide your Github name as well as short component description.

Then, run storybook and start work.

```bash
npm run storybook
# or
yarn storybook
```

Grab your unique element id from newly generated object in elements.json, find your component using this id and start the magic. When you finish just create a pull request and wait for our review.

## Ready to submit? 🚀

After the work is done, create a Pull Request and add a comment with `resolves #id` where #id is an issue number.

## Tech stack

- JavaScript
- Next.js
- Tailwind
- Vercel
- Supabase
- Node.js - for webhook
- Glitch - serving webhook
- inquirer - for CLI

## TODO 👀

- [ ] Support Vue.js
- [ ] Publish components to npm
- [ ] Add a client-side code editor with Github API integration (PR)
- [ ] Validate element id with a pre-commit hook
- [ ] Create fancy floating emoji animations on reaction click
