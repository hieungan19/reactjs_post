import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts";

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.dateTime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              onClick={() => {
                handleDelete(post.id);
              }}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing</p>
            <p>
              <Link to="/">Visit HomePage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default NewPost;
