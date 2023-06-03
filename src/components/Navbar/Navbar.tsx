import "./Navbar.scss";
import { Dispatch, SetStateAction } from "react";
import {
  FiShoppingCart,
  FiGlobe,
  FiMoon,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import Searchbar from "./Searchbar/Searchbar";
import NavItem from "./NavItem/NavItem";
import { IconType } from "react-icons";

interface NavbarProps {
  isLoginFormRendered: boolean;
  setIsLoginFormRendered: Dispatch<SetStateAction<boolean>>;
  isSidebarRendered: boolean;
  setIsSidebarRendered: Dispatch<SetStateAction<boolean>>;
}
interface NavItemConfig {
  icon?: IconType;
  url?: string;
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
const Navbar = ({
  isLoginFormRendered,
  setIsLoginFormRendered,
  isSidebarRendered,
  setIsSidebarRendered,
}: NavbarProps) => {
  const navItems: NavItemConfig[] = [
    {
      icon: FiMenu,
      classname: "sidebar",
    },
    {
      url: "/",
      classname: "logo",
    },
    { component: <Searchbar />, classname: "searchbar" },
    {
      icon: FiGlobe,
      classname: "language",
    },
    {
      icon: FiMoon,
      classname: "darkmode",
    },
    {
      icon: FiUser,
      classname: "login",
    },
    {
      icon: FiShoppingCart,
      url: "/cart",
      classname: "cart",
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {navItems.slice(0, 2).map((item, index) => (
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
