import React from 'react';
import cartsvg from './../img/shopping-cart.svg';
import PropTypes from 'prop-types';


function CartCount(props) {
  const CartCountStyle = {
    display:"flex",
    flexDirection:"row",
    alignItems: "center"
  }

  const pStyle = {
    margin:"0",
    lineHeight:"12px",
    paddingTop:"7px",
    paddingLeft: "6px",
    fontSize: "15px",
    color:(props.count > 0 ? "blue" : "red")
  }
  return (
    <div style={CartCountStyle}>
      <img alt="shopping cart" src={cartsvg} />
      <div style={pStyle}>
        {props.count}
      </div>  
    </div>
  )
}

CartCount.propTypes = {
  count: PropTypes.number,
}

export default CartCount;