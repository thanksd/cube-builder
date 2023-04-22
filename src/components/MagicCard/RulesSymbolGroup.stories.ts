import type { Meta, StoryObj } from '@storybook/vue3';

import RulesSymbolGroup from './RulesSymbolGroup.vue';

const meta: Meta<typeof RulesSymbolGroup> = {
  title: 'Cube/MagicCard/RulesSymbolGroup',
  component: RulesSymbolGroup,
  render: (args: any) => ({
    components: { RulesSymbolGroup },
    setup() {
      return { args };
    },
    template: '<RulesSymbolGroup v-bind="args"/>'
  }),
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof RulesSymbolGroup>;

export const Default: Story = {}

export const Plains: Story = {
  args: {
    value: '{W}'
  }
}

export const Island: Story = {
  args: {
    value: '{U}'
  }
}

export const Swamp: Story = {
  args: {
    value: '{B}'
  }
}

export const Mountain: Story = {
  args: {
    value: '{R}'
  }
}

export const Forest: Story = {
  args: {
    value: '{G}'
  }
}

export const Tap: Story = {
  args: {
    value: '{T}'
  }
}

export const XBlack: Story = {
  args: {
    value: '{X}{B}'
  }
}

export const HasShadow: Story = {
  args: {
    value: '{X}{G}',
    hasShadow: true
  }
}
