import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHouses } from "../../app/apiSlice";
import PageTitle from "../layout/PageTitle";
import Pagination from "../pagination/Pagination";
import House from "./House";
import HouseFilter from "./HouseFilter";
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
        <Pagination
          title={"FILTER HOUSES"}
          page={page}
          setPage={setPage}
          filter={filter}
          setFilter={setFilter}
          data={houses}
        />
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
      <HouseFilter
        filter={filter}
        setFilter={setFilter}
        setName={setName}
        setPage={setPage}
        setHaswords={setHaswords}
        setHasTitles={setHasTitles}
        setHasDiedOut={setHasDiedOut}
      />
    </>
  );
};

export default Houses;
