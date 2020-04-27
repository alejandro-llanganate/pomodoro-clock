import React from 'react'
import './_timer.scss'

class Timer extends React.Component{
    render(){
        let colorFondo= {backgroundColor: "rgb(250, 0, 104)"};
        let botonPlayPause;
        if(this.props.transcurso === false){
            botonPlayPause = (<button  
                id="start_stop" 
                className="timer-boton"
                onClick={this.props.disminuirTiempo}
            > 
                <i class="fa fa-play"></i>
            </button>)
        }else{
            botonPlayPause = (<button  
                id="start_stop" 
                className="timer-boton"
                onClick={this.props.pauseDisminuir}
                style={{color: "rgb(282, 100, 104)"}}
            > 
                <i class="fa fa-pause"></i>
            </button>)
             colorFondo= {backgroundColor: "rgb(282, 100, 104)", borderColor: "rgb(282, 100, 104)"};
        }

        return(
            <div className="timer" style={colorFondo}>
                <label id="timer-label"  style={{color: "white", fontFamily: "Arial"}}>{this.props.estadoSession}</label>
                <div className="timer-time" id="time-left"> 
        <label id="time-left">{this.props.cantidadTiempo}</label>
                </div>
                <br />
                <div className="timer-controls">
                    {botonPlayPause}
                    <button  id="reset" onClick={this.props.reset} className="timer-boton"><i class="fa fa-refresh"></i></button>
                </div>
            </div>
        )
    }
}

export default Timer

