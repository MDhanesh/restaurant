import "./style.css";
import { LuMinus } from "react-icons/lu";
import { MdClose, MdDeleteOutline, MdOutlineAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ADDRESS, CREATE_ORDER } from "../graphql/mutation";
import { useNavigate } from "react-router-dom";

export default function Order({ setVal, setOpen, Alldata }) {
  const [selectedFood, setSelectedFood] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate();
  // Load selectedFood from localStorage when component mounts
  useEffect(() => {
    const storedFood = localStorage.getItem("checkoutItems");
    if (storedFood) {
      setSelectedFood(JSON.parse(storedFood));
    }
  }, []);
  //useMutation
  const [createOrder] = useMutation(CREATE_ORDER);
  //
  const Addcount = (item) => {
    if (item?.count < 10) {
      const Olditm = localStorage.getItem("checkoutItems");
      const parse = JSON.parse(Olditm);
      const Finditem = parse.findIndex((x) => {
        return x?.foodItem?._id === item?.foodItem?._id;
      });
      if (Finditem !== -1) {
        parse[Finditem].count++;
        localStorage.setItem("checkoutItems", JSON.stringify(parse));
        setSelectedFood(parse);
      }
    }
  };
  const Removecount = (item) => {
    if (item?.count > 1) {
      const Olditm = localStorage.getItem("checkoutItems");
      const parse = JSON.parse(Olditm);
      const Finditem = parse.findIndex((x) => {
        return x?.foodItem?._id === item?.foodItem?._id;
      });
      if (Finditem !== -1) {
        parse[Finditem].count--;
        localStorage.setItem("checkoutItems", JSON.stringify(parse));
        setSelectedFood(parse);
      }
    }
  };
  const RemoveFromCart = (itm) => {
    console.log(itm);
    const Olditm = localStorage.getItem("checkoutItems");
    const parse = JSON.parse(Olditm);
    const Finditem = parse?.filter((x) => {
      return x.foodItem?._id !== itm.foodItem?._id;
    });
    localStorage.setItem("checkoutItems", JSON.stringify(Finditem));
    setSelectedFood(Finditem);
  };
  useEffect(() => {
    const storedFood = localStorage.getItem("checkoutItems");
    if (storedFood) {
      setSelectedFood(JSON.parse(storedFood));
    }
  }, []);
  //
  function Totalitem() {
    const Olditm = localStorage.getItem("checkoutItems");
    const parse = JSON.parse(Olditm);
    return parse?.length > 0 ? parse.length : 0;
  }
  useEffect(() => {
    setVal(Totalitem());
  }, [localStorage.getItem("checkoutItems")]);

  function SubToatal() {
    const Olditm = localStorage.getItem("checkoutItems");
    const parse = JSON.parse(Olditm);
    const sum = parse?.map((x) => x?.foodItem?.price * x?.count);
    const total = sum?.reduce(
      (prev, curr) => parseInt(prev) + parseInt(curr),
      0
    );
    return total;
  }
  function Totalvalue() {
    const val = SubToatal() + 49 + 17.45;
    return !SubToatal() ? 0 : val?.toFixed(2);
  }
  //
  const Placeorder = async () => {
    const Olditm = localStorage.getItem("UserToken");
    if (!Olditm) {
      setOpen(true);
    } else if (!Alldata?.getlogin?.Location && !Alldata?.getlogin?.Place) {
      setOpenAdd(true);
    } else {
      alert("skn");
      try {
        const val = await createOrder({
          variables: {
            orderplaced: {
              cart: JSON.stringify(selectedFood),
              price: await Totalvalue(),
              user: Alldata?.getlogin?.uuid,
            },
          },
        });
        console.log(val);
        navigate("/order-list");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div
        className="Order"
        style={{ minHeight: selectedFood?.length === 0 ? "auto" : "100vh" }}
      >
        <div className="order__Container">
          <div className="Left_Box">
            <h1>My Order</h1>
            {selectedFood?.length !== 0 ? (
              <div className="Overflow">
                <div className="OrderList">
                  {selectedFood?.map((item, i) => {
                    return (
                      <div className="Item_Box" key={i}>
                        <div className="ItemImg__Box">
                          <img src={item?.foodItem?.image} alt="img" />
                        </div>
                        <div className="ItemInfo__Box">
                          <div style={{ display: "flex", gap: "1rem" }}>
                            <div className="Info__Content">
                              <h6>{item?.foodItem?.name}</h6>
                              <p>{item?.foodItem?.description}</p>
                            </div>
                            <div className="PriceAndQuantity">
                              <div
                                style={{
                                  display: "flex",
                                  gap: "8px",
                                  alignItems: "center",
                                }}
                              >
                                <LuMinus
                                  className="Icons"
                                  onClick={() => Removecount(item)}
                                />
                                <span className="Count__Text">
                                  {item?.count}
                                </span>
                                <MdOutlineAdd
                                  className="Icons"
                                  onClick={() => Addcount(item)}
                                />
                              </div>
                              <h3>₹{item?.foodItem?.price}</h3>
                            </div>
                          </div>
                          <button
                            className="Remove__Btn"
                            onClick={() => RemoveFromCart(item)}
                          >
                            <MdDeleteOutline size={20} />
                            &nbsp; Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <p style={{ fontSize: "18px", fontWeight: "500" }}>
                  Oops ! Your cart is empty.
                </p>
                <button
                  style={{
                    border: "1px solid #000",
                    padding: "6px 14px",
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/")}
                >
                  Go to home page
                </button>
              </div>
            )}
          </div>
          {/* order */}
          <div className="Right_Box">
            <h1>price details</h1>
            <div className="PriceDetails">
              <span>sub total</span>
              <b>₹{SubToatal() || 0}</b>
            </div>
            <div className="PriceDetails">
              <span>Discount</span>
              <b>-</b>
            </div>
            <div className="PriceDetails">
              <span>Delivery Charges</span>
              <b>₹{!SubToatal() ? 0 : 49}</b>
            </div>
            <div className="PriceDetails">
              <span>Tax</span>
              <b>₹{!SubToatal() ? 0 : 17.45}</b>
            </div>
            <div className="PriceDetails1">
              <h2>Grand total</h2>
              <b>₹{Totalvalue()}</b>
            </div>
            <button className="Place__Order" onClick={Placeorder}>
              Place order
            </button>
            <br />
            <br />
            {!localStorage.getItem("UserToken") ||
            (!Alldata?.getlogin?.Location &&
              !Alldata?.getlogin?.Place) ? null : (
              <div>
                <h1>My Address</h1>
                <div>Name:{Alldata?.getlogin?.name}</div>
                <div>Phone:{Alldata?.getlogin?.number}</div>
                <div>Place:{Alldata?.getlogin?.Place}</div>
                <div>Location:{Alldata?.getlogin?.Location}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Address setOpenAdd={setOpenAdd} openAdd={openAdd} Alldata={Alldata} />
    </>
  );
}
const Address = ({ setOpenAdd, openAdd, Alldata }) => {
  const [addAddress] = useMutation(ADD_ADDRESS);
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    setErr("");
  }, [place, location]);

  //
  const Addaddress = async () => {
    try {
      if (!place || !location) {
        setErr("Please fill all fields");
      } else {
        await addAddress({
          variables: {
            login: { Place: place, Location: location },
            uuid: Alldata?.getlogin?.uuid,
          },
        });
        setOpenAdd(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!openAdd) {
    return null;
  }
  return (
    <>
      <div className="Background">
        <div className="Login_Container">
          <div className="Login_Head">
            <h1>Add Address</h1>
          </div>
          {err && <p style={{ color: "#ff0000" }}>{err}</p>}
          <div className="Inputs_Container">
            <h4>Place:</h4>
            <input
              type="text"
              placeholder="Enter your Place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            <div className="Forgot_Pass">
              <h4>Location:</h4>
            </div>
            <input
              type="text"
              placeholder="Enter your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button className="login__Btn" onClick={Addaddress}>
              Add Address
            </button>
          </div>
          <MdClose
            className="Close__Icon"
            size={18}
            onClick={() => setOpenAdd(!openAdd)}
          />
        </div>
      </div>
    </>
  );
};
