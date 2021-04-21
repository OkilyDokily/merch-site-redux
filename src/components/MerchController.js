import React from 'react';
import MerchList from './MerchList';
import AddMerchForm from './AddMerchForm'
import MerchDetails from './MerchDetails';
import EditMerch from './EditMerch';
import Cart from './Cart';
import PropTypes from 'prop-types';

class MerchController extends React.Component {
  constructor() {
    super();
    this.state = {
      currentComponent: "MerchList",
      merchList: [],
      details: null,
      cartList: [],
      purchased:false
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
    this.setState({ cartList: arr});
  }

  handleAddMerch = (item) => {
    const arr = this.state.merchList;
    arr.push(item);
    this.setState({ merchList: arr, currentComponent: "MerchList" });
  }

  handleEditMerch = (item) => {
    const arr = this.state.merchList;
    const index = this.state.merchList.findIndex(x => x.id === item.id);
    arr[index] = item;
    this.setState({ merchList: arr, currentComponent: "MerchList" });
  }

  handleDeleteMerch = (item) => {
    const arr = this.state.merchList;
    const index = this.state.merchList.findIndex(x => x.id === item.id);
   
    const newArr = arr.splice(index, arr)
    this.setState({ merchList: newArr, currentComponent: "MerchList" });
  }

  handleShowDetails = (item) => {
    this.setState({ currentComponent: "MerchDetails", details: item });
  }

  handlePurchase = () => {
    
    let cart = this.state.cartList;
    let items = this.state.merchList;
    for (let i = 0; i < cart.length; i++) {
      let cartQuantity = cart[0].quantity;
      let cartId = cart[0].id;
      let itemsIndex = items.findIndex(x => x.id === cartId);
      items[itemsIndex].quantity -= cartQuantity;
    }
    this.setState({ merchList: items,purchased:true});
  }

  getCartItems = () => {
    let cart = this.state.cartList;
    let items = this.state.merchList;
    let result = items.filter(x => (cart.find(y => y.id === x.id) !== undefined)).map(x => {
      let result = cart.find(y => y.id === x.id);
      let obj = { ...x, cartQuantity: result.quantity };
      return obj;
    });
    return result;
  }


  render() {
    switch (this.state.currentComponent) {
      case "MerchList":
        return (
          <div>
            <MerchList merchList={this.state.merchList} onMerchBuy={this.handleMerchBuy} onShowDetails={this.handleShowDetails} />
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
            <button className="small" onClick={this.handleDeleteMerch.bind(this.state.details)}>Delete this item</button>
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
            <Cart isPurchased={this.state.purchased} onPurchase={this.handlePurchase} onRemoveAllItemsOfTypeFromCart={this.handleRemoveAllItemOfTypeFromCart} cart={this.getCartItems()} />
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

export default MerchController;
