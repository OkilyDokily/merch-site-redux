import React from 'react';
import cartsvg from './../img/shopping-cart.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function CartCount(props) {

  function count() {
    const keyArr = Object.keys(props.cart);
    let counter = 0;
    keyArr.forEach(key => {
      counter += props.cart[key].purchaseQuantity;
    });
    return counter;
  }

  const CartCountStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }

  const pStyle = {
    margin: "0",
    lineHeight: "12px",
    paddingTop: "7px",
    paddingLeft: "6px",
    fontSize: "15px",
    color: (props.count > 0 ? "blue" : "red")
  }
  return (
    <div style={CartCountStyle}>
      <img alt="shopping cart" src={cartsvg} />
      <div style={pStyle}>
        {count()}
      </div>
    </div>
  )
}

CartCount.propTypes = {
  count: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    cart: state.cartList
  }
}
CartCount = connect(mapStateToProps)(CartCount);
export default CartCount;