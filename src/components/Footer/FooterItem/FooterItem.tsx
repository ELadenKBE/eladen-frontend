import { Link } from 'react-router-dom';
import './FooterItem.scss';

// Interface for the FooterItem component props
interface FooterItemProps {
  label: string;
  url?: string;
  externalLink: boolean;
  onClick?: () => void;
  classname: string;
}

// FooterItem component
const FooterItem: React.FC<FooterItemProps> = ({
  label,
  url,
  externalLink,
  onClick,
  classname,
}) => {
  // Function to handle clicks on footer items
  const handleClick = (): void => {
    onClick && onClick();
  };

  // Determine the content based on whether the item has a URL or not
  const content: React.ReactNode = url ? (
    externalLink ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`footer-item footer-item-${classname}`}
      >
        {label}
      </a>
    ) : (
      <Link to={url} className={`footer-item footer-item-${classname}`}>
        {label}
      </Link>
    )
  ) : (
    label
  );

  return (
    <li
      onClick={handleClick}
      className={`footer-item footer-item-${classname}`}
    >
      {content}
    </li>
  );
};

export default FooterItem;
