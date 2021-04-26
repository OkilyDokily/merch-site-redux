import reducer from '../../reducers/merch-list-reducer';

describe('ticketListReducer', () => {
  let action;
  const currentState = {
    "merchList": {
      1: {
        name: 'Ryan & Aimen',
        description: '4b',
        quantity: 3,
        id: 1
      },
      2: {
        name: 'Jasmine and Justine',
        description: 'fine goods',
        quantity: 5,
        id: 2
      }
    },
    "cartList":{} 
  };

  const merchData = {
    name: 'Ryan & Aimen',
    description: '4b',
    quantity: 5,
    id: 1
  };

  const merchData2 = {
    name: 'Bongo',
    description: '4b',
    quantity: 6,
    id: 2
  };

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(reducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add new merch to merchList', () => {
    const { name, description, quantity, id } = merchData;
    action = {
      type: 'ADD_MERCH',
      name: name,
      description: description,
      quantity: quantity,
      id: id
    };

    expect(reducer(undefined, action)).toEqual({
      "merchList": {
        [id]: {
          name: name,
          description: description,
          quantity: quantity,
          id: id
        }
      },
      "cartList": {}
    });
  });

  test('Should successfully add two items to merchList', () => {
    const { name, description, quantity, id } = merchData;
    action = {
      type: 'ADD_MERCH',
      name: name,
      description: description,
      quantity: quantity,
      id: id
    };
    const { name:name2, description:description2, quantity:quantity2, id:id2 } = merchData2;
    const action2 = {
      type:"ADD_MERCH",
      name: name2,
      description: description2,
      quantity: quantity2,
      id: id2
    };

    let result = reducer(undefined, action)
    let result2 = reducer(result,action2)
    expect(result2).toEqual({
      "merchList": {
        [id]: {
          name: name,
          description: description,
          quantity: quantity,
          id: id
        },
        [id2]: {
          name: name2,
          description: description2,
          quantity: quantity2,
          id: id2
        }
      },
      "cartList": {}
    });
  });

  test('Should successfully delete a merch item', () => {
    action = {
      type: 'DELETE_MERCH',
      id: 1
    };
    expect(reducer(currentState, action)).toEqual({
      "merchList": {
        2: {
          name: 'Jasmine and Justine',
          description: 'fine goods',
          quantity: 5,
          id: 2
        }
      },
      "cartList": {}
    });
  });

  test('Should successfully add a merch item to the cart', () => {
    action = {
      type: 'ADD_CART',
      id: 2
    };
   
    const result = reducer(currentState, action)
 
    expect(result).toEqual({
      "merchList": {
       
        2: {
          name: 'Jasmine and Justine',
          description: 'fine goods',
          quantity: 5,
          id: 2
        }
      },
      "cartList": {
        2: {
          name: 'Jasmine and Justine',
          description: 'fine goods',
          quantity: 5,
          id: 2,
          purchaseQuantity: 1
        }
        }
    });
  });

  test('Should successfully add a merch item twice to the cart', () => {
    action = {
      type: 'ADD_CART',
      id: 2
    };

    const result = reducer(currentState, action)

    expect(result).toEqual({
      "merchList": {

        2: {
          name: 'Jasmine and Justine',
          description: 'fine goods',
          quantity: 5,
          id: 2
        }
      },
      "cartList": {
        2: {
          name: 'Jasmine and Justine',
          description: 'fine goods',
          quantity: 5,
          id: 2,
          purchaseQuantity: 2
        }
      }
    });
  });

  test('Should successfully remove items from the cart', () => {
    action = {
      type: 'DELETE_CART',
      id: 2
    };
  

    const result = reducer(currentState, action)

    expect(result).toEqual({
      "merchList": {
        2: {
          name: 'Jasmine and Justine',
          description: 'fine goods',
          quantity: 5,
          id: 2
        }
      },
      "cartList": {
      }
    });
  });

  test('Should remove availability of items from store on purchase', () => {
    action = {
      type: 'PURCHASE'
    };

    const state =
    {
      "merchList": {

        2: {
          name: 'Jasmine and Justine',
          description: 'fine goods',
          quantity: 5,
          id: 2
        }
      },
      "cartList": {
        2: {
          name: 'Jasmine and Justine',
          description: 'fine goods',
          quantity: 5,
          id: 2,
          purchaseQuantity: 1
        }
      }
    }

    const result = reducer(state, action)

    expect(result).toEqual({
      "merchList": {

        2: {
          name: 'Jasmine and Justine',
          description: 'fine goods',
          quantity: 4,
          id: 2
        }
      },
      "cartList": {
        2: {
          name: 'Jasmine and Justine',
          description: 'fine goods',
          quantity: 5,
          id: 2,
          purchaseQuantity: 1
        }
      }
    });
  });
});
