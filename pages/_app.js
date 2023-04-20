import '@/styles/globals.css'
import { store } from '../src/store/store';
import { Provider } from 'react-redux';
import Layout from '@/components/layout';
export default function App({ Component, pageProps }) {
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return <Layout>{page}</Layout>;
    };
  return <Provider store={store}>
    
    {renderWithLayout(<Component {...pageProps} />)}
  
  </Provider> 
}
