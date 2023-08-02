/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBook, getDetail } from "../../app/apiSlice";
import useFormattedDate from "../../hooks/useFormattedDate";
import PageTitle from "../layout/PageTitle";
const BookDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [characters, setCharacters] = useState([]);
  const [povCharacters, setPovCharacters] = useState([]);
  useEffect(() => {
    dispatch(getBook(params.id))
      .unwrap()
      .then(() => {
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
        navigate("/books");
      });
  }, [dispatch, navigate, params]);
  const { book } = useSelector((state) => state.api);
  const fetchDetails = async (type, store, urls) => {
    const detailPromises = urls.map((url) => {
      return dispatch(getDetail({ type, id: url.split("/").pop() }))
        .unwrap()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          navigate("/books");
          return null;
        });
    });
    Promise.all(detailPromises).then((results) => {
      const validResults = results.filter((res) => res !== null);
      switch (store) {
        case "characters":
          setCharacters(validResults);
          break;
        case "povCharacters":
          setPovCharacters(validResults);
          break;
        default:
          break;
      }
    });
  };
  useEffect(() => {
    if (book.length === 0) return;
    fetchDetails("characters", "characters", book.characters);
    fetchDetails("characters", "povCharacters", book.povCharacters);
  }, [book]);
  return (
    <>
      <PageTitle>{book.name}</PageTitle>
      {book && (
        <div className="detail book">
          <div className="detail-el">
            <div>NAME</div>
            <div>{book.name}</div>
          </div>
          <div className="detail-el">
            <div>AUTHORS</div>
            <div className="titles">
              {book?.authors?.map((i, k) => (
                <div key={k}>{i}</div>
              ))}
            </div>
          </div>
          <div className="detail-el">
            <div>NUMBER OF PAGES</div>
            <div>{book.numberOfPages}</div>
          </div>
          <div className="detail-el">
            <div>
              PUBLISHER <span>(The company that published this book)</span>
            </div>
            <div>{book.publisher}</div>
          </div>
          <div className="detail-el">
            <div>
              COUNTRY <span>(The country that this book was published in)</span>
            </div>
            <div>{book.country}</div>
          </div>
          <div className="detail-el">
            <div>
              RELEASE DATE
              <span>(The date (ISO 8601) when this book was released)</span>
            </div>
            <div>{useFormattedDate(book.released)}</div>
          </div>
          <div className="detail-el">
            <div>CHARACTERS ({characters?.length})</div>
            {book?.characters ? (
              <div className="titles">
                {characters?.map((i, k) => {
                  return (
                    <Link
                      key={k}
                      to={`/characters/${Number(i.url.split("/").pop())}`}
                    >
                      {i.name}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div />
            )}
          </div>
          <div className="detail-el">
            <div>POV CHARACTERS ({povCharacters?.length})</div>
            {book?.povCharacters ? (
              <div className="titles">
                {povCharacters?.map((i, k) => {
                  return (
                    <Link
                      key={k}
                      to={`/characters/${Number(i.url.split("/").pop())}`}
                    >
                      {i.name}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default BookDetail;
