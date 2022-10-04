import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import {Contents} from "./components/Contents";
import { Navbar } from './components/Navbar';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
ReactDOM.render(
  <BrowserRouter>
<App/>
</BrowserRouter>,
document.getElementById("root"));
