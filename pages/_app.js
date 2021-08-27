import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../src/store';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
