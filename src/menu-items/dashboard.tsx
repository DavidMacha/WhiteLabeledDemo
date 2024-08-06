import { FormattedMessage } from 'react-intl';
import { Home3, HomeTrendUp, Box1, Airplane } from 'iconsax-react';
import { NavItemType } from 'types/menu';
import { useGetMenu } from 'api/menu';

const icons = {
  dashboard: HomeTrendUp,
  components: Box1,
  loading: Home3,
  landing: Airplane
};

const MenuFromAPI: NavItemType = {
  id: 'group-dashboard-loading',
  title: <FormattedMessage id="dashboard" />,
  icon: icons.loading,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard/default',
      icon: icons.dashboard,
    },
    {
      id: 'landing',
      title: <FormattedMessage id="landing" />,
      type: 'item',
      icon: icons.landing,
      url: '/landing'
    }
  ]
};

export default MenuFromAPI


/* Old version uses api
// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Home3, HomeTrendUp, Box1, Airplane } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

import { useGetMenu } from 'api/menu';

const icons = {
  dashboard: HomeTrendUp,
  components: Box1,
  loading: Home3,
  landing: Airplane
};

const loadingMenu: NavItemType = {
  id: 'group-dashboard-loading',
  title: <FormattedMessage id="dashboard" />,
  icon: icons.loading,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard/default',
      icon: icons.dashboard,
    },
    {
      id: 'landing',
      title: <FormattedMessage id="landing" />,
      type: 'item',
      icon: icons.landing,
      url: '/landing'
    }
  ]
};

// ==============================|| MENU ITEMS - API ||============================== //

export const MenuFromAPI = () => {
  const { menu, menuLoading } = useGetMenu();

  if (menuLoading) return loadingMenu;

  const subChildrenList = (children: NavItemType[]) => {
    return children?.map((subList: NavItemType) => {
      return fillItem(subList);
    });
  };

  const itemList = (subList: NavItemType) => {
    let list = fillItem(subList);

    // if collapsible item, we need to feel its children as well
    if (subList.type === 'collapse') {
      list.children = subChildrenList(subList.children!);
    }
    return list;
  };

  const childrenList: NavItemType[] | undefined = menu?.children?.map((subList: NavItemType) => {
    return itemList(subList);
  });

  let menuList = fillItem(menu, childrenList);
  return menuList;
};

function fillItem(item: NavItemType, children?: NavItemType[] | undefined) {
  return {
    ...item,
    title: <FormattedMessage id={`${item?.title}`} />,
    // @ts-ignore
    icon: icons[item?.icon],
    ...(children && { children })
  };
}
*/