// eslint-disable-next-line react/prop-types
const BookFilter = ({ filter, setFilter, setName }) => {
  return (
    <div className={filter ? "filter active detail" : "filter"}>
      <span
        className="close"
        onClick={() => {
          setFilter(false);
        }}
      >
        X
      </span>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          setName(e.target.housename.value);
        }}
      >
        <div className="search">
          <input
            onChange={(e) => {
              if (e.target.value === "") setName();
            }}
            type="text"
            name="housename"
            placeholder="Type A Book Name"
          />
          <button type="submit">SEARCH</button>
        </div>
      </form>
    </div>
  );
};

export default BookFilter;
