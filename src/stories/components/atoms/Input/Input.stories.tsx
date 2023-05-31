import { Meta } from "@storybook/react";
import Input, { InputProps } from "../../../../../components/atoms/Input";

export default {
  title: "components/atoms/input",
  component: Input,
} as Meta;

const Template = (args: InputProps) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Nama Lengkap",
};
