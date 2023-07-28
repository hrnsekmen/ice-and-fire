import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHouses } from "../../app/apiSlice";
import Checkbox from "../form-elements/Checkbox";
import PageTitle from "../layout/PageTitle";
import House from "./House";
const Houses = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [name, setName] = useState();
  const [hasWords, setHaswords] = useState();
  const [hasTitles, setHasTitles] = useState();
  const [hasDiedOut, setHasDiedOut] = useState();
  const [filter, setFilter] = useState(false);
  const { houses } = useSelector((state) => state.api);
  useEffect(() => {
    dispatch(
      getHouses({
        page: page,
        pageSize: pageSize,
        name: name,
        hasWords: hasWords,
        hasTitles: hasTitles,
        hasDiedOut: hasDiedOut,
      })
    );
  }, [page, pageSize, name, hasWords, hasTitles, hasDiedOut, dispatch]);

  return (
    <>
      <div className="top">
        <PageTitle>Houses</PageTitle>
        <div className="pagination">
          <button
            onClick={() => {
              setFilter(!filter);
            }}
          >
            FILTER HOUSES
          </button>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            {"Prev"}
          </button>
          <div>{page}</div>
          <button
            disabled={houses.length < 2}
            onClick={() => setPage(page + 1)}
          >
            {"Next"}
          </button>
        </div>
      </div>
      <div className="card-container cards">
        {houses.map((i, k) => (
          <House
            key={k}
            name={i.name}
            coatOfArms={i.coatOfArms}
            region={i.region}
            url={i.url}
          />
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
              placeholder="Type A House Name...(ALGOOD)"
            />
            <button type="submit">SEARCH</button>
          </div>
          <div className="checkboxes">
            <Checkbox
              onChange={(e) => {
                setName("");
                setHaswords(e.target.checked);
                setPage(1);
              }}
              label="Has Words"
              name="hasWords"
            />
            <Checkbox
              onChange={(e) => {
                setName("");
                setHasTitles(e.target.checked);
                setPage(1);
              }}
              label="Has Titles"
              name="hasTitles"
            />
            <Checkbox
              onChange={(e) => {
                setName("");
                setHasDiedOut(e.target.checked);
                setPage(1);
              }}
              label="Has Died Out"
              name="hasDiedOut"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Houses;
