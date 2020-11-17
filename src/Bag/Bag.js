import React, { useState, useEffect, useContext } from 'react'
import './bag.scss';
import { BagContext } from './../BagContext';
import { QtyContext } from './../QtyContext';
import CheckoutModal from './../components/CheckoutModal/CheckoutModal';

export default function Bag() {
    const [bagItems, setBagItems] = useContext(BagContext);
    const [bagQty, setBagQty] = useContext(QtyContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [modalPrice, setmodalPrice] = useState(0);

    const [bagModal, setbagModal] = useState();
    const [content, setContent] = useState();
    const [thankyou, setThankyou] = useState();
    const [btnCancel, setbtnCancel] = useState();
    const [btnOrder, setbtnOrder] = useState();

    useEffect(() => {
        setbagModal(document.querySelector('.Bag__modal'));
        setContent(document.querySelector('.content'));
        setThankyou(document.querySelector('.thank-you'));

        setbtnCancel(document.getElementById('btn_cancel'));
        setbtnOrder(document.getElementById('btn_order'));
    })

    useEffect(() => {
        let price = [];
        let sum = 0;
        bagItems.map((item, i) => {
            price = [...price, parseInt(item.prod_price.substring(1, item.prod_price.indexOf(".")))];
            sum = price.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
        })
        setTotalPrice(sum);
        setmodalPrice(sum);
    });

    useEffect(() => {
        let dup = [];
        let nondup = [];
        let tempbag = [];
        let newbag = [];
        let newItem;

        if(bagItems.length > 1) {
            tempbag = bagItems;
            
            let cnt = 0;
            let check = false;
            tempbag.forEach((item, i, arr) => { if(i < arr.length) {
                cnt = 0;
                tempbag.forEach((item2, j, arr2) => { if(j < arr2.length) {
                        if(tempbag[i].prod_id === tempbag[j].prod_id &&
                           tempbag[i].prod_size === tempbag[j].prod_size ) {
                            cnt++;
                        } // If tempbag has duplicates, it will count more than 1
                        if(cnt > 1) {
                            check = true;
                        }
                }});
            }}); // Check if tempbag has duplicates
                    
            if(!check) {
                nondup = tempbag;
                newbag = [...newbag, ...nondup];
                tempbag = [];
            }
            else {
                bagItems.forEach(item => { if(tempbag.length > 1) {

                    dup = tempbag.filter(dupitem => { // Place duplicates of tempbag[0] in dup
                        return (dupitem.prod_id === item.prod_id && dupitem.prod_size === item.prod_size);
                    })

                    cnt=0;
                    tempbag.forEach(nondupitem => {
                        if(item.prod_id === nondupitem.prod_id &&
                            item.prod_size === nondupitem.prod_size) {
                            cnt++;
                        }
                    }); // Check if this item has no duplicates
                    if(cnt === 1) {
                        nondup = [...nondup, item];
                    }
                    
                    newItem = { // Simplify all items within dup
                        prod_id: dup[0].prod_id,
                        prod_name: dup[0].prod_name,
                        prod_size: dup[0].prod_size,
                        prod_price: `$${(parseInt(dup[0].prod_price.substring(1, dup[0].prod_price.indexOf("."))) * (dup.length))}.00`,
                        prod_qty: ( dup.reduce((accumulator, currentValue) => accumulator + currentValue.prod_qty, 0) ),
                        prod_img: dup[0].prod_img
                    }
                    
                    cnt = 0;
                    if(dup.length > 1) {
                        if(newbag.length > 0 ) {
                            newbag.forEach(bagitem => {
                                if(bagitem.prod_id === newItem.prod_id &&
                                    bagitem.prod_size === newItem.prod_size ) {
                                        cnt++;
                                } // Checks to see if this item already exists in the array
                            })

                            if(cnt === 0) {
                                newbag = [...newbag, newItem];
                            } // If not, place the simplified item within new bagItems array
                            dup = [];
                            newItem = {};
                        }
                        else { // If newbag array is empty
                            newbag = [...newbag, newItem];
                            dup = [];
                            newItem = {};
                        }
                    }
                }})
                newbag = [...newbag, ...nondup];
            }
            setBagItems(newbag);
        }
    }, [])

    const remItem = e => {
        setBagItems(bagItems.filter(i => {
            return (i.prod_id !== e.target.dataset.id || i.prod_size !== e.target.dataset.size)
        }))
        
        setBagQty(bagQty - e.target.dataset.qty);
    }

    const openModal = () => {
        bagModal.classList.add('show');

        btnCancel.addEventListener('click', e => {
            bagModal.classList.remove('show');
        });

        btnOrder.addEventListener('click', e => {
            thankyou.classList.add('show');
            content.classList.add('hide');
            setBagItems([]);
            setBagQty(0);
            setTotalPrice(0);
            setmodalPrice(0);

            setTimeout(() => {
                bagModal.classList.remove('show');
            }, 3000);
        });
    }

    return (
        <div className="Bag">
            <div className="Bag__container">
               <div className="ItemsList">
                { bagItems.length
                    ?
                    <>
                        <div className="ItemsList__heading">
                            <h1>Your bag total is ${totalPrice}.00</h1>
                            <h4>Total items: {bagQty}</h4>
                        </div>

                        {bagItems.map((item, i) => {
                            return (
                                <>
                                    <div className="ItemsList__item" key={i}>
                                        <div className="ItemsList__item__img">
                                            <img src={require(`./../${item.prod_img}`)} alt={item.prod_name} />
                                        </div>
                                        <div className="ItemsList__item__desc">
                                            {/*<p>{item.prod_id}</p>*/}
                                            <h2>{item.prod_name}</h2>
                                            <p>Size: {item.prod_size}</p>
                                            <p>{item.prod_price}</p>
                                        </div>
                                        <div className="ItemsList__item__rem">
                                            <p>x{item.prod_qty}</p>
                                            <a onClick={remItem} data-id={item.prod_id} data-size={item.prod_size} data-qty={item.prod_qty}>Remove</a>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            )
                        })}

                        <div className="ItemsList__checkout">
                            <h4>Total: ${totalPrice}.00</h4>
                            <a onClick={openModal}>CHECKOUT</a>
                        </div>
                    </>
                    :
                    <div className="bag-empty">
                        <i className="fas fa-shopping-bag"></i>
                        <h1>Bag is empty</h1>
                        <p>Please add some items you wish to purchase.</p>
                    </div>
                }
               </div>
            </div>
            <div className="Bag__modal">
                <CheckoutModal total={modalPrice} />
            </div>
        </div>
    )
}
