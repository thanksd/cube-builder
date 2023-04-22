import type { Meta, StoryObj } from '@storybook/vue3';

import CardHeader from './CardHeader.vue';

const meta: Meta<typeof CardHeader> = {
  title: 'Cube/MagicCard/CardHeader',
  component: CardHeader,
  render: (args: any) => ({
    components: { CardHeader },
    setup() {
      return { args };
    },
    template: '<CardHeader v-bind="args"/>'
  }),
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof CardHeader>;

export const Basic: Story = {
  args: {
    title: 'Skullclamp',
    cost: '{1}'
  }
}
