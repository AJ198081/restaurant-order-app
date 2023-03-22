// @ts-ignore
import classes from './Checkout.module.css';
import React, {useState} from "react";

interface CheckoutProps {
    onCancel: () => void
}

interface Delivery {
    name: string;
    street: string;
    postCode: string;
    city: string;
}

const initialDeliveryState = {
    name: '',
    street: '',
    postCode: '',
    city: ''
}

interface FormValidityType {
}

interface FormValidityType {
    name: boolean;
    street: boolean;
    city: boolean;
    postCode: boolean;
}

const initialFormValidityState = {
    name: true,
    street: true,
    city: true,
    postCode: true
};
const Checkout = ({onCancel}: CheckoutProps) => {

    const [delivery, setDelivery] = useState<Delivery>(initialDeliveryState);
    const [formValidity, setFormValidity] = useState<FormValidityType>(initialFormValidityState);

    const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isNameValid = delivery.name.trim().length >= 2;
        const isStreetValid = delivery.street.trim().length >= 2;
        const isCityValid = delivery.city.trim().length >= 2;
        const isPostCodeValid = delivery.postCode.trim().length === 4;

        if (isNameValid && isPostCodeValid && isStreetValid && isCityValid) {
            console.log(delivery);
        } else {
            setFormValidity({
                                name: isNameValid,
                                street: isStreetValid,
                                city: isCityValid,
                                postCode: isPostCodeValid
                            });
        }
    };
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {

        setDelivery(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))


    };
    return <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id={"name"} name={'name'} value={delivery.name} onChange={handleName}/>
            {!formValidity.name && <p>Please Enter a valid Name, at least 2 character long</p>}
        </div>
        <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid}`}>
            <label htmlFor={"street"}>Street</label>
            <input type="text" id={"street"} name={'street'} value={delivery.street} onChange={handleName}/>
            {!formValidity.name && <p>Please Enter a valid street address, at least 2 character long</p>}
        </div>
        <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid}`}>
            <label htmlFor={"city"}>City</label>
            <input type="text" id={"city"} name={'city'} value={delivery.city} onChange={handleName}/>
            {!formValidity.name && <p>Please Enter a valid city name, at least 2 character long</p>}
        </div>
        <div className={`${classes.control} ${formValidity.postCode ? '' : classes.invalid}`}>
            <label htmlFor={"postal"}>Post Code</label>
            <input type="text" id={"postal"} name={'postCode'} value={delivery.postCode} onChange={handleName}/>
            {!formValidity.name && <p>Please Enter a valid post code, at least 4 character long</p>}
        </div>
        <div className={classes.actions}>
            <button type={"button"} onClick={onCancel}>Cancel</button>
            <button type={"submit"} className={classes.submit}>Confirm</button>
        </div>
    </form>;
};

export default Checkout;