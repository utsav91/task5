import React from 'react';

const Search = ({onChange}) => {
  return (
    <div className='search'>
      <input className='search__input' onChange={(e) => onChange(e.target.value)} placeholder='Search by name, email or role'/>
    </div>
  );
};

export default Search;