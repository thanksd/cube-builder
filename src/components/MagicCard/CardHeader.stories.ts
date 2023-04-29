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

const defaultArgs = {
  title: 'Skullclamp',
  cost: '{1}'
}

export const Basic: Story = {
  args: {
    title: 'Skullclamp',
    cost: '{1}'
  }
}

export const White: Story = {
  args: {
    ...defaultArgs,
    color: 'white',
    cost: '{1}{W}'
  }
}

export const Blue: Story = {
  args: {
    ...defaultArgs,
    color: 'blue',
    cost: '{1}{U}'
  }
}

export const Black: Story = {
  args: {
    ...defaultArgs,
    color: 'black',
    cost: '{1}{B}'
  }
}

export const Red: Story = {
  args: {
    ...defaultArgs,
    color: 'red',
    cost: '{1}{R}'
  }
}

export const Green: Story = {
  args: {
    ...defaultArgs,
    color: 'green',
    cost: '{1}{G}'
  }
}
