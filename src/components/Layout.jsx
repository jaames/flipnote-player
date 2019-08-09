import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorModal from '@/components/ErrorModal';
import '@/styles/main.scss';

export default ({ page, children }) => (
  <div className="View">
    <Header/>
    <main className={`Page Page--${ page }`}>
      { children }
    </main>
    <Footer/>
    <ErrorModal/>
  </div>
);