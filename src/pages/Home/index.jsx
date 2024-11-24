import './style.css'
import { FaRegTrashAlt } from "react-icons/fa";

function Home() {

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input name='nome' type='text'/>
        <input name='idade' type='number'/>
        <input name='email' type='email'/>
        <button type='button'>Cadastrar</button>
      </form>
      <div>
      <div>
        <p>Nome:</p>
        <p>Idade:</p>
        <p>Email:</p>
      </div>
      <button><FaRegTrashAlt /></button>
      </div>
    </div>
  )
}

export default Home
