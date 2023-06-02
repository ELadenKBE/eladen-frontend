import LoginForm from '../components/Navbar/LoginForm/LoginForm';
import Sidebar from '../components/Navbar/Sidebar/Sidebar';
import ProductFrame from '../components/ProductFrame/ProductFrame';

interface LandingpageProps {
  isLoginFormRendered: boolean;
  isSidebarRendered: boolean;
}

const Landingpage = ({
  isLoginFormRendered,
  isSidebarRendered,
}: LandingpageProps) => {
  return (
    <>
      {isSidebarRendered && <Sidebar />}
      {isLoginFormRendered && <LoginForm />}
      <ProductFrame />
    </>
  );
};

export default Landingpage;
