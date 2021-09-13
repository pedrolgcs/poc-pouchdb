import React, { useEffect, useState } from 'react';

// utils
import { Fake } from '../../utils/Fake';
import { PouchRepository } from '../../utils/PouchRepository';

// styles
import './styles.scss';

// types
import { UserSchema } from '../../interfaces/user';

const Home: React.FC = () => {
  const [users, setUsers] = useState<UserSchema[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await PouchRepository.list();
      setUsers([...response]);
    }

    loadUsers();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // generate fake user
    const user = Fake.user();

    try {
      const response = await PouchRepository.create(user);
      const loadData = await PouchRepository.findById(response.id);

      return setUsers([...users, loadData]);
    } catch (error) {
      return console.log(error);
    }
  }

  async function handleUpdate(user: UserSchema) {
    try {
      await PouchRepository.update(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Cadastro de usuários</h1>
        <button type="button" onClick={handleSubmit}>
          Gerar novo usuários
        </button>
        <h2>Lista de usuários</h2>
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
                <span>Situation:</span> {user.situation}
              </li>
              <li>
                <span>Trocar situação: </span>
                <button type="button" onClick={() => handleUpdate(user)}>
                  Processar
                </button>
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
