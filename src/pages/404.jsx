import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import '@/styles/pages/404.scss';

export default (props) => (
  <Layout page="404">
    <h2>Error 404</h2>
    <h4>Page not found</h4>
    <Link to="/">Return to home page</Link>
  </Layout>
);