import React from 'react';
import './Spinner.css'
import Backdrop from "../Modal/Modal";

const Spinner = (props) => {
    return (<Backdrop show={props.show} onClick={props.close} ><div className='Spinner'>Loading...</div></Backdrop>

    );
};

export default Spinner;