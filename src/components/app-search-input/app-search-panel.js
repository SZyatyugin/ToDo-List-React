import React from 'react';
import ItemStatusFilter from '../item-status-filter';
import './app-search-input.css'

let AppSearchPanel=()=>{

    return (
    <div className='search-input__wrapper'>
<input className='search-input' type='text' placeholder='Search'/>
<ItemStatusFilter/>
    </div>
    )
  }
export default AppSearchPanel  