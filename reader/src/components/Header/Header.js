import './Header.css';
import logo from '../../assets/logo.png';
import { Outlet, Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Header() {
  return (
    <>
    <header>
      <img src={logo} />

      <nav>
        <ul>
          <li><Link to='/'>Articles</Link></li>
          <li><Link to='/inspiration'>Inspiration</Link></li>
          <li><Link to='/aboutus'>About us</Link></li>
          <li><Link to='/login'>Login</Link></li>  
        </ul>
      </nav>
    </header>

    <Outlet />

    <Footer />
    </>
  );
}

export default Header;
