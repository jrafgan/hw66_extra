import React, {Component, Fragment} from 'react';
import './App.css';
import NoteInputForm from "../components/noteInputForm";
import imgUrl from '../assets/61848.png'
import NoteList from "../components/noteList";
import axios from '../axios-url';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Backdrop from "../components/UI/Backdrop/Backdrop";


class App extends Component {

    constructor(props) {
        super(props);
        this.newText = '';
        this.id = '';
        this.state = {
            notes: [],
            loading: false,
            newError: '',
        };
        axios.interceptors.request.use(req => {
            this.setState({loading: true});
            return req;
        });

        axios.interceptors.response.use(res => {
            this.setState({loading: false});
            return res;
        }, error=>{
            this.setState({loading: false, newError: error});
            this.newText = this.state.newError;
            this.addBtn();
            throw error;
        });
    }




    shouldComponentUpdate(nextProps) {
        return this.props.note === nextProps.note && this.props.id === nextProps.id;
    }

    componentDidMount() {
        axios.get('errorLog.json').then(response => {
            if (response.data === null) return;
            let copy = this.state.notes;
            copy = Object.keys(response.data).map(id => {
                return {...response.data[id], id}
            });
            this.setState({notes: copy});
        })
    }

    addBtn(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        let date = new Date ();
        const time = date.toLocaleTimeString();
        const date2 = date.toLocaleDateString();
        date =  time + ' / ' + date2;
        let copy = this.state.notes;
        copy.push({note: this.newText, date: date});
        this.setState({notes: copy});
        axios.post('errorLog.json', {note: this.newText, date: date})
    }

    addNewNote(event) {
        this.newText = event.currentTarget.value;
        this.id = event.currentTarget.id;
    }

    editNote(event) {

        const id = event.currentTarget.id;
        const index = this.state.notes.findIndex(item => item.id === id);
        let copy = this.state.notes;
        copy[index].note = event.currentTarget.value;
        axios.patch('errorLog/' + id + 'son', {note: event.currentTarget.value}).then(()=> {
            this.setState({notes: copy});
        });
    }

    deleteItem(event) {
        const id = event.currentTarget.id;
        const copy = this.state.notes;
        const index = copy.findIndex(item => item.id === id);
        copy.splice(index, 1);
        this.setState({notes: copy});
        axios.delete('errorLog/' + id + '.json')
    }


    render() {

        let form = (<Fragment>
            <div className="input-form">
                <NoteInputForm onChangeName={this.addNewNote.bind(this)} onSubmit={this.addBtn.bind(this)}/>
            </div>
            <div className="outcomeList">
                <p>Измените Текст, чтобы увидеть ошибку : </p>
                {this.state.notes.map((item, key) => {
                    return <NoteList id={item.id} text={item.note} date={item.date} imgUrl={imgUrl} key={key}
                                     onClick={this.deleteItem.bind(this)} onChange={this.editNote.bind(this)}/>
                })}
            </div>
        </Fragment>);

        if (this.state.loading) {
            form = <Backdrop show={this.state.loading} close={!this.state.loading}/>
        }

        return (


            <div className="App container">
                <ErrorBoundary>
                {form}
                </ErrorBoundary>
            </div>
        )
    }
}

export default App;
