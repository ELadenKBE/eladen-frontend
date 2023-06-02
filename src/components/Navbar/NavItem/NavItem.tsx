import './NavItem.scss';
import { Link } from 'react-router-dom';

interface NavItemProps {
  onClick?: () => void;
  url?: string;
  icon?: React.ComponentType;
  classname: string;
  component?: React.ReactNode;
}

const NavItem = ({
  onClick,
  url,
  icon: Icon,
  classname,
  component,
}: NavItemProps) => {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <li onClick={handleClick} className={`navitem navitem-${classname}`}>
      {url ? <Link to={url}>{Icon && <Icon />}</Link> : Icon && <Icon />}
      {component}
    </li>
  );
};

export default NavItem;
