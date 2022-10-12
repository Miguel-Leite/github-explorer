import React, { useEffect, useState } from "react"
import { Link, useRouteMatch } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { IRepositoryParams } from "../../@types/IRepositoryParams";
import logoImg from '../../assets/logo.svg';
import { api } from "../../services/api";

import { Header, Issues, RepositoryInfo } from "./styles";
import { IRepository } from "../../@types/IRepository";
import { IIssue } from "../../@types/IIssue";

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<IRepository | null>(null);
  const [issues, setIssues] = useState<IIssue[]>([]);

  const { params } = useRouteMatch<IRepositoryParams>();

  useEffect(()=> {
    api.get(`repos/${params.repository}/`).then(response => {
      setRepository(response.data)
    })

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data)
    })

    // async function loadData(): Promise<void> {

    //   const [repository, issues] = await Promise.all([
    //     api.get(`repos/${params.repository}/`),
    //     api.get(`repos/${params.repository}/issues`)
    //   ]);
    // }

    // loadData()
  },[params.repository])

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />

        <Link to='/'>
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        { issues.map(issue => (
          <a key={issue.id} href={issue.html_url} target="_blank">
            <div>
              <strong>{issue.title}</strong>
              <p>{ issue.user.login }</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        )) }
      </Issues>
    </>
  );
}

export default Repository;
