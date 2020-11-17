import React, { useState, useEffect, useContext } from 'react'
import './navbar.scss';
import { Link } from 'react-router-dom';
import { QtyContext } from './../../QtyContext';

export default function Navbar() {
    const [navMenu, setNavMenu] = useState();
    const [navLinks, setNavLinks] = useState();
    const [firstLine, setFirstLine] = useState();
    const [secondLine, setSecondLine] = useState();
    const [thirdLine, setThirdLine] = useState();
    const [bagQty] = useContext(QtyContext);

    useEffect(() => {
        setNavMenu(document.querySelector('nav'));
        setNavLinks(document.querySelector('ul'));
        setFirstLine(document.getElementById('first'));
        setSecondLine(document.getElementById('second'));
        setThirdLine(document.getElementById('third'));
    }, []);

    const openMenu = () => {
        navMenu.classList.toggle('show-nav');
        navLinks.classList.toggle('show-links');
        firstLine.classList.toggle('first-line');
        secondLine.classList.toggle('second-line');
        thirdLine.classList.toggle('third-line');
    }

    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">
                    <h1>Michyrussel</h1>
                </Link>
            </div>
            <nav>
                <ul>
                    <Link to="/men">
                        <li>Men</li>
                    </Link>
                    <Link to="/women">
                        <li>Women</li>
                    </Link>
                    <Link to="/bag">
                        <li><i className="fas fa-shopping-bag"></i><span> ({bagQty})</span></li>
                    </Link>
                </ul>
            </nav>
            <div className="burger" onClick={openMenu}>
                <span className="burger-line" id="first"></span>
                <span className="burger-line" id="second"></span>
                <span className="burger-line" id="third"></span>
            </div>
        </div>
    )
}
