import React from 'react';
import ItemStatusFilter from '../item-status-filter';
import './app-search-input.css'

class AppSearchPanel extends React.Component{
 constructor(){
   super();
  this.state={
     searchInput:''
   }
 }
 getValueOnChange=(e)=>{
let value=e.target.value;
this.setState(({searchInput})=>{
 return  {searchInput:value}
})
this.props.onchangeFindTask(value)
 }
 
  render(){

    let{onchangeFindTask,toggleFilter}=this.props;
  return (
    <form className='search-input__wrapper'>
<input className='search-input' type='text' placeholder='Search' value={this.state.searchInput} onChange={this.getValueOnChange}/>
<ItemStatusFilter toggleFilter={toggleFilter}/>
    </form>
    )
 } 
} 
export default AppSearchPanel  