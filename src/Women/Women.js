import React from 'react'
import ProdFilter from './../components/ProdFilter/ProdFilter';
import Card from './../components/Card/Card';
import './women.scss';

export default function Women() {
    return (
        <div className="Women">
            <div className="Women__container">
                <ProdFilter />
                <Card />
            </div>
        </div>
    )
}