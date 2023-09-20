import { ComponentMeta, ComponentStory } from "@storybook/react";
import DateRangePicker from "../DateRangePicker";

type Meta = ComponentMeta<typeof DateRangePicker>;
type Story = ComponentStory<typeof DateRangePicker>;

export default {
	title: "AVT/Componentes/DateRangePicker",
	component: DateRangePicker,
} as Meta;

export const Default: Story = (args) => {
	return <DateRangePicker {...args} />;
};
Default.storyName = "Padrão";
