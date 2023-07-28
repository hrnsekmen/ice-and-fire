/* eslint-disable react/prop-types */
import Checkbox from "../form-elements/Checkbox";
// eslint-disable-next-line react/prop-types
const HouseFilter = ({
  filter,
  setFilter,
  setName,
  setPage,
  setHaswords,
  setHasTitles,
  setHasDiedOut,
}) => {
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
  );
};
export default HouseFilter;
