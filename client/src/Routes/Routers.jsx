import React from 'react';
import { Route, Routes as ReactRoutes, Navigate } from 'react-router-dom'; // Rename imported Routes

import Home from '../pages/Home';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResult from '../pages/SearchResult';
import Thankyou from '../pages/Thankyou';
import TourInfo from '../pages/TourInfo';

const Routers = () => {
  return (
    <ReactRoutes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tours/search" element={<SearchResult />} />
        <Route path="/thank-you" element={<Thankyou />} />
    </ReactRoutes> 
  );
};

export default Routers;
