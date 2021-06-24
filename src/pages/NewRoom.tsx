
import { Link, useHistory } from 'react-router-dom'
import '../styles/auth.scss';
import { FormEvent, useState } from 'react'


import illustrationsImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';


import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';



export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }


    const roomRef = database.ref('rooms');


    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,

    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }
  
  return  (
    <div id="page-auth" >
      <aside>
        <img src={illustrationsImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
        <main>
          <div className="main-content">
            <img src={logoImg} alt="Letmeask" />
            <p className="p-room">Bem Vindo</p>
            <h1 className="user-name">{user?.name}</h1>
            <h2 className="room">Criar uma nova sala</h2>
            
            <form onSubmit={handleCreateRoom}>
              <input 
              type="text"
              placeholder="Nome da sala" 
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
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