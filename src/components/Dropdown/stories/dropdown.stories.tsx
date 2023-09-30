import { ComponentMeta, ComponentStory } from "@storybook/react";
import Dropdown from "../Dropdown";

type Meta = ComponentMeta<typeof Dropdown>
type Story = ComponentStory<typeof Dropdown>

export default {
    title: "AVT/Componentes/Select",
	component: Dropdown,
} as Meta;

export const Default: Story = (args) => {
    return <Dropdown {...args} />
}
Default.storyName = "Padrão"