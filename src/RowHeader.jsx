import React from 'react';

const RowHeader = ({setSelectAll, selectAll}) => {
  return (
    <div className='row'>
      <input type='checkbox' className='row__checkbox' checked={selectAll} onChange={(e) => setSelectAll(e.target.checked)}/>
      <div className='row__item row__header'>Name</div>
      <div className='row__item row__header'>Email</div>
      <div className='row__item row__header'>Role</div>
      <div className='row__item row__header'>Actions</div>
    </div>
  );
};

export default RowHeader;