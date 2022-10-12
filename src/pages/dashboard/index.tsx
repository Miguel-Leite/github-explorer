import React, {
  FormEvent,
  useState,
  useEffect
} from "react";
import { FiChevronRight } from 'react-icons/fi';
import { Link } from "react-router-dom";

import { IRepository } from "../../@types/IRepository";

import logoImg from '../../assets/logo.svg';
import { api } from "../../services/api";

import { Error, Form, Repositories, Title } from "./styles";


const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<IRepository[]>(()=> {
    const storagedRepositories = localStorage.getItem("@GithubExplorer:repositories");
    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories',JSON.stringify(repositories));
  },[repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!newRepo) {
      setInputError("Digite o autor/nome do repositório.");
      return;
    }
    try {
      const { data } = await api.get(`repos/${newRepo}`)
      const repository = data;
      setRepositories([...repositories, repository])
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError("Erro na busca por esse repositório.")
    }

  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios do Gitbub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository} >
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositótio" />
        <button type="submit">Pesquisar</button>
      </Form>

      { inputError && <Error>{inputError}</Error> }

      <Repositories>
        {repositories.map(repository => (
          <Link to={`/repositories/${repository.full_name}`} key={repository.full_name}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard;
