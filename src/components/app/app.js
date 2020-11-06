import React from "react";
import AppHeader from "../app-header";
import AppSearchPanel from "../app-search-input";
import ToDoList from "../todo-list";
import AddFormElem from "../addFormElem";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      toDoData: [],
      searchInput:'',
      filter:''
    };
  }
  /**delete an element from an array toDoData */
  deleteItem = (id) => {
    
    this.setState(({toDoData}) => {
      let elemsToDelete = toDoData.findIndex((elem) => elem.id === id);
      let elemsToShow = [
        ...toDoData.slice(0,elemsToDelete),
        ...toDoData.slice(elemsToDelete+1,toDoData.length)
      ];
        return {
          toDoData: elemsToShow,
        };
      
    });
  };
  /**add new task to the an array toDoData */
  addElemToList = (value) => {
    this.setState(({toDoData}) => {
      let arrayofId = toDoData.map((elem) => elem.id);
      let id = 0;
      arrayofId.map((elem) => {
        if (elem > id) id = elem;
      });
      let newToDoList = [...toDoData];
      newToDoList.push({
        label: value,
        id: id + 1,
        important: false,
        done: false,
      });
      return {
        toDoData: newToDoList,
      };
    });
  };
  /**change elem style if important */
  onToggleImportant = (id) => {
    this.setState(({ toDoData }) => {
      let elemsToMakeImportant=[...toDoData];
      elemsToMakeImportant.map((elem) => {
        if (elem.id === id) {
          if (!elem.important) {
            elem.important = true;
          } else {
            elem.important = false;
          }
        }
        return elem;
      });
      return {
        toDoData: elemsToMakeImportant,
      };
    });
  };
  /**change elem style if done */
  onToggleDone = (id) => {
   this.setState(({toDoData}) => {
      let elemsToMakeDone=[...toDoData].map((elem) => {
        if (elem.id === id) {
          if (!elem.done) {
            elem.done = true;
          } else {
            elem.done = false;
          }
        }
        return elem;
      });
      return {
        toDoData: elemsToMakeDone,
     }
    });
  };
  /**find a task in an array toDoData */
  onchangeFindTask=(value)=>{
this.setState(({searchInput})=>{
  return {searchInput:value}
})
  }
  findTask=(items,pattern)=>{
    if(pattern===''){
      return items
    }
  return items.filter((elem)=>{
      if(elem.label.toLowerCase().indexOf(pattern.toLowerCase())>-1)
     return elem
    })
  }
  /**change filters */
  toggleFilter = (filterValue) => {
    
   this.setState(({filter})=>{
     return {filter:filterValue}
   }) 
  };
  filterItems=(items,filter)=>{
    if(filter===''){
      return items;
    }else
    if (filter === "All") {
      return items;
    } else if (filter === "Active") {
      return items.filter((elem) => elem.done === false);
    } else {
      return items.filter((elem) => elem.done);
    }
  }
  render() {
  let {toDoData,searchInput,filter}=this.state;
  
   let filteredElems=this.filterItems(this.findTask(toDoData,searchInput),filter);
    let tasksToDo = toDoData.filter(
      (elem) => !elem.done
    );
    let doneTasks = toDoData.filter((elem) => elem.done);
    return (
      <div className="app-wrapper">
        <AppHeader toDo={tasksToDo.length} done={doneTasks.length} />
        <AppSearchPanel
          onchangeFindTask={this.onchangeFindTask}
          toggleFilter={this.toggleFilter}
        />
        <AddFormElem addElem={this.addElemToList} />
        <ToDoList
          todos={filteredElems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
      </div>
    );
  }
}

export default App;
