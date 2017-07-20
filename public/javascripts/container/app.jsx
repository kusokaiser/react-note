"use strict";
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { initNotes, addNote, deleteNote, getNote, updateNote } from "../action/action.jsx";
import Notes_header from "../component/Notes_header.jsx";
import Notes_form from "../component/Notes_form.jsx";
import Notes_list from "../component/Notes_list.jsx";
import "../../stylesheets/style.scss";

class Notes extends React.Component{
	constructor(props){
		super(props);
		this.state={
			formDisplayed : false,
            isEdit: false,
			title: '',
			content: ''
		};
	}

	componentDidMount(){
		this.props.dispatch( initNotes() );
	}

	onToggleForm(){
		this.setState({
			formDisplayed : !this.state.formDisplayed
		});
	}

	onNewNote(newNote){
		this.props.dispatch( addNote(newNote) );
	}

	addNewNote(){
		this.setState({
			isEdit: false
		});
		this.onToggleForm();
	}

	onDeleteNote(date){
		/*根据日期来删除笔记*/
		var delete_date={
			date : date
		};
		this.props.dispatch( deleteNote(delete_date) );
	}

	onEdit(date){
		let get_date = {
            date : date
        };
        this.props.dispatch( getNote(get_date) );
        this.setState({
            formDisplayed : true,
			isEdit: true
        });
	}

	onUpdateNote(note){
		let param = {
			date: note.date,
			note
		};
		this.props.dispatch(updateNote(param));
        this.setState({
            formDisplayed : false,
            isEdit: false
        });
	}

	render(){
		const { notes, singleNote } = this.props;
		console.log('app', singleNote);
		return(
			<div className="container">
				<Notes_header addNewNote={ this.addNewNote.bind(this) }/>
				<div className="container_main">
					<Notes_form onToggleForm={ this.onToggleForm.bind(this) }
								singleNote={singleNote}
								formDisplayed={ this.state.formDisplayed }
								onNewNote={ this.onNewNote.bind(this) }
								onUpdateNote={this.onUpdateNote.bind(this)}
								isEdit={this.state.isEdit}
					/>
					<Notes_list notes={ notes } onDeleteNote={ this.onDeleteNote.bind(this) } onEdit={this.onEdit.bind(this)}/>
				</div>
			</div>
		);
	}
}

Notes.propTypes = {
	notes : PropTypes.arrayOf(
			PropTypes.shape({
				title : PropTypes.string.isRequired,
				description : PropTypes.string.isRequired,
				date : PropTypes.string.isRequired
			}).isRequired
		).isRequired,
	singleNote: PropTypes.shape({
        title : PropTypes.string.isRequired,
        description : PropTypes.string.isRequired,
        date : PropTypes.string.isRequired
    }).isRequired
};

function select(state){
	return{
		notes : state.notes,
		singleNote: state.singleNote
	}
}

export default connect(select)(Notes);