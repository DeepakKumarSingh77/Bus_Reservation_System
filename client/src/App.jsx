import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Buslist from './components/Buslist';
import "./App.css";
import Navbar from './components/Navbar';
import PassengerDetails from './components/PassengerDetails';
import PassengerList from './components/PassengerList';

const App = () => {
    return (
        <div style={{width:"100vw",height:"auto"}}>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Buslist />} />
                <Route path="/passenger-details" element={<PassengerDetails/>} />
                <Route path="/passengers" element={<PassengerList/>} />
            </Routes>
        </BrowserRouter>
        </div>
    );
};

export default App;
