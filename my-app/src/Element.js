import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Lista from './Lista';
import MenuOperaciones from "./MenuOperaciones";
import TimeInfo from "./TimeInfo";

class Element extends React.Component {
    // se espera que accion tenga :
    // id
    // dato
    // operacion
    constructor(props) {
        super(props);
        this.state = {
            action: (id, dato, operation) => props.onClick(id, dato, operation),
            operationsButton: props.value[0],
            inputOperation: props.value[1],
            showMenu:false,
            element:props.element,
            showTime:false
        }
    }
    showMenu(){
        this.setState({showMenu:!this.state.showMenu})
    }
    renderMenu(){
        
        var element=this.props.element;
        var value = [this.props.value[0],this.props.value[1] ]
        //console.log(value);
        //alert("");
        if(this.state.showMenu){
            return(<MenuOperaciones value={value} def={element["contenido"]} onClick={this.state.action} id={element.id}  ></MenuOperaciones>)
            
        }else{
            return(<div></div>)
        }
    }
    renderLista(){
        var element=this.props.element;
        //console.log("ele",element);
        if(element["mostrar"]){
            
            var value=[this.props.value[0],this.props.value[1]]
            return (<div>
                    
                    <Lista value={value}  
                           lista={element.lista}
                           onClick={(id,dato,operation)=>this.state.action(id,dato,operation)} >
                           </Lista>
                    
                     </div>      
                    )
        }
    }
    renderTime(){
        var element=this.props.element;
        if(this.state.showTime)
            return(<TimeInfo element={element}></TimeInfo>)
        else
            return(<div></div>)
    }


    render() {
        var element=this.props.element;
        //duracion=new Date(duracion);
        //duracion=" "+duracion.getHours()+":"+duracion.getMinutes()+":"+duracion.getSeconds();
        return (
            <ul className="Element" >
                <input className="checkInputMeta" defaultChecked={element["check"]}    type="checkbox" onClick={() => this.state.action(element.id, element["check"], "check")} />
                <button className="meta" onClick={() => this.state.action(element.id, element.contenido, "subLista")} >
                    {element["contenido"]+(element["lista"].length>0?"* "+element["lista"].length:"")}
                </button>
                
                <button className="opciones" onClick={()=>this.showMenu()} >opciones</button>
                <button className="opciones" onClick={()=>{ this.setState({showTime:!this.state.showTime })  }} >showTime</button>
                {this.renderMenu()}       
                {this.renderTime()}
                {this.renderLista()}
            </ul>
        )
    }
}
export default Element;

