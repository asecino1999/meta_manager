import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SetText from './SetText';



class Operacion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.value,
            click: props.onClick
        }
    }
    render() {
        return (<button className="Edit" onClick={() => this.state.click()}>
            {this.state.text}
        </button>)

    }

}



class MenuOperaciones extends React.Component {
    // se espera que accion tenga :
    // id
    // dato
    // operacion

    constructor(props) {
        super(props)
        this.state = {
            action: (id, dato, operation) => props.onClick(id, dato, operation),
            operationsButton: props.value[0],
            inputOperation: props.value[1],
            def:props.def,
            id: props.id,
            
        }
    }
   
    render() {
        //alert("menu " +this.state.showMenu );
        return (
            <div>


                {this.state.operationsButton.map(element => {
                    //console.log(element)
                    //aqui no se sabe que valor podria tomar 
                    return (
                        <div key={this.state.id + element} >
                            <Operacion  value={element} onClick={(dato) => this.state.action(this.state.id, dato, element)}></Operacion>
                        </div>

                    )
                })}
                {this.state.inputOperation.map(element => {
                    // dato se obtine del input 
                    var def = (element==="editar")? this.props.def:"";
                    console.log("def", def);
                    
                    //console.log(element+ "id" ,this.state.id + element)
                    return (

                        <div key={this.state.id + element} >
                            <SetText id={this.state.id+element} def={def} value={element} onClick={(dato) => this.state.action(this.state.id, dato, element)}></SetText>
                        </div>
                    )
                })}

            </div>
        )
    }
}
export default MenuOperaciones;

