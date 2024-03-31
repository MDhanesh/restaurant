import "./style.css";
import { PiHamburger } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbBrandGoogleHome } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LOGIN } from "../graphql/query";
import { useEffect, useState } from "react";

export default function Navbar({ open, setOpen, val }) {
  const navigate = useNavigate();
  const Home = () => {
    navigate("/");
  };
  //
  const user = localStorage.getItem("UserToken");
  const { data } = useQuery(GET_LOGIN, {
    variables: {
      uuid: user,
    },
  });
  //
  const [isMouseOver, setIsMouseOver] = useState(false);
  const Logout = () => {
    localStorage.removeItem("UserToken");
    window.location.reload();
  };
  const Orderpage = () => {
    navigate("/order-list");
  };
  return (
    <>
      <div className="Navbar">
        <div className="Navbar_Container">
          <h1 onClick={Home}>PIZZA HUT</h1>
          <div className="Navbar__links">
            {data?.getlogin?.role === "ADMIN" && (
              <Link to={"/dashboard"}>
                <TbBrandGoogleHome size={20} />
                Dashboard
              </Link>
            )}
            {user !== null ? (
              <div
                onMouseEnter={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
                style={{ position: "relative" }}
              >
                <Link>
                  <MdOutlineAccountCircle size={20} />
                  {data?.getlogin?.name}
                </Link>
                {isMouseOver && (
                  <div className="Content_BoxLogout">
                    <div className="LogoutHover" onClick={Orderpage}>
                      My Order
                    </div>
                    <div className="LogoutHover" onClick={Logout}>
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link onClick={() => setOpen(true)}>
                  <MdOutlineAccountCircle size={20} />
                  Login
                </Link>
              </>
            )}
            <Link to={"/my-order"} style={{ position: "relative" }}>
              <PiHamburger size={20} /> Cart
              <p className="Order__Count">{val}</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
