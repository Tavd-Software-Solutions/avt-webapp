import { ComponentMeta, ComponentStory } from "@storybook/react";
import InputValue from "../InputValue";

type Meta = ComponentMeta<typeof InputValue>;
type Story = ComponentStory<typeof InputValue>;

export default {
	title: "AVT/Componentes/InputValue",
	component: InputValue,
} as Meta;

export const Default: Story = (args) => {
	return <InputValue {...args} />;
};
Default.storyName = "Padrão";
