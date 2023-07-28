/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const House = ({ name, coatOfArms, url }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card">
        <h2 className="card-title">{name}</h2>
        <p className="description">{coatOfArms}</p>
        <button
          onClick={() => {
            navigate(url.split("/").pop());
          }}
        >
          DETAILS
        </button>
      </div>
    </>
  );
};

export default House;
