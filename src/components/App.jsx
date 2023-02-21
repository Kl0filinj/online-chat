import { useReducer } from 'react';
import { io } from 'socket.io-client';
import Chat from './Chat/Chat';
import JoinRoom from './JoinRoom/JoinRoom';
import { initialState, reducer } from './reducers/joinReducer';
import Layout from './Sheared/Layout';

const socket = io.connect('http://localhost:3000');

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Layout>
      {!state.showChat ? (
        <JoinRoom socket={socket} dispatch={dispatch} state={state} />
      ) : (
        <Chat socket={socket} state={state} />
      )}
    </Layout>
  );
};
