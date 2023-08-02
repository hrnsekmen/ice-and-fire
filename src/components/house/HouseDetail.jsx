import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDetail, getHouse } from "../../app/apiSlice";
import PageTitle from "../layout/PageTitle";
const HouseDetail = () => {
  const [cadetBranches, setCadetBranches] = useState([]);
  const [swornMembers, setSwornMembers] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHouse(params.id))
      .unwrap()
      .then(() => {
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
        navigate("/houses");
      });
  }, [dispatch, navigate, params]);
  const { house } = useSelector((state) => state.api);
  const fetchDetails = async (type, store, urls) => {
    const detailPromises = urls.map((url) => {
      return dispatch(getDetail({ type, id: url.split("/").pop() }))
        .unwrap()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          navigate("/houses");
          return null;
        });
    });
    Promise.all(detailPromises).then((results) => {
      const validResults = results.filter((res) => res !== null);
      switch (store) {
        case "cadetBranches":
          setCadetBranches(validResults);
          break;
        case "swornMembers":
          setSwornMembers(validResults);
          break;
        default:
          break;
      }
    });
  };
  useEffect(() => {
    if (house.length === 0) return;
    fetchDetails("houses", "cadetBranches", house.cadetBranches);
    fetchDetails("characters", "swornMembers", house.swornMembers);
  }, [house]);

  return (
    <>
      <PageTitle>{house.name}</PageTitle>
      {house && (
        <div className="detail house">
          <div className="detail-el">
            <div>NAME</div>
            <div>{house.name}</div>
          </div>
          <div className="detail-el">
            <div>REGION</div>
            <div>{house.region}</div>
          </div>
          <div className="detail-el">
            <div>
              COAT OF ARMS
              <span>(Text describing the coat of arms of this house)</span>
            </div>
            <div>{house.coatOfArms}</div>
          </div>

          <div className="detail-el">
            <div>
              WORDS <span>(The words of this house)</span>
            </div>
            <div>{house.words}</div>
          </div>
          <div className="detail-el">
            <div>
              TITLES <span>(The titles that this house holds)</span>
            </div>
            <div className="titles">
              {house?.titles?.map((i, k) => (
                <div key={k}>{i}</div>
              ))}
            </div>
          </div>
          <div className="detail-el">
            <div>
              SEATS <span>(The seats that this house holds)</span>
            </div>
            <div className="titles">
              {house?.seats?.map((i, k) => (
                <div key={k}>{i}</div>
              ))}
            </div>
          </div>
          <div className="detail-el">
            <div>CURRENT LORD</div>
            <button
              onClick={() => {
                if (house.currentLord === "") return;
                navigate(`/characters/${house.currentLord.split("/").pop()}`);
              }}
            >
              {house.currentLord === "" ? "" : "DETAIL"}
            </button>
          </div>

          <div className="detail-el">
            <div>
              DIED OUT <span>(The year that this house died out)</span>
            </div>
            <div>{house.diedOut}</div>
          </div>
          <div className="detail-el">
            <div>FOUNDER</div>
            <button
              onClick={() => {
                if (house.founder === "") return;
                navigate(`/characters/${house.founder.split("/").pop()}`);
              }}
            >
              {house.founder === "" ? "" : "DETAIL"}
            </button>
          </div>
          <div className="detail-el">
            <div>
              FOUNDED <span>(The year that this house was founded)</span>
            </div>
            <div>{house.founded === "" ? "" : house.founded}</div>
          </div>
          <div className="detail-el">
            <div>
              OVERLORD
              <span>(The House resource link that this house answers to)</span>
            </div>
            <button
              onClick={() => {
                if (house.overlord === "") return;
                navigate(`/houses/${house.overlord.split("/").pop()}`);
              }}
            >
              {house.overlord === "" ? "" : "DETAIL"}
            </button>
          </div>
          <div className="detail-el">
            <div>SWORN MEMBERS ({swornMembers?.length})</div>
            {house?.swornMembers ? (
              <div className="titles">
                {swornMembers?.map((i, k) => {
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
            <div>CADET BRANCHES</div>
            {house?.cadetBranches ? (
              <div className="titles">
                {cadetBranches?.map((i, k) => {
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
        </div>
      )}
    </>
  );
};
export default HouseDetail;
