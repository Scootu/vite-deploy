import { Fragment } from "react";
import NavBar from "./component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./component/Footer";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Outlet />
      <Footer />
    </Fragment>
  );
}

export default App;
