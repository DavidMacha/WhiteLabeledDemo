// PROJECT IMPORTS
import applications from './applications';
import extra from './extra'
import formsTables from './forms-tables';

//import pages from './pages';

// TYPES
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [applications, extra, formsTables]
};

export default menuItems;
