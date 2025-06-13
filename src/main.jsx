import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';


import 'boxicons/css/boxicons.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({duration: 1000, once: true});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
