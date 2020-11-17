import React from 'react'
import './home.scss';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="Home">
            <div className="Home__container">
                
                <div className="shop-men">
                    <Link to="/men">
                        <img src={require(`./../img/Mens.jpg`)} alt="Men"/>
                    </Link>
                </div>
                
                <div className="shop-women">
                    <Link to="/women">
                        <img src={require(`./../img/Womens.jpg`)} alt="Women"/>
                    </Link>
                </div>
                
            </div>
        </div>
    )
}
