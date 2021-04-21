
import PropTypes from 'prop-types';

function CartItem(props) {
  const CartItemStyle = {
    display:"flex",
    justifyContent:"space-between",
    border:"1px solid",
    borderColor:"#4a71d4",
    padding:"6px",
    marginBottom:"5px",
    flexGrow: "1px"
  }
  return (

    <div style={CartItemStyle}>
      <p>Item name: {props.potentialPurchase.name}</p>
      <p>Quantity to purchase: {props.potentialPurchase.cartQuantity}</p>
      {!props.isPurchased ? <button className="small" onClick={() => props.removeItems(props.potentialPurchase.id)}>Remove these items from cart</button> : null}
    </div>
  )
}

CartItem.propTypes = {
 
  potentialPurchase: PropTypes.object,
  removeItems: PropTypes.func,
 
}

export default CartItem;