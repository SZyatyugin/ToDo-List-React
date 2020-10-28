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
    this.setState(({ toDoData, restoreData }) => {
      let elemsToMakeDone = toDoData.map((elem) => {
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
      };
    });
  };
  /**find a task in an array toDoData */
  findTask = (e) => {
    let filterElem = Object.values(
      document.querySelectorAll(".item-filters")
    ).find((elem) => {
      if (elem.classList.contains("btn-info")) {
        return elem;
      }
    });
    this.setState(({ toDoData, restoreData }) => {
      if (e.target.value === "") {
        console.log('empty input')
        e.preventDefault();
        
      }
      let foundTask = this.state.restoreData.filter((elem) => {
        if (elem.label.toLowerCase() === e.target.value.toLowerCase()) {
          return elem;
        }
      });
      if (filterElem.innerHTML === "All") {
        console.log("filter in All");
        return {
          toDoData: foundTask,
        };
      } else if (filterElem.innerHTML === "Active") {
        console.log("filter in Active");
        if (document.querySelector(".search-input").value !== "") {
          let foundTask = restoreData.filter((elem) => {
            if (
              elem.label.toLowerCase() === e.target.value.toLowerCase() &&
              !elem.done
            ) {
              return elem;
            }
          });
          if (foundTask.length !== 0) {
            return {
              toDoData: foundTask,
            };
          } else {
            return { toDoData: [] };
          }
        }
      } else {
        console.log("filter in Done");
        let foundTask = restoreData.filter((elem) => {
          if (
            elem.label.toLowerCase() === e.target.value.toLowerCase() &&
            elem.done
          ) {
            return elem;
          }
        });
        if (foundTask.length !== 0) {
          return {
            toDoData: foundTask,
          };
        } else {
          return { toDoData: [] };
        }
      }
    });
  };
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
    let tasksToDo = this.state.restoreData.filter(
      (elem) => elem.done === false
    );
    let doneTasks = this.state.restoreData.filter((elem) => elem.done === true);
    return (
      <div className="app-wrapper">
        <AppHeader toDo={tasksToDo.length} done={doneTasks.length} />
        <AppSearchPanel
          findTask={this.findTask}
          toggleFilter={this.toggleFilter}
        />
        <AddFormElem addElem={this.addElemToList} />
        <ToDoList
          todos={this.state.toDoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
      </div>
    );
  }
}

export default App;
