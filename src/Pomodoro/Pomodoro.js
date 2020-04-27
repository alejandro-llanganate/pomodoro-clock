import React, { createRef } from 'react'
import './_pomodoro.scss'
import Controlador from './Componentes/Controlador/Controlador'
import Timer from './Componentes/Timer/Timer'

class Pomodoro extends React.Component{

    state = {
        cantidadTiempo: 60 * 25,
        breakLen: 5,
        sessionLen: 25,
        estadoSession: "Session",
        transcurso: false,
        tiempoBreak: 60 * 5,
        audio: createRef(),
        flag: false
    }
    
    convertir  = (tiempoCantidad) => {
        let segundos = tiempoCantidad % 60;
        let minutos = Math.floor(tiempoCantidad / 60);
        segundos = segundos < 10 ? (`0${segundos}`) : segundos;
        minutos = minutos < 10 ? (`0${minutos}`) : minutos;
        return `${minutos}:${segundos}`
    }

     aumentarSession = () => {
        if(this.state.transcurso === false){   
            this.setState(prevState => 
                {         
                if(this.state.cantidadTiempo < (60 * 60)){
                    return({cantidadTiempo: prevState.cantidadTiempo + 60,
                        sessionLen: prevState.sessionLen + 1})
                }   
            })
        }
     }

    disminuirSession = () => {
        if(this.state.transcurso === false){   
            this.setState(prevState => 
                {         
                if(this.state.cantidadTiempo > 60){
                    return({cantidadTiempo: prevState.cantidadTiempo - 60,
                        sessionLen: prevState.sessionLen - 1})
                }   
            })
        }
    }

    aumentarBreak = () => {
        if(this.state.transcurso === false){ 
            this.setState(prevState => 
                {         
                if(this.state.tiempoBreak < (60 * 60)){
                    return({tiempoBreak: prevState.tiempoBreak + 60,
                        breakLen: prevState.breakLen + 1})
                }   
            })    
        }
    }

    disminuirBreak = () => {
        if(this.state.transcurso === false){         
            this.setState(prevState => 
                {         
                if(this.state.tiempoBreak > 60){
                    return({tiempoBreak: prevState.tiempoBreak - 60,
                        breakLen: prevState.breakLen - 1})
                }   
            })
        }
    }

    disminuirTiempo = () => {
        if(this.state.estadoSession==="Session"){
            const corridaTiempo = setInterval(() => { 
                this.setState(prevState => 
                    {         
                    if(this.state.cantidadTiempo >= 0 && this.state.transcurso === true){
                        return({cantidadTiempo: prevState.cantidadTiempo - 1})
                    }
                }, 
                ()=>{
                    if(!this.state.transcurso){
                        clearInterval(corridaTiempo)
                      }
                      if(this.state.cantidadTiempo === -1){
                          clearInterval(corridaTiempo)
                          this.state.audio.current.play();
                          this.setState({estadoSession: "Break", cantidadTiempo: (this.state.sessionLen*60), tiempoBreak: (this.state.breakLen*60 + 1), flag: true}, () => {                         
                          this.start()
                          })
                          
                      }
                }
                ) 
              }, 1000);          
        }  
    }

    disminuirTiempoBreak = () => {
        if(this.state.estadoSession==="Break"){
            const corridaTiempo2 = setInterval(() => { 
                this.setState(prevState => 
                    {         
                    if(this.state.tiempoBreak  >= 0 && this.state.transcurso === true){
                        return({tiempoBreak: prevState.tiempoBreak - 1})
                    } 
                }, 
                ()=>{
                    if(!this.state.transcurso){
                        clearInterval(corridaTiempo2)
                      }
                      if(this.state.tiempoBreak === -1){
                          clearInterval(corridaTiempo2)
                          this.state.audio.current.play();
                          this.setState({estadoSession: "Session", tiempoBreak: (this.state.breakLen*60), cantidadTiempo: (this.state.sessionLen*60 + 1), flag: true }, () => {              
                            this.disminuirTiempo()
                          })
                      }
                }
                ) 
              }, 1000);          
        }  
    }

    start = () => {
       this.state.estadoSession === "Session" ? this.setState({transcurso: true}, this.disminuirTiempo()) : this.setState({transcurso: true}, this.disminuirTiempoBreak())
    }

    pause = () => {
        this.setState({transcurso: false})
    }

    reset = () => {
        this.setState(
                {
                    cantidadTiempo: 60 * 25,
                    breakLen: 5,
                    sessionLen: 25,
                    estadoSession: "Session",
                    transcurso: false,
                    tiempoBreak: 60 * 5
                }, () => {
                    this.state.audio.current.pause();
                    this.state.audio.current.currentTime = 0;
                }
            )
    }

  

    

    render(){
      
        return(
            <div className="pomodoro-container">

                <div className="pomodoro-container-controladores"> 
                    
                    <Controlador 
                        idText="break-label"
                        nombre="Break Length" 
                        idNum="break-length"
                        num={this.state.breakLen}
                        aumentar={this.aumentarBreak}
                        disminuir={this.disminuirBreak}
                        idBtnDecrement="break-decrement"
                        idBtnIncrement="break-increment"
                    />

                    <Controlador
                        idText="session-label" 
                        nombre="Session Length" 
                        idNum="session-length"
                        num={this.state.sessionLen}
                        aumentar={this.aumentarSession}
                        disminuir={this.disminuirSession}
                        idBtnDecrement="session-decrement"
                        idBtnIncrement="session-increment"
                    />

                </div>

                <div className="pomodoro-container-timer" > 
                    <Timer 
                        estadoSession={this.state.estadoSession}
                        cantidadTiempo={ this.state.estadoSession==="Session" ? ( (this.state.cantidadTiempo === this.state.sessionLen*60+1) ? this.convertir(this.state.cantidadTiempo - 1): this.convertir(this.state.cantidadTiempo )) : ( (this.state.tiempoBreak === this.state.breakLen*60+1) ? this.convertir(this.state.tiempoBreak-1) : this.convertir(this.state.tiempoBreak))}
                        disminuirTiempo={this.start}
                        pauseDisminuir = {this.pause}
                        transcurso={this.state.transcurso}
                        reset={this.reset}
                    />
                </div>
                <audio id="beep" src="https://goo.gl/65cBl1" ref={this.state.audio} />
            </div>
        )
    }

}

export default Pomodoro