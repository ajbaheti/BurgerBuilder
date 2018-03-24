import React from 'react';

import classes from './Logo.css';
import BurgerLogo from '../../assets/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt="Burger" />
    </div>
);

export default logo;