import React, { useContext } from "react";
import DataContext from "./context/DataContext";
import Feed from "./Feed";
const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext);
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading Posts...</p>}
      {fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!isLoading && !fetchError && searchResults.length ? (
        <Feed posts={searchResults} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts to display.</p>
      )}
    </main>
  );
};

export default Home;
