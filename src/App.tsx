import React, { useEffect } from 'react'
import './App.css'
import Register from './pages/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
    // const [userData, setUserData] = useState();

    return (
        // <div className="App">
        //     <header className="App-header">

        //         <Register />
        //     </header>
        // </div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
