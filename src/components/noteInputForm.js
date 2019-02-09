import React from 'react';

const NoteInputForm = (props) => {

    return (
        <form onSubmit={props.onSubmit}>

            <textarea type="textarea" id="item-name" placeholder="Enter your note" onChange={event=>props.onChangeName(event)} />

            <button id="add-btn" type="submit" onSubmit={props.onSubmit} >Add</button>
        </form>
    );
};

export default NoteInputForm;