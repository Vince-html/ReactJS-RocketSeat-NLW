import React, { forwardRef, useCallback, useState, useImperativeHandle } from 'react'
import { useParams } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';

import './modalexcludequestions.scss'


type RoomParams = {
  id: string;
}


export interface ModalHandle {
  handleOpenModal: () => void;
}



const ModalExcludeQuestion: React.RefForwardingComponent<ModalHandle> = ({}, ref) => {
  const [ visible, setVisible] = useState(false);
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {questions} = useRoom(roomId )


  const handleOpenModal = useCallback(() => {
    setVisible(true);
  }, []);
  
  useImperativeHandle(ref, () => {
    return{
      handleOpenModal
    };
  });

  const handleCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  if(!visible) {
    return null;
  }
  
  // function handleDeleteQuestion() {
  // if (questionId) database.ref(`rooms/${roomId}/questions/${questionId}`).remove()

    

  // }
 


  return (
    <div className="modal-exclude">
      <div className="modal-container">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <h1 className="modal-title">Excluir pergunta</h1>
          <p>Tem certeza que você deseja excluir esta pergunta?</p>
            <div className="buttons">
                <button onClick={handleCloseModal} className="cancelBtn">Cancelar</button>
                <button className="confirmBtn">Confirmar</button>
              
            </div>
      
      </div>      
    </div>
  )
}


export default forwardRef(ModalExcludeQuestion);
