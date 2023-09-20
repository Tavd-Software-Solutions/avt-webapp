import { ComponentMeta, ComponentStory } from "@storybook/react";
import SideBar from "../SideBar";
import { HiHome } from "react-icons/hi";

type Meta = ComponentMeta<typeof SideBar>;
type Story = ComponentStory<typeof SideBar>;

export default {
	title: "AVT/Componentes/SideBar",
	component: SideBar,
} as Meta;

export const Default: Story = (args) => {
	return <SideBar {...args} />;
};
Default.storyName = "Padrão";
Default.args = {
	items: [
		{
			text: "Home",
			icon: <HiHome size={26} />,
			selected: true,
		},
		{
			text: "Home 1",
			icon: <HiHome size={26} />,
			selected: false,
		},
		{
			text: "Home 2",
			icon: <HiHome size={26} />,
			selected: false,
		},
	],
};
