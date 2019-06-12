import React from 'react';
//import logo from './logo.svg';
import './App.css';



class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mostrar: false,
      done: props.checked,
      texto: props.value,
      mostrarSubMetas:(texto)=>props.onClick("mostrar",texto),
      quitar: () => props.onClick("quitar",props.value),
      chequear: () => {
        this.setState({ done: !this.state.done })
        //this.state.done=!this.state.done;  
        if (!this.state.done)
          props.onClick("jump",props.value);
      },
      
    }
  }


  mostrar(){
    //alert(this.state.mostrar)
    if(this.state.mostrar){
      return (<div className="opciones">
        
        <div>
          mover:
          <button>^</button>
          <button>v</button>
        </div>
        <button onClick={this.state.quitar}   >eliminar   </button>
        <div>
          <input type="text" value={this.state.texto}/>
        <button>edittar</button>
        </div>
        

        <List onClick={(texto) => (texto)}  ></List>
        
      </div>)
    }
    else{
      return(<div></div>)
    }
  }

  render() {
    var subMenu=this.mostrar();
    return (
      <div className="texto">
        <input type="checkbox" id={this.state.texto + "check"} checked={this.state.done} onChange={()=>this.state.chequear()} />
          
          <button className="meta" onClick={()=>this.state.mostrarSubMetas(this.state.texto)} >
          {this.state.texto}
          </button>
          <button  onClick={()=>this.setState({mostrar:!this.state.mostrar})} > opciones</button>
          {subMenu}
      </div>
    );
  }
}
class List extends React.Component {
  adding() {
    console.log("entra ")
    this.props.onClick(document.getElementById("in").value)
    document.getElementById("in").value = ""
    return false
  }


  render() {
    return (
      <div>
        <form action="#" onSubmit={() => this.adding()}>
          <input type="text" id="in" />
          <button   >agregar meta  </button>
        </form>
      </div>
    )

  }
}






class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metas: [
      ],
      imgscr: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ae2f4173-abee-4ffd-951c-1d1b3a514695/dbt0s8q-1d4014fa-49a6-49ba-bb57-566b3daf9197.png/v1/fill/w_744,h_1073,strp/monika_chibi_by_anjasx4d_dbt0s8q-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTg0NSIsInBhdGgiOiJcL2ZcL2FlMmY0MTczLWFiZWUtNGZmZC05NTFjLTFkMWIzYTUxNDY5NVwvZGJ0MHM4cS0xZDQwMTRmYS00OWE2LTQ5YmEtYmI1Ny01NjZiM2RhZjkxOTcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ._FBbd2bBq0GNdXjZBqc4Hc1oA5T1mxTwFVKWf_eXYRw",
      imgNormal: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ae2f4173-abee-4ffd-951c-1d1b3a514695/dbt0s8q-1d4014fa-49a6-49ba-bb57-566b3daf9197.png/v1/fill/w_744,h_1073,strp/monika_chibi_by_anjasx4d_dbt0s8q-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTg0NSIsInBhdGgiOiJcL2ZcL2FlMmY0MTczLWFiZWUtNGZmZC05NTFjLTFkMWIzYTUxNDY5NVwvZGJ0MHM4cS0xZDQwMTRmYS00OWE2LTQ5YmEtYmI1Ny01NjZiM2RhZjkxOTcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ._FBbd2bBq0GNdXjZBqc4Hc1oA5T1mxTwFVKWf_eXYRw",
      imgjump: "https://media.tenor.com/images/b8d51686bec3f9920a603a0f44d72023/tenor.gif",
    }
  }
  renderTodoApp(texto, clickHanger, checked) {
    return (
      <div>
        <TodoApp value={texto} onClick={clickHanger} checked={checked}   ></TodoApp>
      </div>
    );
  }

  quitarRecursivo(i, mother) {
    //var metas = this.state.metas.slice();
    mother.forEach((element, index) => {
      if (element["contenido"] === i)
        mother.splice(index, 1)
      else
        if (typeof (element["lista"]) !== 'undefined') {
          this.quitarRecursivo(i, element["lista"])
          mother[index] = element;
        }
    })
  }
  quitar(i) {
    //alert(i);
    var r = window.confirm("confima que desea borrar '"+ i+"'");
    if (r === true) {
      var metas = this.state.metas.slice();
      metas.forEach((element, index) => { if (element["contenido"] === i) metas.splice(index, 1) })
      this.quitarRecursivo(i, metas);
      this.setState({ metas: metas })
    }
  }
  add(texto) {
    //console.log("add",texto)
    //var metas = this.state.metas.slice();
    this.state.metas.push({ contenido: texto , mostrar:true});
    //alert(texto); 
    //console.log("metas add ",metas)   
    this.setState({ metas: this.state.metas.slice() })
  }



  chequearReqcursivo(submeta,metas){
    //console.log("sumeta "+submeta)
    //console.log("meta ",metas)
    if(typeof(metas["lista"])!=="undefined"){
      //console.log("meta ",metas["listas"])
      //alert("hasta aqui")
      metas["lista"].forEach((element,index )=> {

        console.log("elemet ",element)
              console.log("cont",element["contenido"])
              console.log("equ",element["contenido"]===submeta)

              console.log("list",element["lista"])
        if(element["contenido"]===submeta){
          element["checked"]=!element["checked"];



          
        }else{
          //console.log(typeof(element["lista"])!=="undefined")
          //console.log("elemt ",element)
          //alert("dsfsf")
          element=this.mostrarSubMetasRecursivo(submeta,element) 
        }

          metas["lista"][index]=element;
      });
    }

    return metas;
  }



  chequear(submeta){
    var metas={ lista: this.state.metas};
    console.log("sumte " ,submeta)
    var newSubmeta =this.chequearReqcursivo(submeta,metas)

    console.log("new meta  ", newSubmeta);
    this.setState({metas:newSubmeta["lista"]})
  }
  jump(meta) {
    
    this.chequear(meta)
    
    this.setState({ imgscr: this.state.imgjump });
    //alert("dfsdf");
    setTimeout(function () { //Start the timer
      this.setState({ imgscr: this.state.imgNormal })
    }.bind(this), 3500)


  }

  actuar(operacion,   dato) {
    //console.log(dato)

    // para que no fastidie con que reject y resolve no fueron usados 
    
    var a = new Promise((resolve,reject)=>{
      //console.log(resolve,reject)
      switch (operacion) {
        case "add":
          //alert("add")
          this.add(dato);
          resolve();
          break;
        case "quitar":
          //alert("quitar")
          //alert(dato)
          this.quitar(dato);
          resolve();
          break;
        case "mostrar":
          //alert("mostrar")
          this.mostrarSubMetas(dato);
          resolve();
          break;
        case "jump":
              //alert("mostrar")
              this.jump(dato);
              resolve();
              break;
            
        default:
          reject();
          break;
      }
      
    })

    
    a.then(()=>this.mandar())
    
    //operaciones[operacion](dato)
    return;
    /*
    if (typeof (i) !== 'string') {
      if(i===-1)
      this.jump();
      if (typeof (i) === 'object') {
        //alert("falta poco")
        this.mostrarSubMetas(i[0]);
      }
    } else {
      //
      this.quitar(i);
    }*/
  }
  ocultarSubmeta(mother){
    mother.forEach((element, index) => {
        element["mostrar"]=false;
        if (typeof (element["lista"]) !== 'undefined') {
          this.ocultarSubmeta(element["lista"])
          mother[index] = element;
        }
    })
  }


  // consulta al servidor 
  componentDidMount() {
    fetch("http://localhost:8080/")
      .then((salida) => (salida.json()))
      .then((data) => {
        data["lista"].forEach(element => {
          if(typeof (element["lista"]) !== 'undefined')
          this.ocultarSubmeta(element["lista"]);
          element["mostrar"]=true;
          this.state.metas.push(element)
          //console.log(element);
        });
        return this.setState({ metas: this.state.metas })
      })
  }

  mandar(){
    var url = 'http://localhost:8080/data';
    var data = {lista:this.state.metas};
    console.log("mandando ", data)
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }




  mostrarSubMetasRecursivo(submeta,metas){
    //console.log("sumeta "+submeta)
    //console.log("meta ",metas)
    if(typeof(metas["lista"])!=="undefined"){
      //console.log("meta ",metas["listas"])
      //alert("hasta aqui")
      metas["lista"].forEach((element,index )=> {
        if(element["contenido"]===submeta){
          if(typeof(element["lista"])!=="undefined"){
            element["lista"].forEach((el,ind) => {
              el["mostrar"]=!el["mostrar"];
              element["lista"][ind]=el;
            });
          }
        }else{
          //console.log(typeof(element["lista"])!=="undefined")
          //console.log("elemt ",element)
          //alert("dsfsf")
          element=this.mostrarSubMetasRecursivo(submeta,element) 
        }
          metas["lista"][index]=element;
      });
    }
    return metas;
  }


  mostrarSubMetas(submeta){
    var metas={ lista: this.state.metas};
    var newSubmeta =this.mostrarSubMetasRecursivo(submeta,metas)
    this.setState({metas:newSubmeta["lista"]})
  }
  renderElement(element){
    if(element["mostrar"]){
      return (<div>{this.renderTodoApp(element["contenido"], (ope,dato) => this.actuar(ope,dato), element["checked"])}
        {this.renderLista(element)}
      </div> )
    }else{
      return (<div></div>)
    }
  }
  renderLista(metas) {
    
    if ( typeof (metas["lista"]) !== 'undefined')
      return (
        <div>
          {metas["lista"].map((element) => {
            return (
              <ul key={"meta" + element["contenido"]}>
                {this.renderElement(element)}
                
              </ul>
            )
          })}
        </div>

      )
    else
      return (<div></div>)
  }

  render() {
    var metas = this.state.metas.slice();
    //console.log("metas ",metas)
    return (
      <div className="App">
        <header className="App-header">

          <img src={this.state.imgscr} className="App-logo" alt="logo" id="monika" />
          <div>
            ¿ Qué tenemos que hacer hoy ?
          </div>
          <hr />
          <button onClick={()=>this.mandar()} > mandar datos</button>
          <div>
            {this.renderLista({ lista: metas , mostrar:true })}
          </div>
          <div>
            <List onClick={(texto) => this.actuar("add",texto)}></List>
          </div>
        </header>
      </div>
    );
  }
}





export default App;
