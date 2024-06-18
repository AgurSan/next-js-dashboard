import { Meta, StoryFn } from '@storybook/react';
import Footer, { IFooter } from './Footer';
import { mockFooterProps } from './Footer.mocks';

export default {
  title: 'ui/Footer',
  component: Footer,
  argTypes: {},
} as Meta;

const Template: StoryFn<IFooter> = (args) => <Footer {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockFooterProps.base,
};
