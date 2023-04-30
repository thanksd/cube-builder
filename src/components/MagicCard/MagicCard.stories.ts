import type { Meta, StoryObj } from '@storybook/vue3';

import MagicCard from './MagicCard.vue';

const meta: Meta<typeof MagicCard> = {
  title: 'Cube/MagicCard/MagicCard',
  component: MagicCard,
  render: (args: any) => ({
    components: { MagicCard },
    setup() {
      return { args };
    },
    template: '<CardHeader v-bind="args"/>'
  }),
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof MagicCard>;

const defaultArgs = {
}

export const Basic: Story = {
  args: {
    ...defaultArgs
  }
}
