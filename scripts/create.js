const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const yaml = require('yaml');
const fuzzy = require('fuzzy');
const R = require('ramda');

const types = {
  Default: {
    applicationShells: [],
    headings: [],
    dataDisplay: [],
    lists: [],
    forms: ['formLayouts'],
    feedback: [],
    navigation: [],
    overlays: [],
    elements: [],
    layout: [],
    pageExamples: [],
  },
  Marketing: {
    pageSections: [],
    elements: [],
    feedback: [],
    pageExamples: [],
  },
  Ecommerce: {
    components: [],
    pageExamples: [],
  },
  Business: {
    components: [],
    pageExamples: [],
  },
};

const contributors = yaml.parse(fs.readFileSync(path.join(__dirname, '../contributors.yml'), 'utf-8'));
const elements = require(path.join(__dirname, '../elements.json'));

const handleAnswers = ({ category, subcategory, type, username }) => {
  if (!contributors.includes(username)) {
    contributors.push(username);
    fs.writeFileSync(path.join(__dirname, '../contributors.yml'), yaml.stringify(contributors));
  }
  const elementName = `${type}/${username}${Date.now()}`;
  fs.copySync(
    path.resolve(__dirname, `../templates/template`),
    path.resolve(__dirname, `../lib/${category}/${subcategory}/${elementName}`)
  );
  const story = fs.readFileSync(path.resolve(__dirname, `../lib/${category}/${subcategory}/${elementName}`));
  story.replace;
  const newElements = R.mergeDeepWith(R.concat, elements, {
    button: [{ author: username, category, subcategory, type, elementName }],
  });
  fs.writeJSONSync(path.join(__dirname, '../elements.json'), newElements, { spaces: 2 });
};

const searchCategory = (_, input = '') => {
  const categoriesKeys = Object.keys(types);
  const fuzzyResult = fuzzy.filter(input, categoriesKeys);
  return fuzzyResult.map((el) => el.original);
};

const searchSubCategory = (answer, input = '') => {
  const subCategoriesKeys = Object.keys(types[answer['category']]);
  const fuzzyResult = fuzzy.filter(input, subCategoriesKeys);
  return fuzzyResult.map((el) => el.original);
};

const searchType = (answer, input = '') => {
  console.log(answer);
  const typesValues = types[answer['category']][answer['subcategory']];
  const fuzzyResult = fuzzy.filter(input, typesValues);
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
      name: 'subcategory',
      message: "What's the element subcategory?",
      source: searchSubCategory,
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
  ])
  .then(handleAnswers)
  .catch((error) => {
    console.log(error);
    // handle error
  });
