export const initialState = { roomId: '', userName: '' };

export function reducer(state, action) {
  switch (action.type) {
    case 'roomIdChange':
      return { roomId: (state.roomId = action.payload) };
    case 'userNameChange':
      return { userName: (state.userName = action.payload) };
    default:
      throw new Error();
  }
}
