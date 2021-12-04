import Element from './';

export default {
  title: '[TITLE]',
  component: Element,
};

const Template = (args) => <Element {...args} />;

export const Primary = Template.bind({});
