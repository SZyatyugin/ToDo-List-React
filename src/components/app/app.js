import React from "react";
import AppHeader from "../app-header";
import AppSearchPanel from "../app-search-input";
import ToDoList from "../todo-list";
import AddFormElem from '../addFormElem'
import './index.css';

class App extends React.Component{
  constructor(){
    super();
   
    this.state={
      toDoData:[],
      restoreData:[]
    }
  }
  /**delete an element from an array toDoData */
  deleteItem=(id)=>{
    this.setState(({toDoData,restoreData})=>{
let elemsToShow=toDoData.filter(elem=>elem.id!==id);
this.restoreData=[...elemsToShow];
return{
  toDoData:elemsToShow,
  restoreData:elemsToShow
}
    });
  };
  /**add new task to the an array toDoData */
  addElemToList=(value)=>{
      this.setState(({toDoData,restoreData})=>{
      let arrayofId=toDoData.map(elem=>elem.id);
      let id=0;
      arrayofId.map((elem)=>{if(elem>id)id=elem});
      let newToDoList=[...toDoData];
      newToDoList.push({label:value,id:id+1,important:false,done:false});
      
      return{
        toDoData:newToDoList,
        restoreData:newToDoList
      }
      })
  }
  /**change elem style if important */
  onToggleImportant=(id)=>{
    this.setState(({toDoData})=>{
      let elemsToMakeImportant=toDoData.map((elem)=>{
        if(elem.id===id){
          if(!elem.important){
            elem.important=true
          }else{
            elem.important=false
          }
        }
        return elem
      });
      return {
        toDoData:elemsToMakeImportant
      }
    })
  }
  /**change elem style if done */
  onToggleDone=(id)=>{
    this.setState(({toDoData,restoreData})=>{
      let elemsToMakeDone=toDoData.map((elem)=>{
        if(elem.id===id){
          if(!elem.done){
            elem.done=true
          }else{
            elem.done=false
        }
        }
        return elem
      });
      return {
        toDoData:elemsToMakeDone,
      }
    }) 
  }
/**find a task in an array toDoData */
findTask=(e)=>{
  
  this.setState(({toDoData,restoreData})=>{
    let filterElem=Object.values(document.querySelectorAll('.item-filters')).
    if(e.target.value===''){
      e.preventDefault();
      return{toDoData:restoreData}
    }
    let foundTask=restoreData.filter((elem)=>{if(elem.label.toLowerCase()===e.target.value.toLowerCase()){return elem}});
    if(foundTask.length!==0){
      return{
        toDoData:foundTask
      }
    }else{
      return {toDoData:[]}
    }
  })
}
/**change filters */
getAll=(e)=>{
  Object.values(document.querySelectorAll('.item-filters')).map((elem)=>{
    elem.classList.add('btn-outline-secondary')
    elem.classList.remove('btn-info')
  })
  e.target.classList.add('btn-info')
  e.target.classList.remove('btn-outline-secondary')
  this.setState(({toDoData,restoreData})=>{
    if(document.querySelector('.search-input').value!==''){
      let foundTask=restoreData.filter((elem)=>{if(elem.label.toLowerCase()===document.querySelector('.search-input').value.toLowerCase()&& !elem.done){return elem}});
     
      if(foundTask.length!==0){
        return{
          toDoData:foundTask
        }
      }else{
        return {toDoData:[]}
      }
    }else{
      return {toDoData:restoreData}
    }
 
  })
  
  }
  getActive=(e)=>{
    
    Object.values(document.querySelectorAll('.item-filters')).map((elem)=>{
      elem.classList.add('btn-outline-secondary')
      elem.classList.remove('btn-info')
    })
    e.target.classList.add('btn-info')
    e.target.classList.remove('btn-outline-secondary')
    this.setState(({toDoData,restoreData})=>{
      if(document.querySelector('.search-input').value!==''){
        let foundTask=restoreData.filter((elem)=>{if(elem.label.toLowerCase()===document.querySelector('.search-input').value.toLowerCase() && !elem.done){return elem}});
        if(foundTask.length!==0){
          return{
            toDoData:foundTask
          }
        }else{
          return {toDoData:[]}
        }
      }else{
        let activeTasks=restoreData.filter(elem=>elem.done===false);
        return{
          toDoData:activeTasks
        }
      }
      
    })
  }
  getDone=(e)=>{
    Object.values(document.querySelectorAll('.item-filters')).map((elem)=>{
      elem.classList.add('btn-outline-secondary')
      elem.classList.remove('btn-info')
    })
    e.target.classList.add('btn-info')
    e.target.classList.remove('btn-outline-secondary')
    this.setState(({toDoData,restoreData})=>{
      console.log(restoreData)
      let doneTasks=restoreData.filter(elem=>elem.done);
      console.log(document.querySelector('.search-input').value===' ')
      if(document.querySelector('.search-input').value!==''){
        let foundTask=doneTasks.filter((elem)=>{if(elem.label.toLowerCase()===document.querySelector('.search-input').value.toLowerCase()){return elem}});
       console.log(restoreData);
       console.log(foundTask)
        if(foundTask.length!==0){
          console.log('match')
          return{
            toDoData:foundTask
          }
        }else{
          console.log('dont match')
          return {toDoData:foundTask}
        }
      }else{
        console.log('input not empty')
        return{
          toDoData:doneTasks
        }
      }
    })
    
  }


  render(){
    
    let tasksToDo=this.state.restoreData.filter((elem)=>elem.done===false);
    let doneTasks=this.state.restoreData.filter((elem)=>elem.done===true);
return (
      <div className='app-wrapper'>
      <AppHeader toDo={tasksToDo.length} done={doneTasks.length} />
      <AppSearchPanel findTask={this.findTask} getAll={this.getAll} getActive={this.getActive} getDone={this.getDone}/>
      <AddFormElem addElem={this.addElemToList}/>
      <ToDoList 
      todos={this.state.toDoData} 
      onDeleted={this.deleteItem} 
      onToggleImportant={this.onToggleImportant}
      onToggleDone={this.onToggleDone}/>
    </div>)
  }

}

export default App;
