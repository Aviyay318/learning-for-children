
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/register/Register.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Homepage from "./pages/homePage/Homepage.jsx";
import Content from "./pages/content/Content.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Login from "./pages/login/Login.jsx";
import {useState} from "react";


function App() {
const [isLogin, setIsLogin] = useState(false);
const setLogin = () => {
    setIsLogin(true)
}
  return (
      <div className={"App flex"}>
          <section className={"background"}></section>
          <BrowserRouter>
              {/*{isLogin && <Navbar/> }*/}
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Login setIsLogin={setLogin}/>}/>
                  <Route path="/homePage" element={<Homepage/>}/>
                  <Route path="/content" element={<Content/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/register" element={<Register/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App
