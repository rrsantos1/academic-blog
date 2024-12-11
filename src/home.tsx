import { useNavigate } from 'react-router-dom';
import './css/home.css'

function Home() {

  const navigate = useNavigate();

  const handleCardPosts = () => {
    navigate('/posts'); 
  };

  const handleCreatePost = () => {
    navigate('/createPost'); 
  };

  const handleAdmPost = () => {
    navigate('/administracao'); 
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="app-container">
        <button className="back-button" onClick={handleBack}>
          Sair
        </button>
        <h2>Página inicial</h2>
        <div className="card" style={{ backgroundColor: '#2196f3' }} onClick={handleCardPosts}>
           Posts
        </div>
        <div className="card" style={{ backgroundColor: '#00c853' }}  onClick={handleCreatePost}>
            Criação de posts
        </div>
        <div className="card" style={{ backgroundColor: '#d50000' }} onClick={handleAdmPost}>
            Página administrativa
        </div>
      </div>
    </>
  )
}

export default Home