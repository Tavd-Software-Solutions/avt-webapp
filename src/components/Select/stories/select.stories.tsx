import { ComponentMeta, ComponentStory } from "@storybook/react";
import Select from "../Select";

type Meta = ComponentMeta<typeof Select>;
type Story = ComponentStory<typeof Select>;

export default {
	title: "AVT/Componentes/Select",
	component: Select,
} as Meta;

export const Default: Story = (args) => {
	return <Select {...args} />;
};
Default.storyName = "Padrão";
