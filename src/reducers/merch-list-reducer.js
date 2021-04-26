export const store = { "merchList": {}, "cartList": {} }

let reducer = (state = store, action) => {
  const { name, description, quantity, id } = action;
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
      return Object.assign({}, state);
    case 'DELETE_MERCH':
      delete merchList[id];
      state["merchList"] = merchList;
      return Object.assign({}, state);
    case "ADD_CART":
      if (merchList[id].quantity === 0) {
        return Object.assign({}, state);
      }
      if (cartList[id] !== undefined) {
        if (cartList[id].quantity !== cartList[id].purchaseQuantity) {
          cartList[id].purchaseQuantity++;
          state.cartList = cartList;
          return Object.assign({}, state);
        }
      }
      else {
        const cartItem = merchList[id];
        cartList[id] = { ...cartItem };
        cartList[id].purchaseQuantity = 1;
        state.cartList = cartList;
        return Object.assign({}, state);
      }
      return Object.assign({}, state);

    case "DELETE_CART":
      delete cartList[id]
      state["cartList"] = cartList;
      return Object.assign({}, state);
    case "PURCHASE":
      Object.keys(cartList).forEach(key => {
        merchList[key].quantity = merchList[key].quantity - cartList[key].purchaseQuantity;
      });
      state.merchList = merchList;
      state.cartList = cartList;
      return Object.assign({}, state);
    default:
      return Object.assign({}, state);
  }
};

export default reducer;