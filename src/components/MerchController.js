import React from 'react';
import MerchList from './MerchList';
import AddMerchForm from './AddMerchForm'
import MerchDetails from './MerchDetails';
import EditMerch from './EditMerch';
import Cart from './Cart';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MerchController extends React.Component {
  constructor() {
    super();
    this.state = {
      currentComponent: "MerchList",
      details: null,
      purchased: false
    }
  }

  handleChangeComponent = (component) => {
    this.setState({ currentComponent: component });
  };

  handleMerchAddToCart = (item) => {

    const cartArr = this.state.cartList;

    let cartItem = cartArr.find(x => x.id === item.id);

    if (item.quantity !== 0 && cartItem && (cartItem.quantity < item.quantity)) {

      cartItem.quantity = cartItem.quantity + 1;
      this.props.onIncreaseItemsInCart();
      this.setState({ cartList: cartArr });
    }
    else if (item.quantity !== 0 && !cartItem) {
      this.props.onIncreaseItemsInCart();
      cartArr.push({ id: item.id, quantity: 1 })
      this.setState({ cartList: cartArr });
    }
  }

  handleRemoveAllItemOfTypeFromCart = (id) => {
    const arr = this.state.cartList
    const splitPoint = arr.findIndex(x => x.id === id);
    const quantity = arr[splitPoint].quantity;
    this.props.onDecreaseItemsInCart(quantity);
    arr.splice(splitPoint, 1);
    this.setState({ cartList: arr });
  }

  handleAddMerch = (item) => {
    const {dispatch} = this.props;
    const {id, name, description,quantity } = item;
    dispatch({type:"ADD_MERCH", id:id,name:name,description:description,quantity:quantity});
    this.setState({ currentComponent: "MerchList" });
  }

  handleEditMerch = (item) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity } = item;
    dispatch({ type: "ADD_MERCH", id: id, name: name, description: description, quantity: quantity });
    this.setState({ currentComponent: "MerchList" });
  }

  handleDeleteMerch = (item) => {
    console.log("item", item);
    const { dispatch } = this.props;
    
    const { id } = item;
    dispatch({ type: "DELETE_MERCH", id: id });
    this.setState({ currentComponent: "MerchList" });
  }

  handleShowDetails = (item) => {
    this.setState({ currentComponent: "MerchDetails", details: item });
  }

  handlePurchase = () => {

    let cart = this.state.cartList;
    let items = this.props.merchList;
    for (let i = 0; i < cart.length; i++) {
      let cartQuantity = cart[0].quantity;
      let cartId = cart[0].id;
      let itemsIndex = items.findIndex(x => x.id === cartId);
      items[itemsIndex].quantity -= cartQuantity;
    }
    this.setState({ merchList: items, purchased: true });
  }


  render() {
    switch (this.state.currentComponent) {
      case "MerchList":
        return (
          <div>
            <MerchList merchList={this.props["merchList"]} onMerchBuy={this.handleMerchBuy} onShowDetails={this.handleShowDetails} />
            <button onClick={this.handleChangeComponent.bind(null, "AddMerchForm")}>Add a new item</button>
            <button onClick={this.handleChangeComponent.bind(null, "Cart")}>See the Cart</button>
          </div>
        );
      case "AddMerchForm":
        return (
          <div>
            <AddMerchForm onAddMerch={this.handleAddMerch} />
            <hr />
            <button onClick={this.handleChangeComponent.bind(null, "MerchList")}>Return to Inventory</button>
          </div>
        );
      case "MerchDetails":
        return (
          <div>
            <MerchDetails details={this.state.details} cartList={this.state.cartList} onMerchAddToCart={this.handleMerchAddToCart} />
            <button className="small" onClick={this.handleChangeComponent.bind(null, "EditMerch")}>Edit this item</button>
            <button className="small" onClick={() => this.handleDeleteMerch(this.state.details)}>Delete this item</button>
            <hr />
            <button onClick={this.handleChangeComponent.bind(null, "MerchList")}>Return to Inventory</button>
            <button onClick={this.handleChangeComponent.bind(null, "Cart")}>See Cart</button>
          </div>
        );
      case "EditMerch":
        return (
          <div>
            <EditMerch details={this.state.details} onEditMerch={this.handleEditMerch} />
            <hr />
            <button onClick={this.handleChangeComponent.bind(null, "MerchList")}>Return to Inventory</button>
          </div>
        );
      case "Cart":
        return (
          <div>
            <Cart isPurchased={this.state.purchased} onPurchase={this.handlePurchase} onRemoveAllItemsOfTypeFromCart={this.handleRemoveAllItemOfTypeFromCart} cart={this.props.cartList} />
            <hr />
            <button onClick={this.handleChangeComponent.bind(null, "MerchList")}>Return to Inventory</button>
          </div>
        )
      default:
      // code block
    }
  };
}

MerchController.propTypes = {
  onIncreaseItemsInCart: PropTypes.func,
  onDecreaseItemsInCart: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    "merchList": state["merchList"],
    "cartList":state["cartList"]
  }
}
MerchController = connect(mapStateToProps)(MerchController);

export default MerchController;
