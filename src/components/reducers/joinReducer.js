export const initialState = { roomId: '', userName: '', showChat: false };

export function reducer(state, action) {
  switch (action.type) {
    case 'roomIdChange':
      return { ...state, roomId: (state.roomId = action.payload) };
    case 'userNameChange':
      return { ...state, userName: (state.userName = action.payload) };
    case 'toggleShowChat':
      return { ...state, showChat: (state.showChat = action.payload) };
    default:
      throw new Error();
  }
}
