import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import AppProvider from "./store/AppProvider";
import AppRoutes from './routes';

function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Nav />
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
