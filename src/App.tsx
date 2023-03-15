import Header from "./components/Layout/Header";
import {useState} from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./components/store/CartContextProvider";

function App() {

    const [cartVisible, setCartVisible] = useState<boolean>(false);


    const showCartHandler = () => {
        setCartVisible(true);
    }

    const hideCartHandler = () => {
        setCartVisible(false);
    }


    return (
        <CartContextProvider>
            {cartVisible && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <Meals/>
        </CartContextProvider>
    );
}

export default App
