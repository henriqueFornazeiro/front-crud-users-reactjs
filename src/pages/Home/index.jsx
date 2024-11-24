import './style.css'
import { FaRegTrashAlt } from "react-icons/fa";

function Home() {

  const usuarios = [
    {
      id: '123423sdf332d3kl23jh4323',
      name: 'Henrique',
      age: 26,
      email: 'henrique@email.com'
    },
    {
      id: 'hfj23h4j23dfsd902d',
      name: 'Teste',
      age: 33,
      email: 'teste@email.com'
    }
  ]

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input name='nome' type='text' placeholder='Nome'/>
        <input name='idade' type='number' placeholder='Idade'/>
        <input name='email' type='email' placeholder='E-mail'/>
        <button type='button'>Cadastrar</button>
      </form>
      {
        usuarios.map(usuario => (
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
