/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBook } from "../../app/apiSlice";
import useFormattedDate from "../../hooks/useFormattedDate";
import PageTitle from "../layout/PageTitle";
const BookDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBook(params.id))
      .unwrap()
      .then(() => {
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
        navigate("/houses");
      });
  }, [dispatch, navigate, params]);
  const { book } = useSelector((state) => state.api);
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
            <div>CHARACTERS</div>
            <div className="titles">{book?.characters?.length}</div>
          </div>
          <div className="detail-el">
            <div>POV CHARACTERS</div>
            <div className="titles">{book?.povCharacters?.length}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default BookDetail;
