import React from 'react';
import './common/style.scss';
// import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
