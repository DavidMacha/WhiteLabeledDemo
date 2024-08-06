// THIRD - PARTY
import { FormattedMessage } from 'react-intl';

// ASSETS
import { Story, Fatrows, Next, UserSquare, PresentionChart } from 'iconsax-react';

// TYPE
import { NavItemType } from 'types/menu';

// ICONS
const icons = {
  widgets: Story,
  wizard: Next,
  statistics: Story,
  data: Fatrows,
  profile: UserSquare,
  chart: PresentionChart
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const extra: NavItemType = {
  id: 'group-widget',
  title: <FormattedMessage id="Extras" />,
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
    },//
    {
      id: 'profile',
      title: <FormattedMessage id="profile" />,
      type: 'collapse',
      icon: icons.profile,
      children: [
        {
          id: 'user-profile',
          title: <FormattedMessage id="user-profile" />,
          type: 'item',
          url: '/apps/profiles/user/personal',
          breadcrumbs: false
        },
        {
          id: 'account-profile',
          title: <FormattedMessage id="account-profile" />,
          type: 'item',
          url: '/apps/profiles/account/my-account',
          breadcrumbs: false
        }
      ]
    },
  ]
};

export default extra;
