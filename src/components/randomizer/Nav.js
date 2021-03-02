import React from 'react'
import './App.css';

const Nav = (props) => {
    const navMenu = [
        'Random Picker',
        'Custom List',
        'Decision Maker',
        'Name Picker',
        'Team Generator',
        'Yes or No',
    ];
    const [active, setActive] = React.useState(null);

    const handleSelectRandomizer = (id, item) => {
        setActive(id)
        props.onSelectRandomizer(item)
    };

    let randomizer_nav = "randomizer-nav";
    return (
        <ul className='randomizer-navbar'>
            {
                navMenu.map((item, index) => (
                    <li id="myDIV" className={
                        index === active ? "active" : "randomizer-nav"
                    } onClick={() => handleSelectRandomizer(index, item)}>{item}</li>
                ))
            }
        </ul>
    );
};

export default Nav;

        // <li className='randomizer-nav active' onClick={() => handleSelectRandomizer('Custom List')} activeClass="active">a</li>
        // <li className='randomizer-nav' onClick={() => props.onSelectRandomizer('Decision Maker')} activeClass="active">a</li>
        // <li className='randomizer-nav' onClick={() => props.onSelectRandomizer('Name Picker')} activeClass="active">a</li>
        // <li className='randomizer-nav' onClick={() => props.onSelectRandomizer('Team Generator')} activeClass="active">a</li>
        // <li className='randomizer-nav' onClick={() => props.onSelectRandomizer('Yes or No')}>a</li>
