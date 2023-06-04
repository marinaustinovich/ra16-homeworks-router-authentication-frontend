import { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import AuthProvider from './components/AuthProvider/AuthProvider';
import ToolbarFunctional from './components/ToolbarFunctional/ToolbarFunctional';
import News from './components/News/News';
import Logout from './components/Logout/Logout';
import Card from './components/Card/Card';
import Error404 from './components/Error/Error404';

function App() {
  return (
    <Router>
      <AuthProvider>
          <div className="App">
            <Routes>
              <Route path="/error404" element={<Error404 />} />
              <Route path="/news/:id" element={<Card />} />
              <Route path="/" element={<ToolbarFunctional />}>
                <Route path="/news" element={<Fragment><News /><Logout /></Fragment>} />
              </Route>
              
            </Routes>
          </div>
      </AuthProvider>  
    </Router>
    
  );
}

export default App;
