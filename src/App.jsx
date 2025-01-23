
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./pages/signUp/SignUp.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Homepage from "./pages/homePage/Homepage.jsx";
import Content from "./pages/content/Content.jsx";
import Profile from "./pages/profile/Profile.jsx";

function App() {


  return (
    <>

        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/content" element={<Content/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
        <SignUp/>
    </>
  )
}

export default App
