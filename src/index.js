import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import theme from 'utils/extendTheme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/online-chat">
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
