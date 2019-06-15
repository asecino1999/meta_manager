import React from 'react';
//import logo from './logo.svg';
import './App.css';

class SetTex extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            operation:(dato)=>props.onClick(dato),
            value:props.value,
            id:props.id,
            def:props.def
        }
    }
    adding() {
        //console.log("entra ",this.state.id)
        var inp= document.getElementById(this.props.id+"in");
        if(inp.value!==this.props.def){
            console.log("inp ", inp.value);
            this.state.operation(inp.value);

            inp.value = this.props.def
            return true;
        }
        return false
      }
    
    render(){
        //console.log(this.state)
        return(
            <div>
                <form action="#"   onSubmit={() => this.adding()}>
                    <input className="Edit" type="text" id={this.props.id+"in"}  defaultValue={this.props.def}    />
                    <button  className="Edit" >{ this.state.value}</button>
                </form>
            </div>
        );
    }
}
export default SetTex;

