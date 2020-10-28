import React from 'react';

class ItemStatusFilter extends React.Component{
    render() {
      let {toggleFilter}=this.props;
      return(   
            <div className='btn-group'>
            <button type='button' className='btn btn-info item-filters' onClick={toggleFilter}>All</button>
            <button type='button' className='btn btn-outline-secondary item-filters' onClick={toggleFilter}>Active</button>
            <button type='button' className='btn btn-outline-secondary item-filters' onClick={toggleFilter}>Done</button>
        </div>
      )
    }
}

export default ItemStatusFilter