import './Header.scss';
import { HeaderNav } from './HeaderNav/HeaderNav';

const Header = () => {
  return (
    <header>
      <div className="header-logo">LOGO</div>

      {/* put navigation into a component at some point */}
      <HeaderNav />
    </header>
  );
};

export default Header;
