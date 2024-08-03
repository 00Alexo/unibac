import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.js'
import NavBar from './components/Navbar'
import PageNotFound from './pages/404.js'
import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import './css/signInUp.css'
import './css/viewProfile.css'
import './css/alerts.css'
import './css/minaAi.css'
import './css/class.css'
import {useState, useEffect} from 'react'
import { useLogout } from './hooks/useLogout'
import { useAuthContext } from './hooks/useAuthContext'
import ViewProfile from './pages/ViewProfile.js';
import Search from './pages/Search.js';
import MinaAi from './pages/MinaAI.js';
import CreateClass from './pages/CreateClass.js';
import ViewClass from './pages/ViewClass.js';

function App() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  // useEffect(() =>{
  //   const fetchAuthCheck = async ()=>{
  //     const response = await fetch(`${process.env.REACT_APP_API}/api/user/verifyUserAuthData`, {
  //       headers: {
  //         'Authorization': `Bearer ${user.token}`,
  //         'username': `${user.username}`,
  //       },
  //     });
  //     const json = await response.json()

  //     if(response.ok){
  //       console.log("VALID: ", json);
  //     }
  //     if(!response.ok){
  //       console.log("INVALID: ", json);
  //       logout();
  //     }
  //   }

  //   if(user)
  //   fetchAuthCheck();
  // }, [user])
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

            {/* profile */}
            <Route
              path="/profile/:username"
              element={<ViewProfile/>}
            />
            <Route
              path="/profile/:username/:view"
              element={<ViewProfile/>}
            />

            {/* minaAI */}

            <Route
              path="/minaAI"
              element={<MinaAi/>}
            />
            <Route
              path="/minaAI/:convId"
              element={<MinaAi/>}
            />

            {/* search */}

            <Route
              path="/search/:search"
              element={<Search/>}
            />

            {/* clase */}

            <Route
              path="/clase/:classId"
              element={<ViewClass/>}
            />

            <Route 
              path="/createClass"
              element={<CreateClass/>}  
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
