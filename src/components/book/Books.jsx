import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../app/apiSlice";
import PageTitle from "../layout/PageTitle";
import Pagination from "../pagination/Pagination";
import Book from "./Book";
import BookFilter from "./BookFilter";
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
        <Pagination
          title={"FILTER BOOKS"}
          page={page}
          setPage={setPage}
          filter={filter}
          setFilter={setFilter}
          data={books}
        />
      </div>
      <div className="card-container cards">
        {books.map((i, k) => (
          <Book key={k} name={i.name} authors={i.authors} url={i.url} />
        ))}
      </div>
      <BookFilter setName={setName} filter={filter} setFilter={setFilter} />
    </>
  );
};

export default Books;
