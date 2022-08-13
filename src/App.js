import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import api from "./api/posts";
import { DataProvider } from "./context/DataContext";
import EditPost from "./EditPost";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import useAxiosFetch from "./hooks/useAxiosFetch";
import useWindowSize from "./hooks/useWindowSize";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3000/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredRes = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredRes);
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  const navigate = useNavigate();

  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const updatePost = { id, title: editTitle, datetime, body: editBody };

    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate("/");
  };
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <DataProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />

          <Route path="*" element={<Missing />} />
        </Routes>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
