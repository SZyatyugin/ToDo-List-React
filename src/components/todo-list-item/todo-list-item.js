import React from 'react';
import './todo-list-item.css'

class TodoListItem extends React.Component{
    
    constructor(){
        super();
        this.state={
            done:false,
            important:false
        }
    }
    onLabelClick=()=>{
        this.setState(({done})=>{
            return {done:!done}
            
        })

    }
    makeImportant=()=>{
        this.setState((state)=>{
            return {important:!state.important}
        })
    }

    render(){
        
        let {label}=this.props;
        let {done,important}=this.state;
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
                onClick={this.onLabelClick}>{label}</span>
                <button type='button' className='btn btn-outline-success btn-sm' onClick={this.makeImportant}><i className='fa fa-exclamation'></i></button>
                <button type='button' className='btn btn-outline-success btn-sm'><i className='fa fa-trash-o'></i></button>
                </span>
               
        )  
    }
}

export default TodoListItem