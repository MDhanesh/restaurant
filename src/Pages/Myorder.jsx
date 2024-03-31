import { useQuery } from "@apollo/client";
import { GET_ALL_ORDER, GET_ONEALL_ORDER } from "../graphql/query";
import { BsCurrencyRupee } from "react-icons/bs";
import { useEffect } from "react";

export default function Myorder({ setVal }) {
  const { data } = useQuery(GET_ONEALL_ORDER, {
    variables: {
      uuid: localStorage.getItem("UserToken"),
    },
  });
  console.log(data);
  const Cartfound = (itm) => {
    return JSON.parse(itm);
  };
  //
  function Totalitem() {
    const Olditm = localStorage.getItem("checkoutItems");
    const parse = JSON.parse(Olditm);
    return parse?.length > 0 ? parse.length : 0;
  }
  useEffect(() => {
    setVal(Totalitem());
  }, [localStorage.getItem("checkoutItems")]);
  return (
    <div className="Container">
      <div className="Listheading">My Orders</div>
      <div>
        <div className="Box__head_list">
          <p>Food Item</p>
          <span style={{ borderRight: "1px solid #888" }}></span>
          <p>Location</p>
          <span style={{ borderRight: "1px solid #888" }}></span>
          <p>Order Info</p>
          <span style={{ borderRight: "1px solid #888" }}></span>
          <p>Delivery Info</p>
        </div>
        <div className="Box__content_list">
          <div className="Content_Full_item">
            {data?.getOneorder?.map((itm, i) => {
              return (
                <div key={i} className="Conatiner__Lict">
                  <div>
                    {Cartfound(itm?.cart)?.map((val, i) => {
                      return (
                        <div className="foodOrdered" key={i}>
                          <p>
                            Name:
                            <span className="Span__NAme">
                              {val?.foodItem?.name}
                            </span>
                            ({val?.foodItem?.veg})
                          </p>
                          <p>
                            Qnty:<span>{val?.count}</span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <span style={{ borderRight: "1px solid #888" }}></span>
          <div className="Content_Full_item">
            {data?.getOneorder?.map((itm, i) => {
              return (
                <div key={i} className="Conatiner__Lict">
                  <div className="IdLict">
                    <p>Name :</p>
                    <p>{itm?.user?.name}</p>
                  </div>
                  <div className="IdLict">
                    <p>Email :</p>
                    <p>{itm?.user?.email}</p>
                  </div>
                  <div className="IdLict">
                    <p>Phone :</p>
                    <p>{itm?.user?.number}</p>
                  </div>
                  <div className="IdLict">
                    <p>Place :</p>
                    <p>{itm?.user?.Place}</p>
                  </div>
                  <div className="IdLict">
                    <p>Address:</p>
                    <p>{itm?.user?.Location}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <span style={{ borderRight: "1px solid #888" }}></span>
          <div className="Content_Full_item">
            {data?.getOneorder?.map((itm, i) => {
              return (
                <div key={i} className="Conatiner__Lict">
                  <div className="IdLict">
                    <p>Order Id :</p>&nbsp;
                    <p>#{itm?._id.slice(0, 6)}</p>
                  </div>
                  <div className="IdLict">
                    <p>Price:</p>&nbsp;
                    <p>
                      <BsCurrencyRupee size={18} />
                      {itm?.price}
                    </p>
                  </div>
                  <div className="IdLict">
                    <p>Ordered Date: </p>&nbsp;
                    <p>{itm?.createdAt.slice(0, 15)}</p>
                  </div>
                  <div className="IdLict">
                    <p>Ordered Time: </p>&nbsp;
                    <p>{itm?.createdAt.slice(16, 24)}</p>
                  </div>
                  <div className="IdLict">
                    <p>Ordered Status: </p>&nbsp;
                    <p>{itm?.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <span style={{ borderRight: "1px solid #888" }}></span>
          <div className="Content_Full_item">
            {data?.getOneorder?.map((itm, i) => {
              return (
                <div key={i} className="Conatiner__Lict">
                  {!itm?.delivery ? (
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "150px",
                      }}
                    >
                      Food is Cooking
                    </div>
                  ) : (
                    <>
                      <div className="IdLict">
                        <p>Order Id :</p>&nbsp;
                        <p>#{itm?._id.slice(0, 6)}</p>
                      </div>
                      <div className="IdLict">
                        <p>Name:</p>&nbsp;
                        <p>
                          <BsCurrencyRupee size={18} />
                          {itm?.delivery?.name}
                        </p>
                      </div>
                      <div className="IdLict">
                        <p>Ordered Date: </p>&nbsp;
                        <p>{itm?.createdAt.slice(0, 15)}</p>
                      </div>
                      <div className="IdLict">
                        <p>Ordered Time: </p>&nbsp;
                        <p>{itm?.createdAt.slice(16, 24)}</p>
                      </div>
                      <div className="IdLict">
                        <p>Ordered Status: </p>&nbsp;
                        <p>{itm?.status}</p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
