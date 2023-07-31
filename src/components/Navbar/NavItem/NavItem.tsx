import { IconType } from 'react-icons';
import './NavItem.scss';
import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

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
 * @param url given when it redirects to another page
 * @param icon  given when it displays an icon
 * @param imgsrc  for the base64 data of the logo
 * @param classname the classname of the NavItem
 * @param component given when it renders a component
 * @param isLoginFormRendered if the login form is rendered
 * @param setIsLoginFormRendered set if the loginform should be rendered or not
 * @param isSidebarRendered if the sidebar is rendered
 * @param setIsSidebarRendered set if the sidebar should be rendered or not
 * @returns NavItem
 */
const NavItem = ({
  url,
  icon: Icon,
  imgsrc,
  classname,
  component,
  isLoginFormRendered,
  setIsLoginFormRendered,
  isSidebarRendered,
  setIsSidebarRendered,
}: NavItemProps) => {
  /**
   * Handles a click on a NavItem and renders the corresponding component if there is one
   * @param classname to match the correct component
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
          {Icon && <Icon color="black" size={31} />}
          {component}
        </Link>
      ) : (
        <>
          {Icon && <Icon color="black" size={31} />}
          {component}
        </>
      )}
    </li>
  );
};

export default NavItem;
