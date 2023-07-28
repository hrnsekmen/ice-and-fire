/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Book = ({ name, authors, url }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card">
        <h2 className="card-title">{name}</h2>
        <p className="description">
          {authors.map((i, k) => (
            <React.Fragment key={k}>{i}</React.Fragment>
          ))}
        </p>
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

export default Book;
