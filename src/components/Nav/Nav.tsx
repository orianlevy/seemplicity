import React from 'react';
import { NavLink} from "react-router-dom";
import './Nav.css';
import {ReactComponent as SeemplicityLogo} from '../../assets/logos/full/seemplicity-full.svg';
import {ReactComponent as Settings} from '../../assets/icons/settings.svg';
import {ReactComponent as User} from '../../assets/icons/user.svg';



const Nav = () => {
    return (
        <div>
            <nav className="nav-header">
                <div className="navbar-group">
                    <SeemplicityLogo />
                    <div className="nh-link-wrapper ">
                        <NavLink to="/dashboard"><button className="nh-link">Dashboard</button></NavLink>
                        <NavLink to="/findings"><button className="nh-link">Findings</button></NavLink>
                        <NavLink to="/remediation"><button className="nh-link">Remediation</button></NavLink>
                        <NavLink to="/rules"><button className="nh-link">Rules</button></NavLink>
                    </div>
                </div>
                <div className="navbar-group right-side">
                    <button className="icon"><Settings /></button>
                    <button className="icon"><User /></button>
                    <b>John@seemplicity.io</b>
                </div>
            </nav>
        </div>
    );
};

export default Nav;