import React from "react";
import AppHeader from "../app-header";
import AppSearchPanel from "../app-search-input";
import ToDoList from "../todo-list";
import './index.css'
let App = () => {

  let toDoData=[
    {label:'Drink Coffee',important:true,id:1},
    {label:'To do React App',important:true,id:2},
    {label:'To have a lunch',important:false,id:3},
    {label:'To have a dinner',important:false,id:4},
    {label:'To have a dinner3',important:true,id:5},
  ];

  return (
    <div className='app-wrapper'>
      <AppHeader />
      <AppSearchPanel />
      <ToDoList todos={toDoData} />
    </div>
  );
};



export default App;