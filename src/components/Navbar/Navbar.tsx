import './Navbar.scss';
import { Dispatch, SetStateAction } from 'react';
import { FiShoppingCart, FiMenu } from 'react-icons/fi';
import Searchbar from './Searchbar/Searchbar';
import NavItem from './NavItem/NavItem';
import { IconType } from 'react-icons';

// Interface for the Navbar component props
interface NavbarProps {
  isLoginFormRendered: boolean;
  setIsLoginFormRendered: Dispatch<SetStateAction<boolean>>;
  isSidebarRendered: boolean;
  setIsSidebarRendered: Dispatch<SetStateAction<boolean>>;
}

// Interface for each navigation item
interface NavItemConfig {
  icon?: IconType;
  url?: string;
  imgsrc?: string;
  component?: React.ReactNode;
  classname: string;
}

/**
 * Renders a Navbar containing NavItems
 * @param isLoginFormRendered if the login form is rendered
 * @param setIsLoginFormRendered set if the loginform should be rendered or not
 * @param isSidebarRendered if the sidebar is rendered
 * @param setIsSidebarRendered set if the sidebar should be rendered or not
 * @returns NavItems
 */
const Navbar: React.FC<NavbarProps> = ({
  isLoginFormRendered,
  setIsLoginFormRendered,
  isSidebarRendered,
  setIsSidebarRendered,
}) => {
  // Array of navigation items
  const navItems: NavItemConfig[] = [
    {
      url: '/',
      icon: FiMenu,
      classname: 'sidebar',
    },
    {
      url: '/',
      classname: 'logo',
      imgsrc:
        'data:image/png;base64,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',
    },
    { component: <Searchbar />, classname: 'searchbar' },
    {
      icon: FiShoppingCart,
      url: '/cart',
      classname: 'cart',
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {navItems.slice(0, 1).map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            url={item.url}
            imgsrc={item.imgsrc}
            classname={item.classname}
            isLoginFormRendered={isLoginFormRendered}
            setIsLoginFormRendered={setIsLoginFormRendered}
            isSidebarRendered={isSidebarRendered}
            setIsSidebarRendered={setIsSidebarRendered}
          />
        ))}
      </div>
      <div className="navbar-center">
        <NavItem
          component={navItems[2].component}
          classname={navItems[2].classname}
          isLoginFormRendered={isLoginFormRendered}
          setIsLoginFormRendered={setIsLoginFormRendered}
          isSidebarRendered={isSidebarRendered}
          setIsSidebarRendered={setIsSidebarRendered}
        />
      </div>
      <div className="navbar-right">
        {navItems.slice(3).map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            url={item.url}
            classname={item.classname}
            isLoginFormRendered={isLoginFormRendered}
            setIsLoginFormRendered={setIsLoginFormRendered}
            isSidebarRendered={isSidebarRendered}
            setIsSidebarRendered={setIsSidebarRendered}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
