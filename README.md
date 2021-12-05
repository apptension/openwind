# Welcome to Opendwind! 💨 🦄

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Community-Driven Tailwind UI Kit

---

## Request new component

Want to request a new component? Just create an issue and include `[element]` in the title. Our smart bot automatically detects your intence and creates a label. Each new issue can be viewed on our page, on the [/board](https://openwind.vercel.app/board) page.

## How to contribute?

Find an interesting issue and write a comment with `in progress`. That will indicate that you started working on it and it will automatically assign you to this ticket. This issue will move to the `In progress` column in our [kanban board](https://openwind.vercel.app/board).

Now, the magic begins.

```bash
npm run create-element
# or
yarn create-element
```

then

```bash
npm run storybook
# or
yarn storybook
```

Grab your unique element id, find your component and start your magic. When you finish just create a pull request and wait for our review. Please, don't change this uid, let's stick to this pattern.

## Ready to submit?

After the work is done, create a Pull Request and add a comment with `resolves #id` where #id is an issue number.

## TODO

- [ ] Support Vue.js
- [ ] Publish components to npm
- [ ] Add a client-side code editor with Github API integration (PR)
- [ ] Validate element id with a pre-commit hook
