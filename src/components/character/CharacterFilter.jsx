/* eslint-disable react/prop-types */
import Checkbox from "../form-elements/Checkbox";
// eslint-disable-next-line react/prop-types
const CharacterFilter = ({
  filter,
  setFilter,
  setName,
  setPage,
  isAlive,
  setIsAlive,
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
  );
};
export default CharacterFilter;
