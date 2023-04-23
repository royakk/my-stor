import '@/styles/globals.css'
import { store } from '../src/store/store';
import { Provider } from 'react-redux';
import Layout from '@/components/layout';
import { useRouter } from 'next/router'
export default function App({ Component, pageProps }) {
  const router= useRouter();
  const showHeader = router.pathname === '/' ? false : true;
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return <Layout>{page}</Layout>;
    };
  return <Provider store={store}>
    {showHeader && <Layout/>}
    { (<Component {...pageProps} />)}
  
  </Provider> 
}
