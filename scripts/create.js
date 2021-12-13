const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const yaml = require('yaml');
const fuzzy = require('fuzzy');
const R = require('ramda');
const uuid = require('uuid');
const data = require('../categories.json');

const types = R.map(R.map(R.prop('type')), R.groupBy(R.prop('category'), data));

const contributors = yaml.parse(fs.readFileSync(path.join(__dirname, '../contributors.yml'), 'utf-8'));
const elements = require(path.join(__dirname, '../elements.json'));

const handleAnswers = ({ category, type, username, description }) => {
  if (!contributors.includes(username)) {
    contributors.push(username);
    fs.writeFileSync(path.join(__dirname, '../contributors.yml'), yaml.stringify(contributors));
  }
  const id = `${uuid.v4()}`;
  fs.copySync(
    path.resolve(__dirname, `../templates/template`),
    path.resolve(__dirname, `../src/lib/${category}/${type}/${id}`)
  );
  const story = fs.readFileSync(
    path.resolve(__dirname, `../src/lib/${category}/${type}/${id}/element.stories.js`),
    'utf-8'
  );
  const newStory = story.replace('[TITLE]', `${category}/${type}/${id}`);
  fs.writeFileSync(path.resolve(__dirname, `../src/lib/${category}/${type}/${id}/element.stories.js`), newStory);
  const newElements = R.mergeDeepWith(R.concat, elements, {
    [category]: {
      [type]: [{ author: username, category, type, id, description }],
    },
  });
  fs.writeJSONSync(path.join(__dirname, '../elements.json'), newElements, { spaces: 2 });
};

const searchCategory = (_, input = '') => {
  const categoriesKeys = Object.keys(types);
  const fuzzyResult = fuzzy.filter(input, categoriesKeys);
  return fuzzyResult.map((el) => el.original);
};

const searchType = (answer, input = '') => {
  const fuzzyResult = fuzzy.filter(input, types[answer['category']]);
  return fuzzyResult.map((el) => el.original);
};

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
inquirer
  .prompt([
    {
      type: 'autocomplete',
      name: 'category',
      message: "What's the element category?",
      source: searchCategory,
    },
    {
      type: 'autocomplete',
      name: 'type',
      message: "What's the element type?",
      source: searchType,
    },
    {
      type: 'input',
      message: "What's your Github username?",
      name: 'username',
    },
    {
      type: 'input',
      message: "What's the element description?",
      name: 'description',
    },
  ])
  .then(handleAnswers)
  .catch((error) => {
    console.log(error);
    // handle error
  });
