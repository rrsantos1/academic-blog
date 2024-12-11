import { useNavigate } from 'react-router-dom';
import api from '../src/services/api'; // AxiosInstance configurado
import './css/posts.css';
import { useState, useEffect } from 'react';

function Administracao() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  interface Post {
    id: number;
    title: string;
    content: string;
    created_by_name: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os posts
  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts/admin');
      setPosts(response.data as Post[]);
    } catch (error) {
      console.error('Erro ao buscar os posts:', error);
      alert('Erro ao carregar os posts. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (postId: number) => {
    navigate(`/editPost/${postId}`);
  };

  const handleDelete = async (postId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await api.delete(`/posts/${postId}`);
        setPosts(posts.filter((post) => post.id !== postId));
        alert('Post excluído com sucesso.');
      } catch (error) {
        console.error('Erro ao excluir o post:', error);
        alert('Erro ao excluir o post. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="app-container">
      <button className="back-button" onClick={() => navigate('/home')}>
        Voltar
      </button>
      <h2>Administração de Posts</h2>
      <input
        type="text"
        placeholder="Buscar posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      {loading ? (
        <p>Carregando posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        filteredPosts.map((post) => (
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
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => handleEdit(post.id)}
                style={{
                  marginRight: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#00c853',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Administracao;