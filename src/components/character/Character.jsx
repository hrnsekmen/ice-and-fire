/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Character = ({ name, gender, url }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card">
        <h2 className="card-title">{name === "" ? "No Name" : name}</h2>
        <p className="description">{gender}</p>
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

export default Character;
