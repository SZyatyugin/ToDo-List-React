import React from 'react';

class ItemStatusFilter extends React.Component{
    render() {
      let {getAll,getActive,getDone}=this.props;
      return(   
            <div className='btn-group'>
            <button type='button' className='btn btn-info item-filters' onClick={getAll}>All</button>
            <button type='button' className='btn btn-outline-secondary item-filters' onClick={getActive}>Active</button>
            <button type='button' className='btn btn-outline-secondary item-filters' onClick={getDone}>Done</button>
        </div>
      )
    }
}

export default ItemStatusFilter