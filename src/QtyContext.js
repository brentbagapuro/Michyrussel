import React, { useState, createContext } from 'react';

export const QtyContext = createContext();

export const QtyProvider = (props) => {
    const [bagQty, setBagQty] = useState(0);

    return (
        <QtyContext.Provider value={[bagQty, setBagQty]}>
            {props.children}
        </QtyContext.Provider>
    )
}