import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  const { cartItems, total } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  if (cartItems.length < 1) {
    return (
      <section className="cart">
        <header>
          <h2>MY BAG</h2>
          <h3 className="empty-cart">is empty 😭 </h3>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>MY BAG</h2>
      </header>

      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>

      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            Total
            <span>{total.toFixed(2)}₺</span>
          </h4>
        </div>

        <button onClick={() => dispatch(openModal())} className="btn clear-btn">
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
