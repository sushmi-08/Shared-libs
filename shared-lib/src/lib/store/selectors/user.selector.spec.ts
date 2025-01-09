import { User } from '../../models/user.model';
import { UserState } from '../reducers/user.reducer';
import {
	selectUser,
	selectUserCartItems,
	selectUserCartQty,
	selectUserId,
	selectUserLastLogIn,
} from './user.selector';

describe('User Selectors', () => {
  const initialState: UserState = {
    user: {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      lastLogInAt: new Date('2023-12-01T10:00:00Z'),
      cartItems: [
        {
          id: 'prod-1', quantity: 2,
          itemName: ''
        },
        {
          id: 'prod-2', quantity: 1,
          itemName: ''
        },
      ],
      cartItemCount: 3,
      password: '',
      boughtItems: []
    },
    loading: false,
    error: null,
  };

  it('should select the user object', () => {
    const result = selectUser.projector(initialState);
    expect(result).toEqual(initialState.user);
  });

  it('should select the user id', () => {
    const result = selectUserId.projector(initialState);
    expect(result).toEqual('123');
  });

  it('should select the user last login time', () => {
    const result = selectUserLastLogIn.projector(initialState);
    expect(result).toEqual(new Date('2023-12-01T10:00:00Z'));
  });

  it('should select the user cart items', () => {
    const result = selectUserCartItems.projector(initialState);
    expect(result).toEqual([
      { id: 'prod-1', itemName: '', quantity: 2 },
      { id: 'prod-2', itemName: '', quantity: 1 },
    ]);
  });

  it('should select the total number of cart items', () => {
    const result = selectUserCartQty.projector(initialState);
    expect(result).toEqual(3);
  });

  it('should return undefined when user is null', () => {
    const stateWithNullUser: UserState = {
      user: null,
      loading: false,
      error: null,
    };

    expect(selectUserId.projector(stateWithNullUser)).toBeUndefined();
    expect(selectUserLastLogIn.projector(stateWithNullUser)).toBeUndefined();
    expect(selectUserCartItems.projector(stateWithNullUser)).toBeUndefined();
    expect(selectUserCartQty.projector(stateWithNullUser)).toBeUndefined();
  });
});
