import { ComponentMeta, ComponentStory } from "@storybook/react";
import TextField from "../TextField";

type Meta = ComponentMeta<typeof TextField>;
type Story = ComponentStory<typeof TextField>;

export default {
	title: "AVT/Componentes/TextField",
	component: TextField,
} as Meta;

export const Default: Story = (args) => {
	return <TextField {...args} />;
};
Default.storyName = "Padrão";
Default.args = {
	name: "padrao",
	type: "text",
	placeholder: "placeholder",
};

export const WithLabel: Story = (args) => {
	return <TextField {...args} />;
};
WithLabel.storyName = "Com Label";
WithLabel.args = {
	label: "Label",
};

export const Disabled: Story = (args) => {
	return <TextField {...args} />;
};
Disabled.storyName = "Desabilitado";
Disabled.args = {
	disabled: true,
	name: "disabled",
	type: "text",
	placeholder: "desabilitado",
};

export const Error: Story = (args) => {
	return <TextField {...args} />;
};
Error.storyName = "Quando Houver Erro";
Error.args = {
	label: "Error",
	error: "Login or password are incorrect!",
};

export const Size: Story = (args) => {
	return <TextField {...args} />;
};
Size.storyName = "Quando Houver alterações no tamanho";
Size.args = {
	label: "Tamanho",
	width: 100,
	height: 50,
};

export const TextArea: Story = (args) => {
	return <TextField {...args} />;
};
TextArea.storyName = "Quando for TextArea";
TextArea.args = {
	name: "textarea",
	label: "TextArea",
};
