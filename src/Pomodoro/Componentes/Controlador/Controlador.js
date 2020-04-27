import React from 'react'
import './_controlador.scss'

const Controlador = props => (
    <div className="controlador">
        <div className="controlador-nombre" id={props.idText}>{props.nombre}</div>
        <div className="controlador-controls"> 
            <button id={props.idBtnDecrement} onClick={props.disminuir}><i class="fa fa-minus"></i></button>
            <label id={props.idNum} className="controlador-controls-num">{props.num}</label>
            <button id={props.idBtnIncrement} onClick={props.aumentar}><i class="fa fa-plus"></i></button>
        </div>
        
    </div>
)

export default Controlador