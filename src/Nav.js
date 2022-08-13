import React from "react";
import { Link } from "react-router-dom";
import DataContext from "./context/DataContext";
import { useContext } from "react";

const Nav = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          {" "}
          <Link to="/">Home</Link>
        </li>
        <li>
          {" "}
          <Link to="/About">About</Link>
        </li>
        <li>
          {" "}
          <Link to="/post">New Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
