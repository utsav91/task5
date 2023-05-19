import { useState, useEffect } from "react";
import List from "./List.jsx";
import Row from "./Row.jsx";
import Search from "./Search.jsx";
import Pagination from './Pagination.jsx';
import RowHeader from "./RowHeader.jsx";
import { filter } from "./util.js";
import { URL, ROWS } from './constants.js'
import "./App.css";

function App() {
  const [rows, setRows] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [selected, setSelected] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  let filteredRows = filter(inputVal, rows)
  useEffect(() => {
    fetch(
      URL
    ).then((res) => {
      res.json().then((res) => setRows(res));
    });
  }, []);

  function onDelete(id, isMultiDelete = false) {
    if(isMultiDelete){
      const remainingRows = rows.filter(row => !selected.includes(row.id))
      setRows(remainingRows);
      setSelectAll(false);
      setSelected([])
      return; 
    }
    const remainingRows = rows.filter((row) => row.id != id);
    setRows(remainingRows);
  }

  function handleDelete(){
    onDelete(null, true);
    setIndex(i => i+1);
  }

  function updateRow(data) {
    const { id, name, email, role } = data;

    const updatedRows = rows.map((row) => {
      if (row.id == id) {
        return { ...row, name, email, role };
      }
      return row;
    });
    setRows(updatedRows);
  }

  function selectRows(id, shouldAdd, selectAll){
    if(selectAll){
      const ids = [];
      let num = index == 0 ? index : index*ROWS;
      for(let i=num + 1; i<num+11; i++){
        ids.push(i.toString())
      }
      return setSelected(ids)
    }
    if(selectAll == false){
      return setSelected([]);
    }
    if(shouldAdd){
      setSelected(prev => {
        return [...prev, id]
      })
    }else{
      const newSelection = selected.filter(r => r != id);
      setSelected(newSelection)
    }
  }

  return (
    <>
      <Search onChange={setInputVal} />
      <RowHeader setSelectAll={setSelectAll} selectAll={selectAll}/>
      <List className="list" key={selectAll}>
        {filteredRows.slice(index, index + ROWS).map((row) => {
          const { name, email, role, id } = row;
          return (
            <Row
              name={name}
              email={email}
              role={role}
              key={id}
              id={id}
              onDelete={onDelete}
              updateRow={updateRow}
              selectRows={selectRows}
              selectAll={selectAll}
            />
          );
        })}
      </List>
      <Pagination filteredRows={filteredRows} setIndex={setIndex} index={index / ROWS} setSelectAll={setSelectAll}/>
      <button className="app__delete__all" onClick={handleDelete}>Delete Selected</button>
    </>
  );
}

export default App;
