import { useNavigate } from 'react-router-dom';
import api from '../src/services/api'; 
import './css/home.css';
import './css/createPost.css';
import { useState } from 'react';

function CreatePost() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/home');
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !content) {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }

    const newPost = {
      title,
      content,
    };

    try {
      setLoading(true);
      const response = await api.post('/posts', newPost);
      alert('Post criado com sucesso!');
      console.log('Resposta da API:', response.data);
      navigate('/posts'); // Redireciona para a listagem de posts após salvar
    } catch (error) {
      console.error('Erro ao salvar o post:', error);
      alert('Erro ao salvar o post. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <button className="back-button" onClick={handleBack}>
        Voltar
      </button>
      <h2>Criação de Post</h2>
      <div className="card" style={{ backgroundColor: '#2196f3', padding: '20px', borderRadius: '8px' }}>
        <label style={{ color: 'white', display: 'block', marginBottom: '10px' }}>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título"
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ color: 'white', display: 'block', marginBottom: '10px' }}>
          Conteúdo:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite o conteúdo"
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          ></textarea>
        </label>
        <button
          onClick={handleSave}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: loading ? '#grey' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;