// THIRD - PARTY
import { FormattedMessage } from 'react-intl';

// ASSETS
import { Story, Fatrows, Next, PresentionChart } from 'iconsax-react';

// TYPE
import { NavItemType } from 'types/menu';

// ICONS
const icons = {
  widgets: Story,
  wizard: Next,
  statistics: Story,
  data: Fatrows,
  chart: PresentionChart
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const widget: NavItemType = {
  id: 'group-widget',
  title: <FormattedMessage id="widgets" />,
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'Cart Items',
      title: <FormattedMessage id="Cart Items" />,
      type: 'item',
      url: '/apps/e-commerce/checkout',
      icon: icons.chart
    },
    {
      id: 'data',
      title: <FormattedMessage id="Probono Data" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.data
    },
    {
      id: 'forms-plugins',
      title: <FormattedMessage id="Txt Editor-demos" />,
      type: 'item',
      url: '/forms/plugins/editor',
      icon: icons.wizard
    }
  ]
};

export default widget;
