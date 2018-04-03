import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    };

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        let ingredient = {};
        for(let param of query.entries()){
            if(param[0] === 'price'){
                this.state.price = param[1];
            }else{
                //['salad','1']
                ingredient[param[0]] = +param[1];
            }
        }

        this.setState({ingredients: ingredient});
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    };

    render () {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                checkoutCancelled={this.checkoutCancelHandler}
                                checkoutContinued={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path + '/contact-data'}
                       render={() => <ContactData ingredients={this.state.ingredients} price={this.state.price}/>} />
            </div>
        );
    }
}

export default Checkout;