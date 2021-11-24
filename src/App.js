import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { categories } from "./constants";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

const App = () => {

  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="app-body">
          <Routes>
            <Route exact path="/" element={<News key="general" category="general" />} />
            {
              categories.map((category) => <Route key={category} exact path={category === "general" ? "/" : "/" + category} element={<News key={category} category={category} />} />)
            }
          </Routes>

        </div>

      </Router>
    </div>
  );
}

export default App;
