import { useNavigate, useParams } from 'react-router-dom';
import api from '../src/services/api'; // AxiosInstance configurado
import './css/home.css';
import './css/createPost.css';
import { useState, useEffect } from 'react';

function EditPost() {
  const { id } = useParams(); // Obtém o ID do post pela URL
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Carrega os dados do post ao montar o componente
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        const { title, content } = response.data as { title: string; content: string };
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error('Erro ao carregar o post:', error);
        alert('Erro ao carregar o post. Tente novamente mais tarde.');
        navigate('/administracao'); // Redireciona de volta para administração em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!title || !content) {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }

    try {
      await api.put(`/posts/${id}`, { title, content });
      alert('Post atualizado com sucesso!');
      navigate('/administracao'); // Redireciona para a página de administração
    } catch (error) {
      console.error('Erro ao salvar o post:', error);
      alert('Erro ao salvar o post. Tente novamente mais tarde.');
    }
  };

  const handleBack = () => {
    navigate('/admin'); // Redireciona para a página de administração
  };

  if (loading) {
    return <p>Carregando post...</p>;
  }

  return (
    <div className="app-container">
      <button className="back-button" onClick={handleBack}>
        Voltar
      </button>
      <h2>Edição de Post</h2>
      <div
        className="card"
        style={{ backgroundColor: '#2196f3', padding: '20px', borderRadius: '8px' }}
      >
        <label style={{ color: 'white', display: 'block', marginBottom: '10px' }}>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </label>
        <label style={{ color: 'white', display: 'block', marginBottom: '10px' }}>
          Conteúdo:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite o conteúdo"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          ></textarea>
        </label>
        <button
          onClick={handleSave}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}

export default EditPost;