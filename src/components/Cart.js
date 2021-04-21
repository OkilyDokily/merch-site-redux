import CartItem from "./CartItem";
import PropTypes from 'prop-types'; 



function Cart(props) {

  const cartStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: "5px",
    minHeight: "70vh"
  }

  const purchaseButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    width: "70%",
    margin: "auto",
    marginBottom: "0",
    marginTop: "0",
    border: "solid #5882ed 3px"
  }

  const divInButton = {
    border: "1px solid gray",
    borderRadius: "5px"
  }

  return (
    <div style={cartStyle}>
      <h3>Your Online Cart</h3>
      {props.cart.map(x => <CartItem isPurchased={props.isPurchased} removeItems={props.onRemoveAllItemsOfTypeFromCart} key={x.id} potentialPurchase={x} />)}
      {(!props.isPurchased && props.cart.length > 0) ? <button style={purchaseButtonStyle} onClick={props.onPurchase}><p>Purchase</p></button> : null}
      {props.isPurchased ? <div style={divInButton}>Thanks for your purchase. You should see an itemized receipt in your email soon.</div> : null}
    </div>
  )
}

Cart.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  cart: PropTypes.arrayOf(PropTypes.object),
  isPurchased: PropTypes.bool,
  onRemoveAllItemsOfTypeFromCart: PropTypes.func,
  id: PropTypes.number,
}

export default Cart;