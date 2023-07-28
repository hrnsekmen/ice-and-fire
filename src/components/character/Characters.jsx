import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../app/apiSlice";
import Checkbox from "../form-elements/Checkbox";
import PageTitle from "../layout/PageTitle";
import Character from "./Character";
const Books = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const { characters } = useSelector((state) => state.api);
  const [filter, setFilter] = useState(false);
  const [name, setName] = useState();
  const [isAlive, setIsAlive] = useState(true);
  useEffect(() => {
    dispatch(
      getCharacters({
        page: page,
        pageSize: pageSize,
        name: name,
        isAlive: isAlive,
      })
    );
  }, [page, pageSize, name, isAlive, dispatch]);

  return (
    <>
      <div className="top">
        <PageTitle>CHARACTERS</PageTitle>
        <div className="pagination">
          <button
            onClick={() => {
              setFilter(!filter);
            }}
          >
            FILTER CHARACTERS
          </button>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            {"Prev"}
          </button>
          <div>{page}</div>
          <button
            disabled={characters.length < 2}
            onClick={() => setPage(page + 1)}
          >
            {"Next"}
          </button>
        </div>
      </div>
      <div className="card-container cards">
        {characters.map((i, k) => (
          <Character key={k} name={i.name} gender={i.gender} url={i.url} />
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
              placeholder="Type A Character Name"
            />
            <button type="submit">SEARCH</button>
          </div>
          <div className="checkboxes">
            <Checkbox
              checked={isAlive}
              onChange={(e) => {
                setName("");
                setIsAlive(e.target.checked);
                setPage(1);
              }}
              label="Is Alive"
              name="isAlive"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Books;
