import { useState, useEffect } from "react";

const Row = ({ id, name, email, role, onDelete, updateRow, selectRows, selectAll }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(selectAll);
  const [newData, setNewData] = useState({id,name, email, role});
  const selectedClass = isChecked ? 'selected' : ''

  useEffect(() => {
    selectRows(id, selectAll, selectAll)
  }, [selectAll])
  
  function handleChange(type, value){
    setNewData(prev => {
      return {
        ...prev,
        [type] : value
      }
    })
  }
  
  function handleUpdate(){
    updateRow(newData);
    setIsEditing(false)
  }
  
  function handeCancel(){
    setIsEditing(false);
    setNewData({id, name, email, role})
  }

  function handleCheck(e){
    setIsChecked(e.target.checked);
    selectRows(id, e.target.checked);
  }
  
  if (isEditing) {
    return (
      <div className="row row--edit">
        <input value={newData.name} className="row__item" onChange={(e) => handleChange('name', e.target.value)}/>
        <input value={newData.email} className="row__item" onChange={(e) => handleChange('email', e.target.value)}/>
        <input value={newData.role} className="row__item" onChange={(e) => handleChange('role', e.target.value)}/>
        <button className="row__confirm" onClick={handleUpdate}>Confirm</button>
        <button onClick={handeCancel}>Cancel</button>
      </div>
    );
  }

  return (
    <div className={`row ${selectedClass}`}>
      <input type="checkbox" className="row__checkbox" checked={isChecked} onChange={handleCheck}/>
      <div className="row__item">{name}</div>
      <div className="row__item">{email}</div>
      <div className="row__item">{role}</div>
      <div>
        <button className="row__edit" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="row__delete" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default Row;
