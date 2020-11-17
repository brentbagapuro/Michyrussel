import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import './prodfilter.scss';
import Prods from './../../products.json';
import { FilterContext } from './../../FilterContext';

export default function ProdFilter() {
    const [categories, setCategories] = useState([]);
    const [catFilter, setCatFilter] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brandFilter, setBrandFilter] = useState([]);
    const [filter, setFilter] = useContext(FilterContext);
    const [url, setUrl] = useState(window.location.href);
    const [pageGender, setPageGender] = useState(window.location.href.substring(window.location.href.lastIndexOf("/") + 1));
    const [filterMobile, setFilterMobile] = useState();

    useEffect(() => {
        setFilterMobile(document.querySelector('.filter'));
    }, [categories])

    useEffect(() => {
        let checkboxes = document.querySelectorAll('.filter-checkbox');

        checkboxes.forEach(c => {
            if(c.checked === true) {
                c.checked = false;
                setCatFilter([]);
                setBrandFilter([]);
            }
        })
    }, [url])

    useEffect(() => {
        setFilter({ 
            category: catFilter,
            brand: brandFilter 
        });
    }, [catFilter, brandFilter]);

    useEffect(() => {
        // Set Categories for displaying
        let cats = Prods.map(cat => {
            if(cat.sex === pageGender[0].toUpperCase() + pageGender.slice(1))
                return cat.category;
        })

        cats = cats.filter(el => {
            return el != null;
        })

        cats = [...new Set(cats)];
        setCategories(cats);

        // Set Brands for displaying
        let bnds = Prods.map(b => {
            if(b.sex === pageGender[0].toUpperCase() + pageGender.slice(1))
                return b.brand;
        })

        bnds = bnds.filter(el => {
            return el != null;
        })

        bnds = [...new Set(bnds)];
        bnds = bnds.sort();
        setBrands(bnds);
    }, [pageGender]);

    const clearAll = () => {
        let checkboxes = document.querySelectorAll('.filter-checkbox');

        checkboxes.forEach(c => {
            if(c.checked === true) {
                c.checked = false;
                setCatFilter([]);
                setBrandFilter([]);
            }
        })
    }

    const getCats = e => {
        if(e.target.checked === true) {
            if(e.target.dataset.filter === "Category")
                setCatFilter(cat => [...cat, e.target.value]);
            else if(e.target.dataset.filter === "Brand")
                setBrandFilter(brand => [...brand, e.target.value]);
        }
        else if(e.target.checked === false) {
            if(e.target.dataset.filter === "Category") {
                let tempCat = [];
                tempCat = catFilter.filter(cat => {
                    return cat !== e.target.value;
                })
                setCatFilter(tempCat);
            }
            else if(e.target.dataset.filter === "Brand") {
                let tempBrand = [];
                tempBrand = brandFilter.filter(brand => {
                    return brand !== e.target.value;
                })
                setBrandFilter(tempBrand);
            }
        }
    }

    const openFilter = () => {
        filterMobile.classList.add('show');
    }

    const closeFilter = () => {
        filterMobile.classList.remove('show');
    }

    return (
        <div className="ProdFilter">
            {categories.length > 0 &&
                <>
                <h2>{pageGender[0].toUpperCase() + pageGender.slice(1)}'s Clothing</h2>
                <div className="filter">
                    <div className="btn-close" onClick={closeFilter}>
                        <div className="close-lines">
                            <span className="close-line"></span>
                            <span className="close-line"></span>
                        </div>
                    </div>

                    <div className="filter-label">
                        <div className="refine">
                            <span><i className="fas fa-filter"></i></span><h4>REFINE</h4>
                        </div>
                        <div className="refine2">
                            <h4>FILTER</h4>
                        </div>
                        <a onClick={clearAll}>Clear All</a>
                    </div>

                    <div className="filter-items">
                        <h4>Category</h4>
                        {categories.length > 0 &&
                            categories.map((cat, i) => {
                                return (
                                    <div className="checkboxes" key={i}>
                                        <input className="filter-checkbox" type="checkbox" id={`category${i+1}`} value={cat} onChange={getCats} data-filter="Category" />
                                        <label htmlFor={`category${i+1}`}>{cat}</label>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <hr />

                    <div className="filter-items">
                        <h4>Brand</h4>
                        {brands.length > 0 &&
                            brands.map((brand, i) => {
                                return (
                                    <div className="checkboxes" key={i}>
                                        <input className="filter-checkbox" type="checkbox" id={`brand${i+1}`} value={brand} onChange={getCats} data-filter="Brand" />
                                        <label htmlFor={`brand${i+1}`}>{brand}</label>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

                <div className="filter-label-mobile">
                        <div className="refine">
                            <span><i className="fas fa-filter"></i></span><a onClick={openFilter}>Refine</a>
                        </div>
                </div>
                <hr/>
                </>
            }
        </div>
    )
}
