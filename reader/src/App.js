import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Inspiration from './components/Inspiration/Inspiration';
import AboutUs from './components/AboutUs/AboutUs';
import Register from './components/Login/Register'; 
import Login from './components/Login/Login';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/aboutus" element={<AboutUs />} />
            {/* <Route path="*" element={<NoPage />} /> */}
            <Route path= "/register" element={<Register />} /> 
            <Route path= "/login" element={<Login />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
