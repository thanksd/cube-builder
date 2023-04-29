import type { Meta, StoryObj } from '@storybook/vue3';

import CardTemplate from './CardTemplate.vue';

const meta: Meta<typeof CardTemplate> = {
  title: 'Cube/MagicCard/CardTemplate',
  component: CardTemplate,
  render: (args: any) => ({
    components: { CardTemplate },
    setup() {
      return { args };
    },
    template: '<CardTemplate v-bind="args"/>'
  }),
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof CardTemplate>;

const defaultArgs = {
  color: 'blue',
  title: 'Gitaxian Raptor',
  cost: '{2}{U}',
  type: 'Creature - Phyrexian Bird',
  power: '1',
  toughness: '4',
  rules: "Flying\nGitaxian Raptor enters the battlefield with three oil counters on it.\nRemove an oil counter from Gitaxian Raptor: Gitaxian Raptor gets +1/-1 until end of turn.",
  author: 'Maxime Minard',
  imgUrl: 'https://cards.scryfall.io/art_crop/front/4/f/4f5e95f8-c04d-405f-bba4-e83a8f6bf463.jpg?1675956964'
}

export const Basic: Story = {
  args: {
    ...defaultArgs
  }
}
