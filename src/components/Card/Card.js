import React, { useState, useEffect, useContext } from 'react'
import Prods from './../../products.json';
import './card.scss';
import { Link } from 'react-router-dom';
import { FilterContext } from './../../FilterContext';

export default function Card() {
    const [filter, setFilter] = useContext(FilterContext);
    const [ProdList, setProdList] = useState();
    const [none, setNone] = useState();
    const [url, setUrl] = useState(window.location.href);
    const [curl, setCurl] = useState();
    const [pageGender, setPageGender] = useState();

    useEffect(() => {
        if (window.location.href.indexOf("/men") > -1) {
            setPageGender("Men");
            setCurl("/men/");
        } else if (window.location.href.indexOf("/women") > -1) {
            setPageGender("Women");
            setCurl("/women/");
        }
    }, [url]);

    useEffect(() => {
        setProdList(document.querySelector('.ProdList'));
    }, [])

    useEffect(() => {
        let nores;
        if(typeof(ProdList) != "undefined") {
            nores = document.createElement('h1');
            nores.innerHTML = "No Results Found";
            nores.classList.add('No-results');
            setNone(nores);
        }
    }, [ProdList])

    useEffect(() => {
        if(typeof(none) != "undefined") {
            ProdList.appendChild(none);
        }
    }, [filter])

    useEffect(() => {
        if(Object.keys(filter).length > 0) {
            if(filter.category.length > 0 || filter.brand.length > 0) {
                if(typeof(ProdList) != "undefined") {
                    if(ProdList.childNodes.length === 1) {
                        none.classList.add('show');
                    }
                    else {
                        if(typeof(none) != "undefined") {
                            if(none.classList.contains('show')) {
                                none.classList.remove('show');
                            }
                        }
                    }
                }
            }
        }
    })

    return (
        <div className="ProdList">
            {Object.keys(filter).length > 0 &&  (
                filter.category.length > 0 || filter.brand.length > 0
                ? (
                    filter.category.length > 0 && filter.brand.length > 0
                    ? ( 
                        filter.category.map(filCat => { return (
                            filter.brand.map(filBrand => { return (
                                Prods.map(p => {
                                    if(p.sex === pageGender && p.category === filCat && p.brand === filBrand) {
                                        return (
                                            <Link to={`${curl}${p.id}`} key={p.id}>
                                                <div className="Card" key={p.id}>
                                                    <img className="Card__img" src={require(`./../../${p.images[0]}`)} alt={p.name} />
                                                    <h4 className="Card__brand">{p.brand}</h4>
                                                    <p className="Card__name">{p.name}</p>
                                                    <h4 className="Card__price">{p.price}</h4>
                                                </div>
                                            </Link>
                                        )
                                    }
                                })
                            )})
                        )})
                    ) :
                    filter.category.length > 0
                    ? (
                        filter.category.map(filCat => { return (
                            Prods.map(p => {
                                if(p.sex === pageGender && p.category === filCat) {
                                    return (
                                        <Link to={`${curl}${p.id}`} key={p.id}>
                                            <div className="Card" key={p.id}>
                                                <img className="Card__img" src={require(`./../../${p.images[0]}`)} alt={p.name} />
                                                <h4 className="Card__brand">{p.brand}</h4>
                                                <p className="Card__name">{p.name}</p>
                                                <h4 className="Card__price">{p.price}</h4>
                                            </div>
                                        </Link>
                                    )
                                }
                            })
                        )})
                    ) 
                    : (
                        filter.brand.map(filBrand => { return (
                            Prods.map(p => {
                                if(p.sex === pageGender && p.brand === filBrand) {
                                    return (
                                        <Link to={`${curl}${p.id}`} key={p.id}>
                                            <div className="Card" key={p.id}>
                                                <img className="Card__img" src={require(`./../../${p.images[0]}`)} alt={p.name} />
                                                <h4 className="Card__brand">{p.brand}</h4>
                                                <p className="Card__name">{p.name}</p>
                                                <h4 className="Card__price">{p.price}</h4>
                                            </div>
                                        </Link>
                                    )
                                }
                            })
                        )})
                    )
                )
                : (
                    Prods.map(p => {
                        if(p.sex === pageGender) {
                            return (
                                <Link to={`${curl}${p.id}`} key={p.id}>
                                    <div className="Card" key={p.id}>
                                        <img className="Card__img" src={require(`./../../${p.images[0]}`)} alt={p.name} />
                                        <h4 className="Card__brand">{p.brand}</h4>
                                        <p className="Card__name">{p.name}</p>
                                        <h4 className="Card__price">{p.price}</h4>
                                    </div>
                                </Link>
                            )
                        }
                    })
                )
            )}
        </div>
    )
}
