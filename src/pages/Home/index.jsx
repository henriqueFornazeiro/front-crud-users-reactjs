import { useEffect, useState, useRef } from 'react';
import './style.css'
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../services/api"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(showToast = true) {
    try {
      console.log(showToast)
      const responseApi = await api.get('/usuarios');
      setUsers(responseApi.data);
      if (showToast) { toast.success('Busca de usuários concluída!'); }

    } catch (error) {

      toast.error('Erro ao buscar usuários!');
      console.error(error);

    }
  }

  async function createUsers() {
    const name = inputName.current.value;
    const age = inputAge.current.value;
    const email = inputEmail.current.value;

    // Validações dos campos
    if (!name || !age || !email) {
      toast.warning('Por favor, preencha todos os campos!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning('Por favor, insira um e-mail válido!');
      return;
    }

    const body = { name, age, email };

    try {
      await api.post('/usuarios', body);
      toast.success('Usuário cadastrado com sucesso!');
      getUsers(false)
      inputName.current.value = '';
      inputAge.current.value = '';
      inputEmail.current.value = '';
    } catch (error) {
      if (error.status === 409) {
        toast.error(`Não foi possível cadastrar o usuário: ${error.response.data.message}`);
      } else {
        toast.error(`Erro ao cadastrar o usuário! `);
      }

      console.error(error);
    }
  }

  async function deleteUser(idUser) {
    try {

      await api.delete(`/usuarios/${idUser}`);
      getUsers(false)

      toast.success('Usuário removido com sucesso!');

    } catch (error) {

      toast.error('Erro ao deletar usuário!');
      console.error(error);

    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <ToastContainer />
      <form>
        <h1>Cadastro de usuários</h1>
        <input name='nome' type='text' placeholder='Nome' ref={inputName} />
        <input name='idade' type='number' placeholder='Idade' ref={inputAge} />
        <input name='email' type='email' placeholder='E-mail' ref={inputEmail} />
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
            <button onClick={() => deleteUser(usuario.id)}><FaRegTrashAlt color='red' size={20} /></button>
          </div>
        )
        )
      }

    </div>
  )
}

export default Home
