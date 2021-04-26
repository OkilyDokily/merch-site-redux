import React from "react";
import PropTypes from 'prop-types';

function MerchDetails(props)
{

  const {name, description, quantity,id} = props.details;
  return (
    <div >
      <h3>Item Details</h3>
      <p>Name: {name}</p>
      <p>Description: {description}</p>
      <p>Quantity: {quantity}</p>
      <p>You have {props.purchaseQuantity ? props.purchaseQuantity: 0} of {quantity} of these items in your cart</p>
      <button onClick={() => props.onMerchAddToCart(id)}>Add 1 Merch to Cart</button>
      <hr />
    </div>
  )
}

MerchDetails.propTypes = {
  details:PropTypes.object,
  onMerchAddToCart: PropTypes.func,
}

export default MerchDetails;