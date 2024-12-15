import { useEffect, useState, useRef } from 'react';
import './style.css'
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../services/api"

function Home() {

  const [users, setUsers] = useState([])
  
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const responseApi = await api.get('/usuarios')
    setUsers(responseApi.data)
  }
  
  async function createUsers(){
    const body = {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    }
    await api.post('/usuarios', body)
  }

  useEffect(()=>{
    getUsers()
  },[])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input name='nome' type='text' placeholder='Nome' ref={inputName}/>
        <input name='idade' type='number' placeholder='Idade'ref={inputAge}/>
        <input name='email' type='email' placeholder='E-mail'ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {
        users.map(usuario => (
          <div key={usuario.id} className='userCard'>
            <div>
              <p>Nome: <span>{usuario.name}</span></p>
              <p>Idade: <span>{usuario.age}</span></p>
              <p>Email: <span>{usuario.email}</span></p>
            </div>
            <button><FaRegTrashAlt color='red' size={20}/></button>
          </div>
        )
        )
      }

    </div>
  )
}

export default Home
