import React, { Dispatch, SetStateAction } from 'react';
import './Footer.scss';
import FooterItem from './FooterItem/FooterItem';

// Interface for each footer item
interface IFooterItem {
  label: string;
  component?: React.ReactNode;
  url?: string;
  externalLink: boolean;
  onClick?: () => void;
  classname: string;
}

// Props interface for the Footer component
interface FooterProps {
  isLoginFormRendered: boolean;
  setIsLoginFormRendered: Dispatch<SetStateAction<boolean>>;
  isSidebarRendered: boolean;
  setIsSidebarRendered: Dispatch<SetStateAction<boolean>>;
}

// Footer component
const Footer: React.FC<FooterProps> = ({
  isLoginFormRendered,
  setIsLoginFormRendered,
  isSidebarRendered,
  setIsSidebarRendered,
}) => {
  // Function to handle clicks on footer items
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

  // Array of footer items
  const footerItems: IFooterItem[] = [
    {
      label: 'Warenkorb',
      url: '/cart',
      externalLink: false,
      onClick: () => handleItemClick(null),
      classname: 'footer-cart',
    },
    {
      label: 'Unser Github',
      url: 'https://github.com/ELadenKBE',
      externalLink: true,
      onClick: () => handleItemClick(null),
      classname: 'footer-github',
    },
  ];

  return (
    <footer className="footer">
      <ul className="footer-items-container">
        {footerItems.map((footerItem: IFooterItem, index: number) => (
          <FooterItem
            key={index}
            label={footerItem.label}
            url={footerItem.url}
            externalLink={footerItem.externalLink}
            onClick={footerItem.onClick}
            classname={footerItem.classname}
          />
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
