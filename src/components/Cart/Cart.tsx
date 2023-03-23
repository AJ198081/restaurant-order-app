// @ts-ignore
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext, {item} from "../store/cart-context";
import {useContext, useState} from "react";
import CartItem from "./CartItem";
import Checkout, {Delivery} from "./Checkout";
import axios from "axios";
import React from 'react';

interface CartProps {
    onClose: () => void
}

interface Order {
    deliveryAddress: Delivery;
    order: {
        items: item[];
        totalAmount: number;
    }
}

const Cart = ({onClose}: CartProps) => {

    const cartContext = useContext(CartContext);
    const hasItems = cartContext.items.length > 0;
    const [checkout, setCheckout] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);

    const totalAmount = `$${Math.abs(cartContext.totalAmount)
                                .toFixed(2)}`;

    const cartItemRemoveHandler = (item: item) => {
        cartContext.removeItem({...item, number: 1});
    }

    const cartItemAddHandler = (item: item) => {
        cartContext.addItem({...item, number: 1});
    }

    const orderHandler = () => {
        setCheckout(true);
    };

    const ServerClient = axios.create({
                                          baseURL: 'http://localhost:3500/',
                                          timeout: 8000,
                                          headers: {
                                              Accept: 'application/json'
                                          }
                                      });

    const submitOrderHandler = (delivery: Delivery) => {

        setIsSubmitting(true);

        const order = {
            deliveryAddress: delivery,
            order: {
                items: cartContext.items,
                totalAmount: cartContext.totalAmount
            }
        } as Order;

        ServerClient.post('/orders', order)
                    .then(response => {
                        console.log(response);
                        if (response.status === 201) {
                            setOrderSubmitted(true);
                            setIsSubmitting(false);
                        } else {
                            console.log('Can implement error flow here..')
                        }
                    });
    };

    const cartModalContents = <React.Fragment>
        <ul className={classes['cart-items']}>
            {cartContext.items.map((cartItem) => (
                <CartItem key={cartItem.id} name={cartItem.name} price={cartItem.price}
                          amount={cartItem.number}
                          onAdd={cartItemAddHandler.bind(null, cartItem)}
                          onRemove={cartItemRemoveHandler.bind(null, cartItem)}/>
            ))}
        </ul>

        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {
            checkout && <Checkout onConfirm={submitOrderHandler} onCancel={onClose}/>
        }
        {
            !checkout && <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={onClose}>Close</button>
                {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>
        }</React.Fragment>

    const orderSubmittingModalContents = <p>Sending order data...</p>

    const orderSubmittedModalContents = <React.Fragment>
        <p> Your meal has been sent to the restaurant for preparation.</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={onClose}>Close</button>
        </div>
    </React.Fragment>

    return (<Modal onClose={onClose}>
        {!orderSubmitted && !isSubmitting && cartModalContents}
        {isSubmitting && orderSubmittingModalContents}
        {orderSubmitted && !isSubmitting && orderSubmittedModalContents}
    </Modal>);
}

export default Cart;