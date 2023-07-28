/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import "./pagination.css";
const Pagination = ({ title, filter, setFilter, setPage, page, data }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          setFilter(!filter);
        }}
      >
        {title ? title : "FILTER"}
      </button>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        {"Prev"}
      </button>
      <div>{page}</div>
      <button disabled={data?.length < 2} onClick={() => setPage(page + 1)}>
        {"Next"}
      </button>
    </div>
  );
};

export default Pagination;
