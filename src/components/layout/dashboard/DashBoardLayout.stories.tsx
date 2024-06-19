import { Meta, StoryFn } from '@storybook/react';
import DashboardLayout, { IDashboardLayout } from './DashboardLayout';

export default {
  title: 'layout/DashboardLayout',
  component: DashboardLayout,
  argTypes: {},
} as Meta;

const Template: StoryFn<IDashboardLayout> = (args) => (
  <DashboardLayout {...args} />
);

export const Base = Template.bind({});

Base.args = {
  children: 'This is a dashboard layout',
} as IDashboardLayout;
