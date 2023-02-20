import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/NavBar';
import Homepage from './pages/Home';
import Aboutpage from './pages/About';
import ArticlePage from './pages/ArticlePage';
import ArticlelistPage from './pages/ArticlesList';
import Notfoundpage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage'
import CreateAccountPage from './pages/CreateAccountPage'
function App() {
  return (
    <BrowserRouter>   
    <div className="App">
      <Navbar/>    
    <div id="page-body">
      <Routes>
        <Route path="/" element= {<Homepage />}/>
        <Route path="/about" element= {<Aboutpage />} />
        <Route path="/articles" element= {<ArticlelistPage />} />
        <Route path="/articles/:articleId" element= {<ArticlePage />}/>
        <Route path="/login" element= {<LoginPage />}/>
        <Route path="/signup" element= {<CreateAccountPage />}/>
        <Route path="*" element = {<Notfoundpage/>} />
      </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
