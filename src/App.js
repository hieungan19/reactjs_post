import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Nav from "./Nav";
import NewPost from "./NewPost";
import Header from "./Header";
import Footer from "./Footer";
import Missing from "./Missing";

function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/About" element={<About />} />
        <Route path="/NewPost" element={<NewPost />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
