import React from 'react';
//import logo from './logo.svg';
import './App.css';

class TimeInfo extends React.Component{
    
    render(){
        var element=this.props.element;
        var dejada=element["fechaInicio"];
        var n= new Date();
        var fecha = n.getFullYear()+"/"+n.getMonth()+"/"+n.getDay()+" "+n.getHours()+":"+n.getMinutes()+":"+n.getSeconds()
        var terminada=(element["fechaFin"]!=="?")?element["fechaFin"]:fecha;
        var duracion=new Date(terminada).getTime()-new Date(dejada).getTime();

        var msec = duracion;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;

        duracion=(hh + ":" + mm + ":" + ss);



        return(
        <ul className="time">
            <div>{" dejada :"+dejada}</div>
            <div>{" terminada : "+element["fechaFin"]}</div>
            <div>{" tiempo " + duracion}</div>
        </ul>)
    }
}
export default TimeInfo ;