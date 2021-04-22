let reducer = (state = { "merchList": {},"cartList":{} }, action) => {
  const { name, description, quantity, id, purchaseQuantity } = action;
  const merchList = { ...state.merchList };
  const cartList = { ...state.cartList };
  switch (action.type) {
    case 'ADD_MERCH':
      
      merchList[id] = {
        name: name,
        description: description,
        quantity: quantity,
        id: id
      };
      state["merchList"] = merchList;
      return Object.assign({},state);
    case 'DELETE_MERCH':
      delete merchList[id];
      state["merchList"] = merchList;
      return Object.assign({},state);
    case "ADD_CART":
      const cartItem = merchList[id];
      cartList[id] = {...cartItem};
      cartList[id].purchaseQuantity = purchaseQuantity;
      state.cartList = cartList;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default reducer;