import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../app/apiSlice";
import PageTitle from "../layout/PageTitle";
import Book from "./Book";
const Books = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const { books } = useSelector((state) => state.api);
  const [filter, setFilter] = useState(false);
  const [name, setName] = useState();
  useEffect(() => {
    dispatch(
      getBooks({
        page: page,
        pageSize: pageSize,
        name: name,
      })
    );
  }, [page, pageSize, name, dispatch]);

  return (
    <>
      <div className="top">
        <PageTitle>BOOKS</PageTitle>
        <div className="pagination">
          <button
            onClick={() => {
              setFilter(!filter);
            }}
          >
            FILTER BOOKS
          </button>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            {"Prev"}
          </button>
          <div>{page}</div>
          <button disabled={books.length < 2} onClick={() => setPage(page + 1)}>
            {"Next"}
          </button>
        </div>
      </div>
      <div className="card-container cards">
        {books.map((i, k) => (
          <Book key={k} name={i.name} authors={i.authors} url={i.url} />
        ))}
      </div>
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
    </>
  );
};

export default Books;
