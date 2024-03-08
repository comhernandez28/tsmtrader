import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { NextUIProvider } from '@nextui-org/react';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import Profile from './pages/Profile/Profile';

function App() {
	return (
		<>
			<NextUIProvider>
				<div className='dark text-foreground bg-background'></div>
				<Router>
					<Header></Header>
					<div className='dark main-content'>
						<Routes>
							<Route path='/' element={<Dashboard />}></Route>
							<Route path='/login' element={<Login />}></Route>
							<Route path='/register' element={<Register />}></Route>
							<Route path='/profile' element={<Profile />}></Route>
						</Routes>
					</div>
				</Router>

				<ToastContainer></ToastContainer>
			</NextUIProvider>
		</>
	);
}

export default App;
