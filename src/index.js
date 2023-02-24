import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from 'utils/extendTheme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import './index.css';
console.log(theme);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/online-chat">
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
