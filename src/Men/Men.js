import React from 'react'
import ProdFilter from './../components/ProdFilter/ProdFilter';
import Card from './../components/Card/Card';
import './men.scss';

export default function Men() {
    return (
        <div className="Men">
            <div className="Men__container">
                <ProdFilter />
                <Card />
            </div>
        </div>
    )
}
