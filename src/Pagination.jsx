import { ROWS } from './constants';
const Pagination = ({ filteredRows, setIndex, index, setSelectAll }) => {
  const n = Math.ceil(filteredRows.length / ROWS)
  const pages = Array(n).fill();

  const isFirst = index == 0;
  const isLast = index == (n-1);

  function handlePageChange(index){
    setSelectAll(false);
    return setIndex(index * ROWS);
  }

  return (
    <div className='pagination'>
    <button className="pagination__nav" disabled={isFirst} onClick={() => handlePageChange(0)}>{`<<`}</button>
    <button className="pagination__nav" disabled={isFirst} onClick={() => handlePageChange(index-1)}>{`<`}</button>
    <div>
      {pages.map((page, index) => {
        return <button className="pagination__nav" key={index + 1} onClick={() => handlePageChange(index)}>{index + 1}</button>
      })}

    </div>
    <button className="pagination__nav" disabled={isLast} onClick={() => handlePageChange(index+1)}>{`>`}</button>
    <button className="pagination__nav" disabled={isLast} onClick={() => handlePageChange(n-1)}>{`>>`}</button>
    </div>
  );
};

export default Pagination;