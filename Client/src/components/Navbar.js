import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';
import { Button } from 'antd';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const menuItems = [
  {
    name: 'Makineler',
    link: '/machine/list'
  },
  {
    name: 'Hakkımızda',
    link: '/about'
  },
  {
    name: 'İletişim',
    link: '/contact'
  }
];

const Navbar = ({ pageName }) => {

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <img src={logo} alt='logo' className='logo' onClick={() => navigate('/')} />
        <ul className='nav-menu'>
          {menuItems.map((item, index) => (
            <li onClick={() => navigate(item.link)} key={index} className={pageName === item.name ? 'nav-item active' : 'nav-item'}>
              <div>{item.name}</div>
            </li>
          ))}
        </ul>
        <div className='nav-auth'>
          <Button type='default' onClick={() => navigate('/login')}>Giriş Yap</Button>
          <Button type='primary' onClick={() => navigate('/register')}>Kayıt Ol</Button>
        </div>

        {/*  Mobile Menu */}
        <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <AiOutlineClose size={25} /> : <GiHamburgerMenu size={25} />}
        </div>
        <div className={isMenuOpen ? 'mobile-menu open' : 'mobile-menu'}>
          <ul className='mobile-menu-items'>
            {menuItems.map((item, index) => (
              <li onClick={() => navigate(item.link)} key={index} className={pageName === item.name ? 'mobile-menu-item active' : 'mobile-menu-item'}>
                <div>{item.name}</div>
              </li>
            ))}
          </ul>
          <div className='mobile-menu-auth'>
            <Button type='default' onClick={() => navigate('/login')}>Giriş Yap</Button>
            <Button type='primary' onClick={() => navigate('/register')}>Kayıt Ol</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
