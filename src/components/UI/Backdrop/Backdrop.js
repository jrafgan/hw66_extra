import React from 'react';
import './Backdrop.css';
import Spinner from "../Spinner/Spinner";

const Backdrop = props => (
    props.show ? <div className="Backdrop"><Spinner/></div> : null
);

export default Backdrop;
