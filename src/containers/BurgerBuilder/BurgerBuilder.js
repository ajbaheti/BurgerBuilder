import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    cheese: 0.5,
    bacon: 0.7,
    meat: 1.3,
    salad: 0.5
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            cheese: 0,
            bacon: 0,
            meat: 0,
            salad: 0
        },
        totalPrice: 1,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState = (currIngredients) => {
        const sum = Object.keys(currIngredients)
            .map((igKey) => {
                return currIngredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0});
    };

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = INGREDIENTS_PRICE[type] + this.state.totalPrice;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        let newPrice = 0;
        if(updatedIngredients[type] > 0){
            updatedIngredients[type] = this.state.ingredients[type] - 1;
            newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
        }

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    purchasable = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert("Continue to Purchase");
    };

    render () {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  price={this.state.totalPrice}
                                  cancelPurchase={this.purchaseCancelHandler}
                                  continuePurchase={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasable}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;