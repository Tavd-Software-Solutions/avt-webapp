import { ComponentMeta, ComponentStory } from "@storybook/react";
import Header from "../Header";
import { AuthProvider } from "../../../context/AuthContext";

type Meta = ComponentMeta<typeof Header>;
type Story = ComponentStory<typeof Header>;

export default {
	title: "AVT/Componentes/Header",
	component: Header,
} as Meta;

export const Default: Story = (args) => {
	return (
		<AuthProvider>
			<Header {...args} />
		</AuthProvider>
	);
};
