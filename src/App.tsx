import { useState } from 'react'
import UserModal from './components/UI/UserModal';
import Root from './routes/Root'

function App() {
  
  const [isModalOpen,setIsModalOpen] = useState(false);
  const modalHandler = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <>
      {isModalOpen &&
       <UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalHandler={modalHandler} />
    }
    <Root modalHandler={modalHandler} />
    </>
  )
}

export default App
