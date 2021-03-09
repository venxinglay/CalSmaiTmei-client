import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideMenu } from '../components/SideMenu.js';
import './Authentication.css';
import { IconContext } from 'react-icons';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Header(props) {
    const [sideMenu, setSideMenu] = useState(false);
    const history = useHistory();
    const showSideMenu = () => setSideMenu(!sideMenu);

    const handleLogout = () => {
        localStorage.clear();
        props.setUser(null);
        history.push('/signIn');
    };
    let shows;
    if (props.user) {
        shows = (
            <div className='login-logout'>
                <Link onClick={handleLogout} className='login'>
                    Log out
                </Link>
            </div>
        );
    } else {
        shows = (
            <div className='login-logout'>
                <Link to='/SignIn' className='login'>
                    Log In
                </Link>
            </div>
        );
    }
    return (
        <div id='header'>
            <IconContext.Provider value={{ color: '#52616b' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSideMenu} />
                    </Link>
                    <span class='navbar-brand h1'>CAL SMEi-TMEi</span>
                    {shows}
                </div>

                <nav className={sideMenu ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSideMenu}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-close'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SideMenu.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    );
}

export default Header;
