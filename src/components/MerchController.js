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

  handleMerchAddToCart = (id) => {
    const { dispatch } = this.props;
    dispatch({type:"ADD_CART",id:id});
  }

  handleRemoveCart = (id) => {
    console.log("bglpafdsafs");
    const { dispatch } = this.props;
    dispatch({ type: "DELETE_CART", id: id });
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
    const { dispatch } = this.props;
    
    const { id } = item;
    dispatch({ type: "DELETE_MERCH", id: id });
    this.setState({ currentComponent: "MerchList" });
  }

  handleShowDetails = (item) => {
    this.setState({ currentComponent: "MerchDetails", details: item });
  }

  handlePurchase = () => {
    const { dispatch } = this.props;
    dispatch({type:"PURCHASE"});
    this.setState({ purchased: true });
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
            <MerchDetails details={this.state.details} purchaseQuantity={this.props.cartList?.[this.state.details.id]?.purchaseQuantity} cartList={this.props.cartList} onMerchAddToCart={this.handleMerchAddToCart} />
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
            <Cart returnToInventory={this.handleChangeComponent.bind(null, "MerchList")} isPurchased={this.state.purchased} onPurchase={this.handlePurchase} onRemoveCart={this.handleRemoveCart} cart={this.props.cartList} />
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
