import React, {Component} from 'react';

class NoteList extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.text !== nextProps.text;
    }

    render () {

        return (
            <div className="item" id={this.props.id}>
                <p className='date'>Date : {this.props.date}</p>
                <textarea id={this.props.id} onChange={(event)=>this.props.onChange(event)} value={this.props.text}/>
                <div className="btn-div"><img className="btn-img" id={this.props.id} src={this.props.imgUrl} alt="btn" onClick={(event)=>this.props.onClick(event)}/></div>
            </div>
        );
    }

};

export default NoteList;