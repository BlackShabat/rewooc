import "./MiniCart.scss";
import React from "react";
import Price from "../../Price/Price";
import {connect} from "react-redux";
import {getCartTotalPrice, getCartTotalQuantity} from "../../../../redux/selectors";

const MiniCart = (props) => {
  return (
    <div className="rw-mini-cart" onClick={props.onLoad}>
      Cart: {props.quantity} - <Price value={props.total}/>
    </div>
  );
};

const mapStateToProps = state => ({
  quantity: getCartTotalQuantity(state),
  total: getCartTotalPrice(state)
});

export default connect(mapStateToProps)(MiniCart);