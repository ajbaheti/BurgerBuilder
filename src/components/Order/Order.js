import React from 'react';

import classes from './Order.css';

const order = (props) => {

    let ingredients = [];

    for (let ingName in props.ingredients){
        ingredients.push({
            name: ingName,
            amount: props.ingredients[ingName]
        });
    }

    const ingOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                padding: '5px',
                margin: '0 8px',
                border: '1px solid #ccc'}}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingOutput }</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;