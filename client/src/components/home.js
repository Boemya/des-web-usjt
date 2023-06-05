import React, { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Home({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3003/posts/list');
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <header></header>
      {user && (
        <Link to="/create-post" className="create-post-button">
          Criar Post
        </Link>
      )}
      <section>
        {posts.map((post) => (
          <div className="postagem" key={post.id}>
            <img src={post.albumPhoto} alt={`Imagem da música ${post.id}`} />
            <div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>- {post.user}</p>
              <div className="likes">
                <FontAwesomeIcon icon={faHeart} />
                <span>{post.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
      <footer>&copy; 2023 FINDIE. Todos os direitos reservados.</footer>
    </div>
  );
}

export default Home;
