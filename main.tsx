import {createRoot} from 'react-dom/client';
import Home from './app/page';
import {AuthGate} from './app/auth';
import './app/globals.css';
createRoot(document.getElementById('root')!).render(<AuthGate><Home/></AuthGate>);
