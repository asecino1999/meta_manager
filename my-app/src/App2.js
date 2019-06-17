import React from 'react';
import SetText from './SetText';
import Lista from './Lista';
import './App.css';
class App2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            metas: {
                lista: [],
                score:0
            },
            imgscr: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ae2f4173-abee-4ffd-951c-1d1b3a514695/dbt0s8q-1d4014fa-49a6-49ba-bb57-566b3daf9197.png/v1/fill/w_744,h_1073,strp/monika_chibi_by_anjasx4d_dbt0s8q-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTg0NSIsInBhdGgiOiJcL2ZcL2FlMmY0MTczLWFiZWUtNGZmZC05NTFjLTFkMWIzYTUxNDY5NVwvZGJ0MHM4cS0xZDQwMTRmYS00OWE2LTQ5YmEtYmI1Ny01NjZiM2RhZjkxOTcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ._FBbd2bBq0GNdXjZBqc4Hc1oA5T1mxTwFVKWf_eXYRw",
            imgNormal: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ae2f4173-abee-4ffd-951c-1d1b3a514695/dbt0s8q-1d4014fa-49a6-49ba-bb57-566b3daf9197.png/v1/fill/w_744,h_1073,strp/monika_chibi_by_anjasx4d_dbt0s8q-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTg0NSIsInBhdGgiOiJcL2ZcL2FlMmY0MTczLWFiZWUtNGZmZC05NTFjLTFkMWIzYTUxNDY5NVwvZGJ0MHM4cS0xZDQwMTRmYS00OWE2LTQ5YmEtYmI1Ny01NjZiM2RhZjkxOTcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ._FBbd2bBq0GNdXjZBqc4Hc1oA5T1mxTwFVKWf_eXYRw",
            imgjump: "http://localhost:8080/monika.gif"//"https://media.tenor.com/images/b8d51686bec3f9920a603a0f44d72023/tenor.gif",
        }
    }

    ocultarSubElement(mother) {
        //console.log("ele mther", mother)
        if (mother["lista"] !== undefined) {
            mother["lista"].forEach((element, index) => {
                //console.log("ele eje", element)
                element["mostrar"] = false;
                element = this.ocultarSubElement(element);
                mother["lista"][index] = element;
            });
        }
        return mother;
    }
    // consulta al servidor 
    componentDidMount() {
        fetch("http://192.168.1.12:8080/")
            .then((salida) => {
                //console.log("salidfad",salida)
                return (salida.json())
            })
            .then((data) => {
                console.log("data", data)
                //data["lista"].forEach(element => {
                this.ocultarSubElement(data)
                //});
                if(data["score"]===undefined)data["score"]=0;
                this.setState({ metas: data });
            })
    }

    // sobre el elemento 
    buscarYEjecutar(id, dato, mother, calback, index, lista) {
        if (mother["id"] === id) {
            mother = calback(dato, mother, lista, index);
            //console.log("mother",mother)
        } else {
            if (mother["lista"] !== undefined) {
                mother["lista"].forEach((element, i) => {
                    //console.log("ele eje", element)
                    element = this.buscarYEjecutar(id, dato, element, calback, i, mother["lista"]);
                    mother["lista"][i] = element;
                });
            }
        }
        return mother;
    }
    agregar(contenido, element, lista, index) {
        var id = (new Date().getTime()) - 1560547247423;
        var n = new Date();
        var fecha = n.getFullYear() + "/" + n.getMonth() + "/" + n.getDay() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds()
        var nuevo = {
            contenido: contenido,
            mostrar: true,
            id: id,
            lista: [],
            fechaInicio: fecha,
            fechaFin: "?",
            check: false
        }
        element["lista"].push(nuevo);

        return element;
    }
    add(id, dato) {
        //alert("añdiendo")
        return this.buscarYEjecutar(id, dato, this.state.metas, this.agregar, 0, []);
    }


    mostrarSubElemen(contenido, element, lista, index) {
        element["mostrar"] = !element["mostrar"]
        return element;
    }
    mostrar(id) {
        return this.buscarYEjecutar(id, "", this.state.metas, this.mostrarSubElemen, 0, []);
    }


    edit(contenido, element, lista, index) {
        //console.log("edit elemeto",element)
        element["contenido"] = contenido;
        return element;
    }
    editar(id, dato) {

        var ele = this.buscarYEjecutar(id, dato, this.state.metas, this.edit, 0, []);

        return ele;
    }

    jump() {

        //this.chequear(meta)

        this.setState({ imgscr: this.state.imgjump });
        //alert("dfsdf");
        setTimeout(function () { //Start the timer
            this.setState({ imgscr: this.state.imgNormal })
        }.bind(this), 3500)


    }
    checking(dato, mother) {
        var n = new Date();
        var fecha = n.getFullYear() + "/" + n.getMonth() + "/" + n.getDay() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds()
        mother["fechaFin"] = fecha;
        if (mother["check"] === undefined) mother["check"] = true;
        mother["check"] = !mother["check"];
        //if(mother["check"])dato();
        var defScore=5;
        var metas = this.state.metas; 
        metas.score = metas.score+defScore*(mother["check"]?1:-1);
        
        
        this.setState({metas:metas });
        //this.state.metas.score+=defScore*(mother["check"]?1:-1 );
        return mother;
    }
    check(id) {
        var ele = this.buscarYEjecutar(id, this.jump, this.state.metas,(dato, mother, lista, index)=> this.checking(dato, mother, lista, index));
        return ele;
    }

    // sobre la lista que contien al elemento
    buscarYEjecutarMother(id, dato, mother, calback) {
        mother["lista"].forEach((element, i) => {
            if (element["id"] === id) {
                mother = calback(mother, i)// este la lista padre 
                //mother["lista"].splice(i,1)
            } else {
                element = this.buscarYEjecutarMother(id, dato, element, calback);
                mother["lista"][i] = element;
            }
        });
        return mother;
    }

    eliminar(mother, index) {
        mother["lista"].splice(index, 1)
        return mother
    }
    quitar(id) {
        return this.buscarYEjecutarMother(id, "", this.state.metas, this.eliminar);
    }

    mandar() {
        var url = 'http://localhost:8080/data';
        var data = this.state.metas;
        console.log("mandando ", data)
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }


    action(id, dato, operation) {
        var lista = this.state.metas;
        switch (operation) {
            case "agregar":

                lista = this.add(id, dato);
                break;
            case "subLista":
                lista = this.mostrar(id);
                break;
            case "quitar":
                if (window.confirm("desea quitar elemento "))
                    lista = this.quitar(id);
                break;
            case "editar":
                lista = this.editar(id, dato);
                break;
            case "check":
                if (!dato) this.jump();
                lista = this.check(id);

                break;
            default:
                break;
        }
        console.log(id, dato, operation);
        //console.log("lsi",lista)

        this.setState({ metas: lista });
        this.mandar();
    }

    renderTopBar() {
        return (
            <div>
                <nav className="menu-fixed" >
                    <ul>
                        <li>
                            <div className="frase-principal">
                                ¿ Qué tenemos que hacer hoy ?
                            </div>

                        </li>
                        <li>
                            <div   >
                                <SetText id={0 + "agregar"}
                                    def={""}
                                    value={"agregar"}
                                    onClick={(dato) => this.action(0, dato, "agregar")}>
                                </SetText>
                            </div>
                        </li>
                        <li>
                            <div className="frase-principal" >
                                {"Puntaje : "+this.state.metas.score}
                            </div>
                        </li>
                    </ul>
                </nav>
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
            </div>
        )
    }

    render() {
        var buttonOperation = ["quitar", "^", "v"];
        var inputOperation = ["editar", "agregar"];
        //var value=[buttonOperation,inputOperation,id,contenido,first]
        var value = [buttonOperation, inputOperation, 0, 0, true, this.state.metas["lista"]]
        //console.log("state",this.state["metas"])
        //console.log("value",value)
        // <Element value={value} onClick={(id,dato,operation)=>this.action(id,dato,operation)} ></Element>

        return (
            <div>
                <header className="App-header">
                    {this.renderTopBar()}
                    <button className="opciones" onClick={() => this.mandar()} > mandar datos</button>
                    <div>

                        <img src={this.state.imgscr} className="App-logo" alt="logo" id="monika" />
                        <Lista value={value}
                            className="Lista"
                            lista={this.state.metas["lista"]}
                            onClick={(id, dato, operation) => this.action(id, dato, operation)} >
                        </Lista>
                    </div>
                </header>
            </div>
        )
    }
}

export default App2;
