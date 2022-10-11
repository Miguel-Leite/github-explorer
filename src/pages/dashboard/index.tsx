import React, {
  FormEvent,
  useState
} from "react";
import { FiChevronRight } from 'react-icons/fi';

import { IRepository } from "../../@types/IRepository";

import logoImg from '../../assets/logo.svg';
import { api } from "../../services/api";

import { Form, Repositories, Title } from "./styles";


const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<IRepository[]>([]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const { data } = await api.get(`repos/${newRepo}`)
    const repository = data;
    setRepositories([...repositories, repository])
    setNewRepo('')
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios do Gitbub</Title>

      <Form onSubmit={handleAddRepository} >
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositótio" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map(repository => (
          <a href="#" key={repository.full_name}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard;
