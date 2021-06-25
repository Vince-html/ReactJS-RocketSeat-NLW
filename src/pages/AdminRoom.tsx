import logoImg from '../assets/images/logo.svg';

import { useHistory, useParams } from 'react-router-dom';

import { Button }from '../components/Button'
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'


import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg'

import ModalExcludeQuestion, { ModalHandle } from '../components/modalexclude/ModalexcludeQuestion';
import { useCallback, useRef, useState } from 'react';


type RoomParams = {
  id: string;
}



export function AdminRoom() {
  
  //const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title , questions} = useRoom(roomId )
  const modalRef = useRef<ModalHandle>(null);
  

  const handleOpenModal = useCallback(() => {
    modalRef.current?.handleOpenModal();
  },[])

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }


  // const questionId = questions.map();
  // console.log(questionId);
 
  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
     await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

    }

  }


  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }



  
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });

  }

  
  
  
  
  return (
   
    <div className="page-room">
   <ModalExcludeQuestion ref={modalRef}/>
          
        <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
          <RoomCode code={roomId} />     
          <Button isOutlined 
          onClick={handleEndRoom}> Encerrar Sala</Button>  
          </div>
        </div>
      </header>


      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>
      
 
        <div className="question-list">
          {questions.map(question => {
            return (
            <Question 
            key={question.id}
            content={question.content}
            author={question.author}
            isHighlighted={question.isHighlighted}
            isAnswered={question.isAnswered}
            >
             {!question.isAnswered && (
               <>
                  <button
                  type="button"
                  onClick={() => handleCheckQuestionAsAnswered(question.id) }
                  > 
                  <img src={checkImg} alt="Remover pergunta" />
                  </button>
                  <button
                  type="button"
                  onClick={() => handleHighlightQuestion(question.id) }
                  > 
                  <img src={answerImg} alt="Remover pergunta" />
                  </button>
                  </>
             )}
                <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id) }
                > 
                <img src={deleteImg} alt="Remover pergunta" />
                </button>
            </Question>
            
              );
          })}
        </div> 
        
      </main>
    </div>
  );
}



            // 
            //<button type="button" onClick={handleOpenModal} 

            //     key = {question.id}> 
            //   </button> 