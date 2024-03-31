import { useEffect, useState } from "react";
import "./style.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CATS, GET_ALL_FOODS, GET_ALL_PERSON } from "../graphql/query";
import {
  ADD_CATS,
  ADD_DELIVERY_PERSON,
  ADD_FOOD,
  DELETE_FOOD,
  DELETE__DELIVERY_PERSON,
  UPDATE_CATEGORY,
  UPDATE_FOOD,
} from "../graphql/mutation";
import { MdClose, MdKeyboardArrowDown } from "react-icons/md";
import img from "../Assets/pizza.jpg";
import veg from "../Assets/veg.svg";
import nonveg from "../Assets/non_veg.svg";

export default function Dashboard() {
  const [view, setView] = useState("Kitchen");
  return (
    <div className="Container">
      {/* Dashboard_Heading */}
      <div className="Dash__Head">
        <h1 onClick={() => setView("/AddCategory")}>Add Category</h1>
        <h1 onClick={() => setView("/Addfood")}>Food List</h1>
        <h1 onClick={() => setView("/kitchen")}>kitchen</h1>
        <h1 onClick={() => setView("/DeliveryPerson")}>Delivery Person</h1>
      </div>
      <div className="Dash__Height">
        {/* AddCategoryForm */}
        {view === "/AddCategory" && <AddCategory />}
        {/* KitchenView */}
        {/* {view === "/kitchen" && <KitchenView />} */}
        {/* OrderListView */}
        {view === "/DeliveryPerson" && <Deliveryperson />}
        {/* AddFoodForm */}
        {view === "/Addfood" && <AddFood />}
      </div>
    </div>
  );
}
//category
const AddCategory = () => {
  //useQuery
  const { data } = useQuery(GET_ALL_CATS);
  //console.log(data);
  //Mutation
  const [addCategory] = useMutation(ADD_CATS, {
    refetchQueries: [{ query: GET_ALL_CATS }],
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_ALL_CATS }],
  });
  const [category, setCategory] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    setErr("");
  }, [category]);
  //
  const Addcat = async (e) => {
    e.preventDefault();
    try {
      await addCategory({
        variables: {
          category: {
            name: category,
          },
        },
      });
      setCategory("");
    } catch (error) {
      console.log(error);
      setErr(error?.message);
    }
  };
  const Delecat = async (data) => {
    try {
      await updateCategory({
        variables: {
          id: data._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="Addcat_Start">
        <div className="AddCatHead">Add Category</div>
        <div className="D___grid">
          <div className="Grid__1">
            <p>Enter Category Name:</p>
            {err}
            <span className="InputField">
              <input
                type="text"
                placeholder="Enter category name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <button onClick={Addcat}>ADD</button>
            </span>
          </div>
          <div className="Grid__2">
            <p>Category Name List:</p>
            <div className="Grid__2_Box">
              {data?.getCats?.map((cats, i) => {
                return (
                  <span key={i}>
                    {cats.name}
                    <MdClose
                      className="Close__Icon_Cat"
                      size={18}
                      onClick={() => Delecat(cats)}
                    />
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
//add  food list
const AddFood = () => {
  //usestate
  const [close, setClose] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isVeg, setIsVeg] = useState("veg");
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState();
  const [catsId, setCatsId] = useState("");
  //Edit Food Menu
  const [edit, setEdit] = useState();
  const [editCategory, setEditCategory] = useState("");
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editisVeg, setEditIsVeg] = useState("");
  //edit
  const Editfood = (menu) => {
    setOpen("Edit");
    setEdit(menu);
  };
  useEffect(() => {
    setEditCategory(edit?.menu?.category?.name);
    setEditDescription(edit?.menu?.description);
    setEditImage(edit?.menu?.image);
    setEditIsVeg(edit?.menu?.veg);
    setEditName(edit?.menu?.name);
    setEditPrice(edit?.menu?.price);
  }, [edit]);
  //use query
  const user = localStorage.getItem("UserToken");
  const fooddata = useQuery(GET_ALL_FOODS, {
    variables: {
      uuid: user,
    },
  });
  const { data } = useQuery(GET_ALL_CATS);
  //
  const onOpenLang = () => {
    setClose(!close);
  };
  const onLangClick = (item) => {
    setClose(!close);
    setCategory(item?.name);
    setCatsId(item._id);
    setEditCategory(item?.name);
  };
  useEffect(() => {
    setErr("");
  }, [name, price, category, image, description]);
  //mutation
  const [addFood] = useMutation(ADD_FOOD, {
    refetchQueries: [{ query: GET_ALL_FOODS }],
  });
  const [updateFood] = useMutation(UPDATE_FOOD, {
    refetchQueries: [{ query: GET_ALL_FOODS }],
  });
  const [deleteFood] = useMutation(DELETE_FOOD, {
    refetchQueries: [{ query: GET_ALL_FOODS }],
  });
  //
  const Addfood = async () => {
    if (!name || !price || !category || !catsId || !image || !description) {
      setErr("All fields are required!");
    } else {
      try {
        const vals = await addFood({
          variables: {
            food: {
              category: catsId,
              description: description,
              image: image,
              name: name,
              price: price,
              veg: isVeg,
            },
          },
        });
        setName("");
        setCategory("");
        setDescription("");
        setImage("");
        setPrice("");
        setOpen(false);
        console.log(vals);
      } catch (error) {
        console.log(error);
      }
    }
  };
  //
  const Deletefood = async (id) => {
    try {
      await deleteFood({ variables: { id: id } });
    } catch (error) {
      console.log(error);
    }
  };
  const Updatefoods = async () => {
    if (
      !editName ||
      !editPrice ||
      !editCategory ||
      !editImage ||
      !editDescription
    ) {
      setErr("All fields are required!");
    } else {
      try {
        const vals = await updateFood({
          variables: {
            food: {
              category: catsId ? catsId : edit?.menu?.category?._id,
              description: editDescription,
              image: editImage,
              name: editName,
              price: editPrice,
              veg: editisVeg,
            },
            id: edit?.menu?._id,
          },
        });
        setOpen(false);
        console.log(vals);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="Addcat_Start">
        <div className="AddFoodHead">
          <h1>Food List</h1>
          <span onClick={() => setOpen("New")}>Add New Food</span>
        </div>
        <div className="Food_Card">
          {fooddata?.data?.getAllFoods?.map((menu, i) => {
            return (
              <div key={i} className="Card__Box">
                <div className="Image__Box">
                  <img
                    src={menu?.image}
                    alt="Food image"
                    className="foodImage"
                  />
                  <span className="Veg_Nonveg">
                    {menu?.veg === "veg" ? (
                      <img src={veg} alt="Veg" />
                    ) : (
                      <img src={nonveg} alt="Veg" />
                    )}
                  </span>
                  <h3>₹{menu?.price}</h3>
                </div>
                <div className="Content__Box">
                  <div className="Cost__Section" style={{ borderTop: "0" }}>
                    <h4> {menu?.name}</h4>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      Category:
                      <h4 style={{ fontSize: "14px" }}>
                        {menu?.category?.name}
                      </h4>
                    </span>
                  </div>
                  <p>{menu?.description}</p>
                  <div className="Cost__Section">
                    <button onClick={() => Editfood({ menu, id: i })}>
                      EDIT
                    </button>
                    <button onClick={() => Deletefood(menu?._id)}>
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {open === "New" && (
        <div className="Background">
          <div className="Grid__1 Login_Container">
            {err && <p style={{ color: "#ff0000" }}>{err}</p>}
            <p>Name</p>
            <input
              type="text"
              placeholder="Enter Food name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <>
              <p>select category</p>
              <div style={{ position: "relative" }}>
                <div className="Settings_Drop_Con" onClick={() => onOpenLang()}>
                  {category || "Select Event Category"}
                  <MdKeyboardArrowDown
                    className={close ? "Arrow_Down Arrow_Up" : "Arrow_Down"}
                    size={24}
                    color={"#8a8a8a"}
                  />
                </div>
                <div
                  className={
                    close
                      ? "Settings_Country_Modal Width__Options Settings_Country_Modal_Open"
                      : "Settings_Country_Modal Width__Options"
                  }
                >
                  <div className="Settings_Country_Modal_Con">
                    {data?.getCats?.map((item, index) => {
                      return (
                        <p
                          key={index}
                          style={{ marginTop: index === 0 ? 3 : null }}
                          onClick={() => onLangClick(item, index)}
                        >
                          {item?.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
            <p>Price</p>
            <input
              type="text"
              placeholder="Enter Food price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p>Image URL</p>
            <input
              type="text"
              placeholder="Enter  Image URl"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <p>Choose Veg or Non-Veg</p>
            <div className="Radio___btn">
              <span style={{ display: "flex" }}>
                <input
                  type="radio"
                  style={{ width: "auto" }}
                  checked={isVeg === "veg"}
                  onChange={() => setIsVeg("veg")}
                />
                <p>Veg</p>
              </span>
              <span style={{ display: "flex" }}>
                <input
                  type="radio"
                  style={{ width: "auto" }}
                  checked={isVeg === "nonveg"}
                  onChange={() => setIsVeg("nonveg")}
                />
                <p>Non-Veg</p>
              </span>
            </div>
            <p>Description</p>
            <input
              type="text"
              placeholder="Enter Food Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="Food__Btn_" onClick={Addfood}>
                Add Food
              </button>
            </div>
            {/* closebtn */}
            <MdClose
              className="Close__Icon"
              size={18}
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
      )}
      {open === "Edit" && (
        <div className="Background">
          <div className="Grid__1 Login_Container">
            {err && <p style={{ color: "#ff0000" }}>{err}</p>}
            <p>Name</p>
            <input
              type="text"
              placeholder="Enter Food name"
              value={editName || ""}
              onChange={(e) => setEditName(e.target.value)}
            />
            <>
              <p>select category</p>
              <div style={{ position: "relative" }}>
                <div className="Settings_Drop_Con" onClick={() => onOpenLang()}>
                  {editCategory || "Select Event Category"}
                  <MdKeyboardArrowDown
                    className={close ? "Arrow_Down Arrow_Up" : "Arrow_Down"}
                    size={24}
                    color={"#8a8a8a"}
                  />
                </div>
                <div
                  className={
                    close
                      ? "Settings_Country_Modal Width__Options Settings_Country_Modal_Open"
                      : "Settings_Country_Modal Width__Options"
                  }
                >
                  <div className="Settings_Country_Modal_Con">
                    {data?.getCats?.map((item, index) => {
                      return (
                        <p
                          key={index}
                          style={{ marginTop: index === 0 ? 3 : null }}
                          onClick={() => onLangClick(item, index)}
                        >
                          {item?.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
            <p>Price</p>
            <input
              type="text"
              placeholder="Enter Food price"
              value={editPrice || ""}
              onChange={(e) => setEditPrice(e.target.value)}
            />
            <p>Image URL</p>
            <input
              type="text"
              placeholder="Enter  Image URl"
              value={editImage || ""}
              onChange={(e) => setEditImage(e.target.value)}
            />
            <p>Choose Veg or Non-Veg</p>
            <div className="Radio___btn">
              <span style={{ display: "flex" }}>
                <input
                  type="radio"
                  style={{ width: "auto" }}
                  checked={editisVeg === "veg"}
                  onChange={() => setEditIsVeg("veg")}
                />
                <p>Veg</p>
              </span>
              <span style={{ display: "flex" }}>
                <input
                  type="radio"
                  style={{ width: "auto" }}
                  checked={editisVeg === "nonveg"}
                  onChange={() => setEditIsVeg("nonveg")}
                />
                <p>Non-Veg</p>
              </span>
            </div>
            <p>Description</p>
            <input
              type="text"
              placeholder="Enter Food Description"
              value={editDescription || ""}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="Food__Btn_" onClick={Updatefoods}>
                Update Food
              </button>
            </div>
            {/* closebtn */}
            <MdClose
              className="Close__Icon"
              size={18}
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
      )}
    </>
  );
};
//Deliveryperson
const Deliveryperson = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState("");
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState();
  //
  const { data } = useQuery(GET_ALL_PERSON);
  console.log(data);
  const [addDeliveryperson] = useMutation(ADD_DELIVERY_PERSON, {
    refetchQueries: [{ query: GET_ALL_PERSON }],
  });
  const [updateDeliveryperson] = useMutation(DELETE__DELIVERY_PERSON, {
    refetchQueries: [{ query: GET_ALL_PERSON }],
  });
  //
  useEffect(() => {
    setErr("");
  }, [name, phone, img]);
  //number regex
  const numberregex = /^\d{10}$/;
  const Addperson = async (e) => {
    e.preventDefault();
    if (name === "") {
      setErr("Enter the name");
    } else if (phone === "") {
      setErr("Enter the phone");
    } else if (img === "") {
      setErr("Enter the image");
    } else if (!numberregex.test(phone)) {
      setErr("Enter valid Phone Number");
    } else {
      try {
        await addDeliveryperson({
          variables: {
            delivery: {
              name: name,
              phone: phone,
              image: img,
            },
          },
        });
        setName("");
        setPhone("");
        setImg("");
        setOpen(false);
      } catch (error) {
        console.log(error);
        setErr(error?.message);
      }
    }
  };
  //
  const DeletePerson = async (id) => {
    try {
      await updateDeliveryperson({ variables: { id: id } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="Addcat_Start">
        <div className="AddFoodHead">
          <h1>Delivery Person List</h1>
          <span onClick={() => setOpen("New")}>Add Delivery Person</span>
        </div>
        <div className="Food_Card">
          {data?.getAllPerson?.map((menu, i) => {
            return (
              <div key={i} className="PersonCard__Box">
                <div className="Image__PersonBox">
                  <img
                    src={menu?.image}
                    alt="Food image"
                    className="foodImage"
                  />
                </div>
                <div className="personContent__Box">
                  <h4> {menu?.name}</h4>
                  <p>{menu?.phone}</p>
                  <button onClick={() => DeletePerson(menu?._id)}>
                    REMOVE
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {open === "New" && (
        <div className="Background">
          <div className="Grid__1 Login_Container">
            {err && <p style={{ color: "#ff0000" }}>{err}</p>}
            <p>Name</p>
            <input
              type="text"
              placeholder="Enter Food name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Phone</p>
            <input
              type="text"
              placeholder="Enter Food phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p>Image URL</p>
            <input
              type="text"
              placeholder="Enter  Image URl"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="Food__Btn_" onClick={Addperson}>
                Add Delivery Person
              </button>
            </div>
            {/* closebtn */}
            <MdClose
              className="Close__Icon"
              size={18}
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
      )}
    </>
  );
};
