import { Container } from 'react-bootstrap';
import {Routes, Route} from 'react-router-dom';

import Header from "./components/Header.js"
import Footer from "./components/Footer.js"

import HomePage from './pages/HomePage.js';
import ProductPage from './pages/ProductPage.js';

function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route  path='/' element={<HomePage />} exact />
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
