import React, { Dispatch, SetStateAction } from 'react';
import LoginForm from '../Navbar/LoginForm/LoginForm';
import './Footer.scss';
import FooterItem from './FooterItem/FooterItem';

interface FooterProps {
  isLoginFormRendered: boolean;
  setIsLoginFormRendered: Dispatch<SetStateAction<boolean>>;
  isSidebarRendered: boolean;
  setIsSidebarRendered: Dispatch<SetStateAction<boolean>>;
}

interface IFooterItem {
  label: string;
  component?: React.ReactNode;
  url?: string;
  externalLink: boolean;
  onClick?: () => void;
  classname: string;
}

const Footer = ({
  isLoginFormRendered,
  setIsLoginFormRendered,
  isSidebarRendered,
  setIsSidebarRendered,
}: FooterProps) => {
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

  const footerItems: IFooterItem[] = [
    {
      label: 'Einloggen',
      component: <LoginForm />,
      externalLink: false,
      onClick: () => handleItemClick('login'),
      classname: 'footer-login',
    },
    {
      label: 'Registrieren',
      component: <LoginForm />,
      externalLink: false,
      onClick: () => handleItemClick('login'),
      classname: 'footer-register',
    },
    {
      label: 'Warenkorb',
      url: '/cart',
      externalLink: false,
      onClick: () => handleItemClick(null),
      classname: 'footer-cart',
    },
    {
      label: 'Unser Github',
      url: 'https://github.com/your-github-repo',
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
