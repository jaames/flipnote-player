import '../assets/styles/main.scss';

import Header from './Header';
import Footer from './Footer';

export default (props) => (
  <div className="app">
    <Header/>
    <div className="wrap wrap--wide">
      { props.children }
    </div>
    <Footer/>
  </div>
)