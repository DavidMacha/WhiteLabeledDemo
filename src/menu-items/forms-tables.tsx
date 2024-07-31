// THIRD - PARTY
import { FormattedMessage } from 'react-intl';

// ASSETS
import { Book, PasswordCheck, Next, RowVertical, CpuCharge, TableDocument, Subtitle } from 'iconsax-react';

// TYPE
import { NavItemType } from 'types/menu';

// ICONS
const icons = {
  formsTable: Book,
  validation: PasswordCheck,
  wizard: Next,
  layout: RowVertical,
  plugins: CpuCharge,
  reactTables: TableDocument,
  muiTables: Subtitle
};

// ==============================|| MENU ITEMS - FORMS & TABLES ||============================== //

const formsTables: NavItemType = {
  id: 'group-forms-tables',
  title: <FormattedMessage id="forms-tables" />,
  icon: icons.formsTable,
  type: 'group',
  children: [
    {
      id: 'wizard',
      title: <FormattedMessage id="demo-payment-form" />,
      type: 'item',
      url: '/forms/wizard',
      icon: icons.wizard
    },
    {
      id: 'forms-layout',
      title: <FormattedMessage id="layout" />,
      type: 'collapse',
      icon: icons.layout,
      children: [
        {
          id: 'basic',
          title: <FormattedMessage id="basic" />,
          type: 'item',
          url: '/forms/layout/basic'
        },
        {
          id: 'multi-column',
          title: <FormattedMessage id="multi-column" />,
          type: 'item',
          url: '/forms/layout/multi-column'
        }
      ]
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

export default formsTables;
