import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [albumPhoto, setAlbumPhoto] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3003/posts/create', {
        title,
        description,
        albumPhoto,
      });
      console.log(response.data); // Exemplo de tratamento de resposta
      // Lógica adicional após a criação do post
    } catch (error) {
      console.error(error.response.data); // Exemplo de tratamento de erro
      // Lógica adicional para tratamento de erro
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Album Photo"
          value={albumPhoto}
          onChange={(e) => setAlbumPhoto(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
