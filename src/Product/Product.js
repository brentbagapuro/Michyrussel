import React, { useState, useEffect, useContext } from 'react'
import './product.scss';
import Prods from './../products.json';
import { BagContext } from './../BagContext';
import { QtyContext } from './../QtyContext';


export default function Product({ match }) {
    const [main_img, setMain_img] = useState(Prods[match.params.id-1].images[0]);
    const [bagItems, setBagItems] = useContext(BagContext);
    const [bagQty, setBagQty] = useContext(QtyContext);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");

    useEffect(() => {
       setName(document.querySelector('.desc__name').innerHTML);
       setPrice(document.querySelector('.desc__price').innerHTML);
       let sel = document.querySelector(".sizing");
       setSize(sel.options[sel.selectedIndex].value);
    }, []);

    const getSelected = () => {
        let sel = document.querySelector(".sizing");
        setSize(sel.options[sel.selectedIndex].value);
    }

    const imgClick = e => {
        setMain_img(Prods[match.params.id-1].images[e.target.dataset.num]);
    }

    const addToBag = () => {
        setBagItems(items => [...items, 
            {
                prod_id: match.params.id,
                prod_name: name,
                prod_size: size,
                prod_price: price,
                prod_qty: 1,
                prod_img: Prods[match.params.id-1].images[0]
            }
        ])

        setBagQty(bagQty+1);
    }

    return (
        <div className="Product">
            
                {Prods.map(p => {
                    if(p.id == match.params.id) {
                        return(
                            <div className="Product__container" key={p.id}>
                                <div className="img-list">
                                    {p.images.map((img, i) => 
                                        <img src={require(`./../${img}`)} alt={p.name} key={i} data-num={i} onClick={imgClick} />
                                    )}
                                </div>

                                <div className="main-img">
                                    <img className="Card__img" src={require(`./../${main_img}`)} alt={p.name} />
                                </div>

                                <div className="desc">
                                    <h2 className="desc__brand">{p.brand}</h2>
                                    <h4 className="desc__name">{p.name}</h4>
                                    <p className="desc__price">{p.price}</p>

                                    <div className="incentives">
                                        <div className="incentives__content">
                                            <p>30-Day Return</p>
                                            <span><p>Free</p></span>
                                        </div>

                                        <div className="incentives__content">
                                            <p>Cash On Delivery</p>
                                            <span><p>Yes</p></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="purchase-option">
                                    <div className="authenticity">
                                        <i className="fas fa-award"></i>
                                        <p>100% Original Product</p>
                                    </div>
                                    <h4>SELECT SIZE</h4>
                                    <select className="sizing" name="sizing" onChange={getSelected}>
                                        {p.size.map((s, i) => {
                                            return (
                                                <option value={s} key={i}>{s}</option>
                                            )
                                        })}
                                    </select>
                                    <a onClick={addToBag}>ADD TO BAG</a>
                                </div>
                            </div>
                        )
                    }
                })}
        </div>
    )
}
