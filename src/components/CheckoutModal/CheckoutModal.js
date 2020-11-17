import React from 'react'
import './checkoutmodal.scss';

export default function CheckoutModal({ total }) {
    return (
        <div className="CheckoutModal">
            <div className="CheckoutModal__modal">
                <div className="container">
                    <div className="content">
                        <h1>Confirm Total Amout:</h1>
                        <h2>${total}.00</h2>
                        <div className="actions">
                            <a id="btn_cancel">CANCEL</a>
                            <a id="btn_order">PLACE ORDER</a>
                        </div>
                    </div>
                    <div className="thank-you">
                        <span><i className="fas fa-heart"></i></span>
                        <h1>Thank you for purchasing from our store!</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
