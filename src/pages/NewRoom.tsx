
import { Link } from 'react-router-dom'
import '../styles/auth.scss';


import illustrationsImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';


import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';


export function NewRoom() {
  const { user } = useAuth();
  
  return  (
    <div id="page-auth" >
      <aside>
        <img src={illustrationsImg} alt="Illustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
        <main>
          <div className="main-content">
            <img src={logoImg} alt="Letmeask" />
            <p className="p-room">Bem Vindo</p>
            <h1 className="user-name">{user?.name}</h1>
            <h2 className="room">Criar uma nova sala</h2>
            
            <form>
              <input 
              type="text"
              placeholder="Nome da sala" 
              />
              <Button type="submit">
                Criar sala
              </Button>
         


            </form>
            <p className="room-entry">Quer entrar numa sala existente? <Link to="/">clique aqui</Link> </p>
          </div>
        </main>
   
    </div>

  )
}