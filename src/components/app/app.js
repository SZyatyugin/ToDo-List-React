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
      restoreData: [],
      searchInput:''
    };
  }
  /**delete an element from an array toDoData */
  deleteItem = (id) => {
    let filterElem = Object.values(
      document.querySelectorAll(".item-filters")
    ).find((elem) => {
      if (elem.classList.contains("btn-info")) {
        return elem;
      }
    });
    this.setState(({ toDoData, restoreData }) => {
      if (filterElem.innerHTML === "Done") {
        let elemsToDelete = restoreData
          .filter((elem) => elem.done)
          .findIndex((elem) => elem.id === id);
        restoreData.splice(elemsToDelete, 1);
        let elemsToShow = restoreData.filter((elem) => elem.done);
        return {
          toDoData: elemsToShow,
        };
      } else if(filterElem.innerHTML === "Active") {
        let elemsToDelete = restoreData.findIndex((elem,index) => {if(elem.id === id)return elem});
        restoreData.splice(elemsToDelete, 1);
        let elemsToShow = restoreData.filter((elem) => !elem.done);
        return {
          toDoData: elemsToShow
        };
      }else{
        let elemsToDelete = restoreData.findIndex((elem) => elem.id === id);
        restoreData.splice(elemsToDelete, 1);
        let elemsToShow = restoreData;
        return {
          toDoData: elemsToShow,
        };
      }
    });
  };
  /**add new task to the an array toDoData */
  addElemToList = (value) => {
    this.setState(({ toDoData, restoreData }) => {
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
        restoreData: newToDoList,
      };
    });
  };
  /**change elem style if important */
  onToggleImportant = (id) => {
    this.setState(({ toDoData }) => {
      let elemsToMakeImportant = toDoData.map((elem) => {
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
    let filterElem = Object.values(
      document.querySelectorAll(".item-filters")
    ).find((elem) => {
      if (elem.classList.contains("btn-info")) {
        return elem;
      }
    });
    this.setState(({ toDoData, restoreData }) => {
      toDoData.map((elem) => {
        if (elem.id === id) {
          if (!elem.done) {
            elem.done = true;
          } else {
            elem.done = false;
          }
        }
        return elem;
      });
     if(filterElem.innerHTML=='Done'){
      let elemsToMakeDone=toDoData.filter(elem=>elem.done)
      return {
        toDoData: elemsToMakeDone,
      };
     }else if(filterElem.innerHTML=='Active'){
      let elemsToMakeDone=toDoData.filter(elem=>!elem.done)
      return {
        toDoData: elemsToMakeDone,
      };
     }else{
      let elemsToMakeDone=toDoData;
      return {
        toDoData: elemsToMakeDone,
     }
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
    if(pattern==''){
      return items
    }
  return items.filter((elem)=>{
      if(elem.label.indexOf(pattern)>-1)
     return elem
    })
  }
  /**change filters */
  toggleFilter = (e) => {
    Object.values(document.querySelectorAll(".item-filters")).map((elem) => {
      elem.classList.add("btn-outline-secondary");
      elem.classList.remove("btn-info");
    });
    e.target.classList.add("btn-info");
    e.target.classList.remove("btn-outline-secondary");
    this.setState(({ toDoData, restoreData }) => {
      if (e.target.innerHTML === "All") {
        return { toDoData: restoreData };
      } else if (e.target.innerHTML === "Active") {
        let activeTasks = restoreData.filter((elem) => elem.done === false);
        return {
          toDoData: activeTasks,
        };
      } else {
        let doneTasks = restoreData.filter((elem) => elem.done);
        return {
          toDoData: doneTasks,
        };
      }
    });
  };

  render() {
  
   let filteredElems=this.findTask(this.state.toDoData,this.state.searchInput)
    let tasksToDo = this.state.restoreData.filter(
      (elem) => elem.done === false
    );
    let doneTasks = this.state.restoreData.filter((elem) => elem.done === true);
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
