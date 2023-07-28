import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../app/apiSlice";
import PageTitle from "../layout/PageTitle";
import Pagination from "../pagination/Pagination";
import Character from "./Character";
import CharacterFilter from "./CharacterFilter";
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
        <Pagination
          title={"FILTER CHARACTERS"}
          page={page}
          setPage={setPage}
          filter={filter}
          setFilter={setFilter}
          data={characters}
        />
      </div>
      <div className="card-container cards">
        {characters.map((i, k) => (
          <Character key={k} name={i.name} gender={i.gender} url={i.url} />
        ))}
      </div>
      <CharacterFilter
        page={page}
        setPage={setPage}
        isAlive={isAlive}
        setIsAlive={setIsAlive}
        filter={filter}
        setFilter={setFilter}
        name={name}
        setName={setName}
      />
    </>
  );
};

export default Books;
