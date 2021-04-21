import reducer from '../../reducers/merch-list-reducer';

describe('ticketListReducer', () => {
  let action;
  const currentState = {
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
  }

  const ticketData = {
    name: 'Ryan & Aimen',
    description: '4b',
    quantity: 5,
    id: 1
  };


  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(reducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add new ticket data to masterTicketList', () => {
    const { name, description, quantity, id } = ticketData;
    action = {
      type: 'ADD_MERCH',
      name: name,
      description: description,
      quantity: quantity,
      id: id
    };

    expect(reducer({}, action)).toEqual({
      [id]: {
        name: name,
        description: description,
        quantity: quantity,
        id: id
      }
    });
  });

  test('Should successfully delete a ticket', () => {
    action = {
      type: 'DELETE_MERCH',
      id: 1
    };
    expect(reducer(currentState, action)).toEqual({
      2: {
        name: 'Jasmine and Justine',
        description: 'fine goods',
        quantity: 5,
        id: 2
      }
    });
  });

});
