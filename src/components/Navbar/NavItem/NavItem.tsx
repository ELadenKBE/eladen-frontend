import { IconType } from 'react-icons';
import './NavItem.scss';
import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

// Interface for the NavItem component props
interface NavItemProps {
  url?: string;
  icon?: IconType;
  imgsrc?: string;
  classname: string;
  component?: React.ReactNode;
  isLoginFormRendered: boolean;
  setIsLoginFormRendered: Dispatch<SetStateAction<boolean>>;
  isSidebarRendered: boolean;
  setIsSidebarRendered: Dispatch<SetStateAction<boolean>>;
}

/**
 * Renders a NavItem that can be another component, a link, or just an icon
 * @param url - URL when it redirects to another page
 * @param icon - Icon to display an icon
 * @param imgsrc - Base64 data of the logo
 * @param classname - Classname of the NavItem
 * @param component - Component to render
 * @param isLoginFormRendered - Whether the login form is rendered
 * @param setIsLoginFormRendered - Function to set if the login form should be rendered or not
 * @param isSidebarRendered - Whether the sidebar is rendered
 * @param setIsSidebarRendered - Function to set if the sidebar should be rendered or not
 * @returns NavItem
 */
const NavItem: React.FC<NavItemProps> = ({
  url,
  icon: Icon,
  imgsrc,
  classname,
  component,
  isLoginFormRendered,
  setIsLoginFormRendered,
  isSidebarRendered,
  setIsSidebarRendered,
}) => {
  /**
   * Handles a click on a NavItem and renders the corresponding component if there is one
   * @param classname - Classname to match the correct component
   */
  const handleClick = (classname: string): void => {
    if (classname === 'sidebar') {
      setIsSidebarRendered(!isSidebarRendered);
    } else if (classname === 'login') {
      setIsLoginFormRendered(!isLoginFormRendered);
    }
  };

  return (
    <li
      onClick={() => handleClick(classname)}
      className={`navitem navitem-${classname}`}
    >
      {url && imgsrc ? (
        <Link to={url}>
          <img src={imgsrc} alt="logo" />
        </Link>
      ) : url ? (
        <Link to={url}>
          {Icon && <Icon color="white" size={31} />}
          {component}
        </Link>
      ) : (
        <>
          {Icon && <Icon color="white" size={31} />}
          {component}
        </>
      )}
    </li>
  );
};

export default NavItem;
