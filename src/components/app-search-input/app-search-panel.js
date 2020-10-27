import React from 'react';
import ItemStatusFilter from '../item-status-filter';
import './app-search-input.css'

class AppSearchPanel extends React.Component{
 
 
  render(){

    let{findTask,getAll,getActive,getDone}=this.props;
  return (
    <form className='search-input__wrapper'>
<input className='search-input' type='text' placeholder='Search' onChange={findTask}/>
<ItemStatusFilter getAll={getAll} getActive={getActive} getDone={getDone}/>
    </form>
    )
 } 
} 
export default AppSearchPanel  