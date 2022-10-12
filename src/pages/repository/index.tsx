import React from "react"
import { useRouteMatch } from "react-router-dom";
import { IRepositoryParams } from "../../@types/IRepositoryParams";

const Repository: React.FC = () => {
  const { params } = useRouteMatch<IRepositoryParams>();
  return <h1>Repositorio: {params.repository}</h1>;
}

export default Repository;
