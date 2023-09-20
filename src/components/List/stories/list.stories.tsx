import { ComponentMeta, ComponentStory } from "@storybook/react";
import List from "../List";

type Meta = ComponentMeta<typeof List>;
type Story = ComponentStory<typeof List>;

export default {
	title: "AVT/Componentes/List",
	component: List,
} as Meta;

export const Default: Story = (args) => {
	return <List {...args} />;
};
Default.storyName = "Padrão";
Default.args = {
	items: [
		{
			id: 1,
			title: "Item 1",
		},
		{
			id: 2,
			title: "Item 2",
		},
		{
			id: 3,
			title: "Item 3",
		},
	],
	columns: [{ name: "title", title: "Title", type: "text" }],
};
