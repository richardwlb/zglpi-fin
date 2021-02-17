import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";

import api from "../services/api";

// interface Entitie {
//     id: number;
//     name: string;
//     email: string;
//     address: string;
//     website: string;
//     hour_value: string;
// }

interface EntitieParams {
    id: string;
  }

const EntitieDetails: React.FC = () => {
    const history = useHistory();

    const params = useParams<EntitieParams>();
    const[id, setId] = useState();
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    // const[address, setAdress] = useState();
    const[website, setWebsite] = useState('');
    const[hour_value, setHourValue] = useState('0');


    useEffect( () => {
        api.get(`/entities/${params.id}`).then( ({data}) => {
            setId(data.id);
            setName(data.name);
            setEmail(data.email);
            // setAdress(data.address);
            setWebsite(data.website);
            setHourValue(data.hour_value);
        })
    }, [params.id]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        api.put(`/entities/${params.id}`, {hour_value}).then( () => {
           history.push('/clientes');
        });
    };

    if(!id){
        return( <h1>Carregando...</h1> );
    }

    return(
        <div >
            <h1>Alterar Cliente</h1>
            <div>
                <form onSubmit={handleSubmit} >
                    <label>Nome</label>
                    <input 
                        className="form-control input-text" 
                        disabled defaultValue={name} 
                    />
                    <label>E-mail</label>
                    <input 
                        className="form-control input-text" 
                        defaultValue={email} 
                        // onChange={ e => setEmail(e.target.value) }
                        disabled
                    />
                    <label>Site</label>
                    <input 
                        className="form-control input-text" 
                        defaultValue={website} 
                        // onChange={ e => setWebsite(e.target.value) }
                        disabled
                    />
                    <label>Valor/hora</label>
                    <input 
                        className="form-control input-valor" 
                        value={hour_value} 
                        onChange={ e => setHourValue(e.target.value) }
                    />
                    <div>
                        <Link to="/clientes" className="btn btn-primary button" >Voltar</Link>
                        <button className="btn btn-secondary" >Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EntitieDetails;