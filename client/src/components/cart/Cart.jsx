import React from "react";
import "./cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../../makeRequest";

import { removeCart, resetCart } from "../../redux/cartReducer/cartReducer";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const { products } = useSelector((state) => state?.cart);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products?.forEach((item) => {
      total += item?.quantity * item?.price;
    });
    return total.toFixed(3);
  };

  const handleDeleteItem = (id) => {
    dispatch(removeCart(id));
  };

  const handleResetCart = () => {
    dispatch(resetCart());
  };
  const stripePromise = loadStripe('pk_test_51P7iIYLo8X3ZWN8jOj1OCMm84peDZUUi66E1Jo3LyxN8ukMSv796tqo8oGRsX76v08D2s7B18ToTTjiAMLbP0TCr00d5w68j9P');
  // const publishedKey = 'pk_test_51P7iIYLo8X3ZWN8jOj1OCMm84peDZUUi66E1Jo3LyxN8ukMSv796tqo8oGRsX76v08D2s7B18ToTTjiAMLbP0TCr00d5w68j9P'
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="cart">
      <h1>Products in your Cart</h1>
      {products &&
        products?.map((item) => (
          <div className="item" key={item?.id}>
            <img src={process.env.REACT_APP_UPLOAD_URL + item?.img} alt="" />
            <div className="details">
              <h1>{item?.title}</h1>
              <p>{item?.desc?.substring(0, 100)}</p>
              <div className="price">
                {item?.quantity} * ${item?.price}
              </div>
            </div>
            <DeleteOutlinedIcon
              className="delete"
              onClick={() => handleDeleteItem(item?.id)}
            />
          </div>
        ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={handleResetCart}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
