import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCharacter, getDetail } from "../../app/apiSlice";
import PageTitle from "../layout/PageTitle";
const CharacterDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allegiances, setAllegiances] = useState([]);
  const [books, setBooks] = useState([]);
  const [povBooks, setPovBooks] = useState([]);
  useEffect(() => {
    dispatch(getCharacter(params.id))
      .unwrap()
      .then(() => {
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
        navigate("/characters");
      });
  }, [dispatch, navigate, params]);
  const { character } = useSelector((state) => state.api);
  const fetchDetails = async (type, store, urls) => {
    const detailPromises = urls.map((url) => {
      return dispatch(getDetail({ type, id: url.split("/").pop() }))
        .unwrap()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          navigate("/characters");
          return null;
        });
    });
    Promise.all(detailPromises).then((results) => {
      const validResults = results.filter((res) => res !== null);
      switch (store) {
        case "houses":
          setAllegiances(validResults);
          break;
        case "books":
          setBooks(validResults);
          break;
        case "povBooks":
          setPovBooks(validResults);
          break;
        default:
          break;
      }
    });
  };
  useEffect(() => {
    if (character.length === 0) return;
    fetchDetails("houses", "houses", character.allegiances);
    fetchDetails("books", "books", character.books);
    fetchDetails("books", "povBooks", character.povBooks);
  }, [character]);

  return (
    <>
      <PageTitle>
        {character.name === "" ? "No Name" : character.name}
      </PageTitle>
      {character && (
        <div className="detail character">
          <div className="detail-el">
            <div>NAME</div>
            <div>{character.name}</div>
          </div>
          <div className="detail-el">
            <div>GENDER</div>
            <div>{character.gender}</div>
          </div>
          <div className="detail-el">
            <div>PLAYED BY</div>
            {character?.playedBy?.map((i, k) => (
              <div key={k}>{i}</div>
            ))}
          </div>
          <div className="detail-el">
            <div>BORN</div>
            <div>{character.born}</div>
          </div>
          <div className="detail-el">
            <div>CULTURE</div>
            <div>{character.culture}</div>
          </div>
          <div className="detail-el">
            <div>DIED</div>
            <div>{character.died}</div>
          </div>
          <div className="detail-el">
            <div>FATHER</div>
            {character.father ? (
              <button
                onClick={() => {
                  navigate(`/characters/${character.father.split("/").pop()}`);
                }}
              >
                DETAIL
              </button>
            ) : (
              <div />
            )}
          </div>
          <div className="detail-el">
            <div>MOTHER</div>
            {character.mother ? (
              <button
                onClick={() => {
                  navigate(`/characters/${character.mother.split("/").pop()}`);
                }}
              >
                DETAIL
              </button>
            ) : (
              <div />
            )}
          </div>
          <div className="detail-el">
            <div>
              ALLEGIANCES
              <span>(Resource that this character is loyal to)</span>
            </div>
            {character?.allegiances ? (
              <div className="titles">
                {allegiances?.map((i, k) => {
                  return (
                    <Link
                      key={k}
                      to={`/houses/${Number(i.url.split("/").pop())}`}
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
            <div>
              ALIASES <span>(The aliases that this character goes by)</span>
            </div>
            <div className="titles">
              {character?.aliases?.map((i, k) => (
                <div key={k}>{i}</div>
              ))}
            </div>
          </div>
          <div className="detail-el">
            <div>SPOUSE</div>
            {character.spouse ? (
              <button
                onClick={() => {
                  navigate(`/characters/${character.spouse.split("/").pop()}`);
                }}
              >
                DETAIL
              </button>
            ) : (
              <div />
            )}
          </div>
          <div className="detail-el">
            <div>BOOKS</div>
            <div className="titles">
              {character?.allegiances ? (
                <div className="titles">
                  {books?.map((i, k) => {
                    return (
                      <Link
                        key={k}
                        to={`/books/${Number(i.url.split("/").pop())}`}
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
          <div className="detail-el">
            <div>POV BOOKS</div>
            <div className="titles">
              {character?.povBooks && (
                <div className="titles">
                  {povBooks?.map((i, k) => {
                    return (
                      <Link
                        key={k}
                        to={`/books/${Number(i.url.split("/").pop())}`}
                      >
                        {i.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="detail-el">
            <div>
              TV SERIES
              <span>
                (A list of names of the seasons of Game of Thrones that this
                character has been in)
              </span>
            </div>
            <div className="titles">
              {character?.tvSeries?.map((i, k) => (
                <div key={k}>{i}</div>
              ))}
            </div>
          </div>
          <div className="detail-el">
            <div>
              TITLES
              <span>(The titles that this character holds )</span>
            </div>
            <div className="titles">
              {character?.titles?.map((i, k) => (
                <span key={k}>{i}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CharacterDetail;
