import { Meta, StoryFn } from '@storybook/react';
import UploadCSV, { IUploadCSV } from './UploadCSV';
import { mockUploadCSVProps } from './UploadCSV.mocks';

export default {
  title: 'Components/UploadCSV',
  component: UploadCSV,
} as Meta<typeof UploadCSV>;

const Template: StoryFn<IUploadCSV> = (args) => <UploadCSV {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockUploadCSVProps.base,
} as IUploadCSV;
