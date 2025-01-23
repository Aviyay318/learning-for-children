
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
import Content from "./pages/Content.jsx";
import Profile from "./pages/Profile.jsx";

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
