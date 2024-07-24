import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/images/logo.png';
import { Button, Select } from 'antd';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from 'react-i18next';



const languageItems = [
  {
    name: 'TR',
    value: 'tr',
    img: require('../assets/images/tr.png')
  },
  {
    name: 'EN',
    value: 'en',
    img: require('../assets/images/en.png')
  }
];


const Navbar = ({ pageName }) => {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const menuItems = [
    {
      name: t('navbar.menuItems.machines'),
      link: '/machine/list'
    },
    {
      name: t('navbar.menuItems.about'),
      link: '/about'
    },
    {
      name: t('navbar.menuItems.contact'),
      link: '/contact'
    }
  ];
  // t

  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const LanguageSelect = () =>
    <Select style={{ width: "80px" }} value={i18n.language} onChange={(value) => i18n.changeLanguage(value)}>
      {languageItems.map((item, index) =>
        <Select.Option key={index} value={item.value} style={{ marginBottom: "5px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={item.img} alt={item.name} width={16} /> {item.name}
          </div>
        </Select.Option>
      )}
    </Select>

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
          <Button type='default' onClick={() => navigate('/login')}>{t('navbar.login')}</Button>
          <Button type='primary' onClick={() => navigate('/register')}>{t('navbar.register')}</Button>
          {/* Language Selector */}
          <div className='language-selector'>
            <LanguageSelect />
          </div>
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
            <Button type='default' onClick={() => navigate('/login')}>{t('navbar.login')}</Button>
            <Button type='primary' onClick={() => navigate('/register')}>{t('navbar.register')}</Button>
            <div className='language-selector'>
              <LanguageSelect />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
