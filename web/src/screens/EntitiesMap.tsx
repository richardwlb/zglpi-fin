import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import api from "../services/api";

interface Entities {
    id: number;
    name: string;
    hour_value: number;
}

const EntitiesMap: React.FC = () => {

    const [entities, setEntities] = useState<Entities[]>([]);

    useEffect(() => {
        api.get("/entities").then(({ data }) => {
            setEntities(data);
        });
      }, []);

    return(
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Valor Hora</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
        {entities.map( (entitie) => {

            if(entitie.id == 0){
                return;
            }

            return (
                <tr key={entitie.id}>
                    <th scope="row">{entitie.id}</th>
                    <td><Link to={`/clientes/${entitie.id}`}>{entitie.name}</Link></td>
                    <td> { `R$ ${entitie.hour_value}` }</td>
                </tr>
            );
        })}
                </tbody>
            </table>
        </div>
    );

};

export default EntitiesMap;