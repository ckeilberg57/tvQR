import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
const Layout = () => {
  return (
 <div className="App">
      <header className="App-header">
      <div><h1 className="appTitle">Pex QR Generator</h1></div>
      <Outlet />
      <Footer />
      </header>
    </div>
  
  )
};

export default Layout;