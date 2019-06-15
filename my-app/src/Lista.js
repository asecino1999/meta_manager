import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Element from './Element';

class Lista extends React.Component{
    constructor(props){
        super(props)
        this.state={
            action: (id, dato, operation) => props.onClick(id, dato, operation),
            operationsButton: props.value[0],
            inputOperation: props.value[1],
            lista: props.lista
        }
        //console.log("lsita lista const",this.props.value[5])
    }




    render(){

        var lista = this.props.lista;    
        //console.log(this.props);
        if(typeof(lista)==="undefined")return(<div></div>)
        return(
            <div>
                {
                    lista.map((element)=>{
                        var value = [
                            this.props.value[0],
                            this.props.value[1]
                        ]
                        console.log("lsita val s",value);
                        console.log("lsita val s",element["contenido"]);
                        return (
                            <Element key={element["contenido"]+element["id"]}
                                     value={value} 
                                     onClick={(id,dato,operation)=>this.state.action(id,dato,operation)} 
                                     element={element} ></Element>
                        )
                    })
                }
            </div>
        );
    }
}
export default Lista;

