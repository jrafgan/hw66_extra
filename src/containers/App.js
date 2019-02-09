import React, {Component, Fragment} from 'react';
import './App.css';
import NoteInputForm from "../components/noteInputForm";
import imgUrl from '../assets/61848.png'
import NoteList from "../components/noteList";
import axios from '../axios-url';
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";


class App extends Component {

        newText = '';
        state = {
            notes: [],
            loading: false,
        };




    shouldComponentUpdate(nextProps) {
        return this.props.note === nextProps.note && this.props.id === nextProps.id;
    }

    componentDidMount() {
        axios.get('notes.json').then(response => {
            if (response.data === null) return;
            let copy = this.state.notes;
            copy = Object.keys(response.data).map(id => {
                return {...response.data[id], id}
            });
            this.setState({notes: copy});
        })
    }

    addBtn(e) {
        e.preventDefault();
        let date = new Date ();
        const time = date.toLocaleTimeString();
        const date2 = date.toLocaleDateString();
        date =  time + ' / ' + date2;
        let copy = this.state.notes;
        copy.push({note: this.newText, date: date});
        this.setState({notes: copy});
        axios.post('notes.json', {note: this.newText, date: date})
    }

    addNewNote(event) {
        this.newText = event.currentTarget.value;
    }

    editNote(event) {

        const id = event.currentTarget.id;
        const index = this.state.notes.findIndex(item => item.id === id);
        let copy = this.state.notes;
        copy[index].note = event.currentTarget.value;

        this.setState({notes: copy});
        console.log(this.state.notes);
        this.setState({loading: true});
        axios.patch('notes/' + id + 'json', {note: event.currentTarget.value})
    }

    deleteItem(event) {
        const id = event.currentTarget.id;
        const copy = this.state.notes;
        const index = copy.findIndex(item => item.id === id);
        copy.splice(index, 1);
        this.setState({notes: copy});
        this.setState({loading: true});
        axios.delete('notes/' + id + '.json')
    }


    render() {

        let form = (<Fragment>
            <div className="input-form">
                <NoteInputForm onChangeName={this.addNewNote.bind(this)} onSubmit={this.addBtn.bind(this)}/>
            </div>
            <div className="outcomeList">
                <p>Notes of My Diary : </p>
                {this.state.notes.map((item, key) => {
                    return <NoteList id={item.id} text={item.note} date={item.date} imgUrl={imgUrl} key={key}
                                     onClick={this.deleteItem.bind(this)} onChange={this.editNote.bind(this)}/>
                })}
            </div>
        </Fragment>);

        if (this.state.loading) {
            form = <Spinner show={this.state.loading} close={!this.state.loading}/>
        }
        return (
            <div className="App container">
                {form}
            </div>
        )
    }
}

export default withErrorHandler(App, axios);
