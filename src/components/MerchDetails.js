import React from "react";
import PropTypes from 'prop-types';

function MerchDetails(props)
{

  const cartArr = props.cartList;
  let cart = cartArr.find(x => x.id === props.details.id);
  let  quantity;
  if (cart === undefined)
  {
    quantity = 0;
  }
  else{
    quantity = cart.quantity;
  }

  return (
    <div >
      <h3>Item Details</h3>
      <p>Name: {props.details.name}</p>
      <p>Description: {props.details.description}</p>
      <p>Quantity: {props.details.quantity}</p>
      
      <p>You have {quantity} of {props.details.quantity} of these items in your cart</p>
      <button onClick={() => props.onMerchAddToCart(props.details)}>Add 1 Merch to Cart</button>
      <hr />
    </div>
    
  )
}

MerchDetails.propTypes = {
  details:PropTypes.object,
  onMerchAddToCart: PropTypes.func,
}

export default MerchDetails;