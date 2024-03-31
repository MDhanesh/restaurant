import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Common/Navbar";
import Main from "./Pages/Main";
import Footer from "./Common/Footer";
import Order from "./Pages/Order";
import Login from "./Auth/Login";
import { useState } from "react";
import Signup from "./Auth/Signup";
import Dashboard from "./Pages/Dashboard";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import OTP from "./Auth/OTP";
import { GET_LOGIN } from "./graphql/query";
import { useEffect } from "react";
import Forgot from "./Auth/Forgot";
import Newpassword from "./Auth/Newpassword";
import Myorder from "./Pages/Myorder";

function App() {
  const user = localStorage.getItem("UserToken");
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    headers: { Authorization: user },
  });
  return (
    <>
      <ApolloProvider client={client}>
        <Routing />
      </ApolloProvider>
    </>
  );
  function Routing() {
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [val, setVal] = useState("");
    //
    const user = localStorage.getItem("UserToken");
    const { data, error, loading } = useQuery(GET_LOGIN, {
      variables: {
        uuid: user,
      },
    });
    useEffect(() => {
      if (error?.message === "No Auth" && user) {
        localStorage.removeItem("UserToken");
        window.location.reload();
      }
    }, [data, loading, error]);

    return (
      <>
        <div>
          <Navbar open={open} setOpen={setOpen} setVal={setVal} val={val} />
          <Routes>
            <Route path="/" element={<Main setVal={setVal} />} />
            <Route
              path="/my-order"
              element={
                <Order setVal={setVal} setOpen={setOpen} Alldata={data} />
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/verify/:email"
              element={<OTP open={open} setOpen={setOpen} />}
            />
            <Route
              path="/forgot-password"
              element={<Forgot open={open} setOpen={setOpen} />}
            />
            <Route path="/order-list" element={<Myorder setVal={setVal} />} />
            <Route path="/new-password/:id" element={<Newpassword />} />
          </Routes>
          <Footer />
          <Login open={open} setOpen={setOpen} setOpens={setOpens} />
          <Signup opens={opens} setOpens={setOpens} setOpen={setOpen} />
        </div>
      </>
    );
  }
}

export default App;
