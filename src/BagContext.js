import React, { useState, createContext } from 'react';

export const BagContext = createContext();

export const BagProvider = (props) => {
    const [bagItems, setBagItems] = useState([]);

    return (
        <BagContext.Provider value={[bagItems, setBagItems]}>
            {props.children}
        </BagContext.Provider>
    )
}
