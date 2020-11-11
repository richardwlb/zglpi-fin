import React, { useState, useEffect } from 'react';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import api from "../services/api";

interface Entities {
    id: number;
    name: string;
    hour_value: number;
}

interface Tickets {
    id: number;
    entities_id: number;
    Client: string;
    Ticket: string;
    date: string;
    closedate: string;
    solvedate: string;
    hour_value: number;
    total_time_seconds: number;
    total_time_hour: number;
    cost: number;
}

interface Totals {
    total_time_seconds: number;
    total_time_hour: number;
    cost: number;
}

export default function HoursValue(){

    const [entities, setEntities] = useState<Entities[]>([]);
    const [id, setId] = useState('');
    const [dateIni, setDateIni] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    const [tickets, setTickets] = useState<Tickets[]>([]);
    const [totals, setTotals] = useState<Totals>();

    useEffect( () => {
        api.get("/entities").then(({ data }) => {
            setEntities(data);
        });
    }, []);

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        api.get(`/hours/${id}/${dateIni}/${dateEnd}`).then(({data}) => {
            setTickets(data.hoursValue);
            setTotals(data.hoursValueTotal);
        });
    }

    function secondsToDhms(seconds: number) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        // var s = Math.floor(seconds % 60);
        
        var dDisplay = d > 0 ? d + (d == 1 ? " dia " : " dias, ") : "";
        var hDisplay = h > 0 ? h + "h " : "";
        var mDisplay = m > 0 ? m + "m " : "";
        // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay;
    }

    return(
        <div>
            <h2>Relatório Horas</h2>
            <div>
            
                <form onSubmit={handleSubmit}>
                <div className="form-group row form-group-sm">

                    <label className="col-1 col-form-label-sm ">Cliente</label>
                    <div>
                        <select 
                            className="form-control-sm  input-text col-15" 
                            id="idEntitie"
                            value={id} onChange={ e => setId(e.target.value) }
                        >
                            {entities.map( (entitie) => {
                                return(
                                    <option key={entitie.id} value={entitie.id}>{`${entitie.id} - ${entitie.name}`}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-1 col-form-label-sm " >Data</label>
                    <div >
                    <div className="form-inline" >
                        <input 
                            className="form-control-sm col-5" 
                            type="date"
                            onChange={ e => setDateIni(e.target.value) }
                        />
                        -
                        <input 
                            className="form-control-sm  col-5" 
                            type="date"
                            onChange={ e => setDateEnd(e.target.value) }
                        />
                    </div>
                    </div>
                </div>
                        {/* <Link to="/clientes" className="btn btn-secondary button" >Voltar</Link> */}
                        <button className="btn  btn-primary" >Executar</button>
                </form>
            </div>

            <hr/>

            <table className="table table-striped table-sm rel-text col-5">
                    <thead className="thead-dark">
                        <tr>
                            <th >Total horas</th>
                            <th >Total custo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                {  totals ? secondsToDhms(totals?.total_time_seconds) : "00:00"}
                            </th>
                            <td >
                                {  totals ? `R$ ${totals?.cost.toFixed(2).replace(".",",")}` : "R$ 0,00" }
                            </td>
                        </tr>
                    </tbody>
                </table>


                <table className="table table-striped table-sm rel-text">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Chamado</th>
                        <th scope="col">Data criação</th>
                        <th scope="col">Data fechamento</th>
                        <th scope="col">Horas consumidas</th>
                        <th scope="col">Custo total</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {tickets.map( (ticket) => {

                        if(ticket.id === 0){
                            return;
                        }

                        return (
                            <tr key={ticket.id}>
                                <th scope="row">{  `${ticket.id} - ${ticket.Ticket}` }</th>
                                <td>{moment(ticket.date).format('DD/MM/YYYY HH:mm')}</td>
                                <td>{ moment(ticket.closedate).format('DD/MM/YYYY HH:mm') }</td>
                                <td>{secondsToDhms(ticket.total_time_seconds)}</td>
                                <td> { `R$ ${ticket.cost.toFixed(2).replace(".",",")}` }</td>
                            </tr>
                        );
                    })}
                    </tbody>
            </table>

                    </div>              


            
    );

}