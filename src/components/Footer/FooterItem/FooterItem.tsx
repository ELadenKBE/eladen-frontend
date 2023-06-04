import { Link } from 'react-router-dom';
import './FooterItem.scss';

interface FooterItemProps {
  label: string;
  url?: string;
  externalLink: boolean;
  onClick?: () => void;
  classname: string;
}

const FooterItem: React.FC<FooterItemProps> = ({
  label,
  url,
  externalLink,
  onClick,
  classname,
}: FooterItemProps) => {
  const handleClick = (): void => {
    onClick && onClick();
  };

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
        {label}{' '}
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
