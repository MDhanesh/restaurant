import "./style.css";
import { MdOutlineAdd } from "react-icons/md";
import { LuMinus } from "react-icons/lu";
import veg from "../Assets/veg.svg";
import nonveg from "../Assets/non_veg.svg";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATS, GET_ALL_FOODS } from "../graphql/query";

export default function Foodmenu({ setVal }) {
  const [fillCat, setFillCat] = useState("Combo offer");
  const { data } = useQuery(GET_ALL_FOODS);
  const Foodcat = useQuery(GET_ALL_CATS);
  const filterData = data?.getAllFoods?.filter(
    (d) => d?.category?.name === fillCat
  );
  return (
    <>
      <div className="Container">
        <div className="Category">
          {Foodcat?.data?.getCats?.map((data, i) => (
            <div
              key={i}
              className={
                fillCat === data?.name ? "Cats__DataActive" : " Cats__Data"
              }
              onClick={() => setFillCat(data?.name)}
            >
              {data?.name}
            </div>
          ))}
        </div>
        {/* fooods */}
        {filterData?.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              fontSize: "25px",
              fontWeight: "600",
            }}
          >
            No Food to Show
          </div>
        ) : (
          <div className="Food_Card">
            {filterData?.map((data, i) => (
              <Card data={data} key={i} setVal={setVal} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
const Card = ({ data, i, setVal }) => {
  // State to store checkout items
  const [checkoutItems, setCheckoutItems] = useState([]);

  // Function to add a food item to the checkout list
  const addToCheckout = (foodItem) => {
    const Qnt = { foodItem, count: 1 };
    const Olditm = localStorage.getItem("checkoutItems");
    const parse = JSON.parse(Olditm);
    const checkItm = parse?.map((x) => x?.foodItem?._id);
    const val = checkItm?.includes(Qnt?.foodItem?._id);
    if (!val) {
      setCheckoutItems([...checkoutItems, Qnt]);
      localStorage.setItem(
        "checkoutItems",
        JSON.stringify([...checkoutItems, Qnt])
      );
    }
  };

  function Totalitem() {
    const Olditm = localStorage.getItem("checkoutItems");
    const parse = JSON.parse(Olditm);
    return parse?.length > 0 ? parse.length : 0;
  }
  useEffect(() => {
    setVal(Totalitem());
  }, [localStorage.getItem("checkoutItems")]);

  return (
    <>
      <div key={i} className="Card__Box">
        <div className="Image__Box">
          <img src={data?.image} alt="Food image" className="foodImage" />
          <span className="Veg_Nonveg">
            {data?.veg === "veg" ? (
              <img src={veg} alt="Veg" />
            ) : (
              <img src={nonveg} alt="Veg" />
            )}
          </span>
          {/* <h3>₹{data.price}</h3> */}
        </div>
        <div className="Content__Box">
          <h4> {data?.name}</h4>
          <p>{data?.description}</p>
          <div className="Cost__Section">
            <button>
              ₹{data.price}
              {/* <LuMinus className="Icons" onClick={Removecount} />
              <span className="Count__Text">{count}</span>
              <MdOutlineAdd className="Icons" onClick={Addcount} /> */}
            </button>
            <button onClick={() => addToCheckout(data)}>ADD</button>
          </div>
        </div>
      </div>
    </>
  );
};
