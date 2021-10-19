import React, { useEffect, useState } from 'react';

// utils
import { Fake } from '../../utils/Fake';
import { UsersRepository } from '../../utils/PouchDB/UsersRepository';

// styles
import './styles.scss';

// types
import { Gender, UserSchema } from '../../interfaces/user';

const Home: React.FC = () => {
  const [users, setUsers] = useState<UserSchema[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await UsersRepository.list();

      setUsers([...response]);
    }

    loadUsers();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const user = Fake.user();

    try {
      const response = await UsersRepository.create(user);
      const loadUser = await UsersRepository.findById(response.id);
      return setUsers([...users, loadUser]);
    } catch (error) {
      return console.log(error);
    }
  }

  async function listByGender(gender: Gender) {
    try {
      const response = await UsersRepository.listByGender(gender);
      
      console.log(response);
    } catch (error) {
      return console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Cadastro de usuários</h1>

        <button type="button" onClick={handleSubmit}>
          Gerar novo usuários
        </button>

        <div className="button-container">
          <button type="button">todos</button>
          <button type="button" onClick={() => listByGender('male')}>
            homens
          </button>
          <button type="button" onClick={() => listByGender('female')}>
            mulheres
          </button>
        </div>

        <ul>
          {users.map((user) => (
            <div key={user._id}>
              <li>
                <span>ID:</span> {user._id}
              </li>
              <li>
                <span>Rev:</span> {user._rev}
              </li>
              <li>
                <span>Name:</span> {user.user.name}
              </li>
              <li>
                <span>Email:</span> {user.user.email}
              </li>
              <li>
                <span>Gênero:</span> {user.user.gender}
              </li>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Home };
