import { useNavigate } from 'react-router-dom';
import api from '../src/services/api';
import './css/posts.css';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string | null;
  created_by_name: string;
  updated_by_name: string | null;
}

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate('/home');
  };

  // Função para buscar os posts da API
  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data as Post[]);
    } catch (err) {
      setError('Erro ao carregar os posts. Tente novamente mais tarde.');
    }
  };

  // useEffect para carregar os posts quando o componente for montado
  useEffect(() => {
    fetchPosts();
  }, []);

  // Filtrar posts com base na busca
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="app-container">
        <button className="back-button" onClick={handleBack}>
          Voltar
        </button>
        <h2>Lista de Posts</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Buscar posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="cardPosts"
            style={{
              backgroundColor: '#2196f3',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '10px',
            }}
          >
            <h3 style={{ color: 'white', margin: '0 0 10px' }}>{post.title}</h3>
            <p style={{ color: 'white', margin: '0 0 5px' }}>{post.content}</p>
            <p style={{ color: 'white', margin: '0' }}>Autor: {post.created_by_name}</p>
            <p style={{ color: 'white', margin: '0' }}>Criado em: {new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Posts;