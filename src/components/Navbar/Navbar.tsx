import './Navbar.scss';
import { Dispatch, SetStateAction } from 'react';
import {
  FiSidebar,
  FiShoppingCart,
  FiGlobe,
  FiMoon,
  FiUser,
  FiHome,
} from 'react-icons/fi';
import Searchbar from './Searchbar/Searchbar';
import NavItem from './NavItem/NavItem';

interface NavbarProps {
  isLoginFormRendered: boolean;
  setIsLoginFormRendered: Dispatch<SetStateAction<boolean>>;
  isSidebarRendered: boolean;
  setIsSidebarRendered: Dispatch<SetStateAction<boolean>>;
}
interface INavItem {
  icon?: React.ComponentType;
  onClick?: () => void;
  url?: string;
  component?: React.ReactNode;
  classname: string;
}

const Navbar = ({
  isLoginFormRendered,
  setIsLoginFormRendered,
  isSidebarRendered,
  setIsSidebarRendered,
}: NavbarProps) => {
  const handleItemClick = (componentName: string | null): void => {
    if (componentName === 'sidebar') {
      setIsSidebarRendered(!isSidebarRendered);
    } else if (componentName === 'login') {
      setIsLoginFormRendered(!isLoginFormRendered);
    } else {
      setIsSidebarRendered(false);
      setIsLoginFormRendered(false);
    }
  };
  const navItems: INavItem[] = [
    {
      icon: FiSidebar,
      onClick: () => handleItemClick('sidebar'),
      classname: 'sidebar',
    },
    {
      icon: FiHome,
      onClick: () => handleItemClick(null),
      url: '/',
      classname: 'logo',
    },
    { component: <Searchbar />, classname: 'searchbar' },
    {
      icon: FiGlobe,
      onClick: () => handleItemClick(null),
      classname: 'language',
    },
    {
      icon: FiMoon,
      onClick: () => handleItemClick(null),
      classname: 'darkmode',
    },
    {
      icon: FiUser,
      onClick: () => handleItemClick('login'),
      classname: 'login',
    },
    {
      icon: FiShoppingCart,
      onClick: () => handleItemClick(null),
      url: '/cart',
      classname: 'cart',
    },
  ];

  return (
    <nav className="navbar">
      <ul className="navitem-container">
        {navItems.map((navItem, index) => (
          <NavItem
            key={index}
            onClick={navItem.onClick}
            url={navItem.url}
            icon={navItem.icon}
            classname={navItem.classname}
            component={navItem.component}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
