import React from 'react';

class ItemStatusFilter extends React.Component{
  constructor(){
    super()
    this.state={
      filter:''
    }
  }  
  getCheckedFilter=(e)=>{
    Object.values(document.querySelectorAll(".item-filters")).map((elem) => {
      elem.classList.add("btn-outline-secondary");
      elem.classList.remove("btn-info");
    });
    e.target.classList.add("btn-info");
    e.target.classList.remove("btn-outline-secondary");
    let {toggleFilter}=this.props;
    let filterValue=e.target.innerHTML;
    this.setState(({filter})=>{
      return {filter:filterValue}
    })
    toggleFilter(filterValue)
  }
  render() {
      
      
      
      return(   
            <div className='btn-group'>
            <button type='button' className='btn btn-info item-filters' onClick={this.getCheckedFilter}>All</button>
            <button type='button' className='btn btn-outline-secondary item-filters' onClick={this.getCheckedFilter}>Active</button>
            <button type='button' className='btn btn-outline-secondary item-filters' onClick={this.getCheckedFilter}>Done</button>
        </div>
      )
    }
}

export default ItemStatusFilter