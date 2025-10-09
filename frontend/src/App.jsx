import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './Home';
import DetailProduct from './products/DetailProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/details/:id" element={<DetailProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
