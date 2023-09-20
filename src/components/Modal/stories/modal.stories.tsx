import { ComponentMeta, ComponentStory } from "@storybook/react";
import Modal from "../Modal";

type Meta = ComponentMeta<typeof Modal>;
type Story = ComponentStory<typeof Modal>;

export default {
	title: "AVT/Componentes/Modal",
	component: Modal,
} as Meta;

export const Default: Story = (args) => {
	return <Modal {...args} />;
};
Default.storyName = "Padrão";
Default.args = {
	children: <h3>Conteudo modal</h3>,
	open: true,
	title: "Titulo da modal",
};
