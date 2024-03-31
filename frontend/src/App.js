import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.js'
import NavBar from './components/Navbar'
import PageNotFound from './pages/404.js'
import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import './css/signInUp.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/home" 
              element={<Home />} 
            />
            <Route
              path="/sign-up" 
              element={<SignUp/>}
            />
            <Route
              path="/sign-in" 
              element={<SignIn/>}
            />
            <Route 
              path="*"
              element={<PageNotFound/>
            }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
