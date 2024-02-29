import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';

function App() {
	return (
		<>
			<Router>
				<Header></Header>
				<Routes>
					<Route path='/' element={<Dashboard />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/register' element={<Register />}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
