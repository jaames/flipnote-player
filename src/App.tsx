import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { View } from './pages/View';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/view/:id?' element={<View />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
