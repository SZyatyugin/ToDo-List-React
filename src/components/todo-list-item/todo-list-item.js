import React from 'react';
import './todo-list-item.css'

class TodoListItem extends React.Component{
    
    render(){
        let {label,onToggleDone,onToggleImportant,important,done,onDeleted}=this.props;
        let classNames='todo-list-item'
            if(done){
                classNames+=' done';
        }
        if(important){
            classNames+=' important';
        }
        return (
            <span className={classNames}>
                <span
                className='todo-list-item-label'
                onClick={onToggleDone}>{label}</span>
                <button type='button' className='btn btn-outline-success btn-sm' onClick={onToggleImportant}><i className='fa fa-exclamation'></i></button>
                <button type='button' className='btn btn-outline-success btn-sm' onClick={onDeleted}><i className='fa fa-trash-o'></i></button>
                </span>
               
        )  
    }
}

export default TodoListItem