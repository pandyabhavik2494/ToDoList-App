import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainContent from './TodoList';
  
var destination = document.querySelector("#container")
  
ReactDOM.render(<MainContent/>,destination);