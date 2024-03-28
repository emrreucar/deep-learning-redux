import { useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "../icons";
import { decrease, increase, removeItem } from "../features/cart/cartSlice";

import { TrashIcon } from "../icons";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />

      <div>
        <h4> {title} </h4>
        <h4 className="item-price"> {price}₺ </h4>

        <button
          style={{ border: "none", cursor: "pointer" }}
          onClick={() => {
            if (
              window.confirm(
                `${title} ürününü silmek istediğinizden emin misiniz?`
              )
            ) {
              dispatch(removeItem(id));
            }
          }}
        >
          <TrashIcon />
        </button>
      </div>

      <div>
        <button onClick={() => dispatch(increase(id))} className="amount-btn">
          <ChevronUp />
        </button>

        <p className="amount"> {amount} </p>

        <button
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
          className="amount-btn"
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
