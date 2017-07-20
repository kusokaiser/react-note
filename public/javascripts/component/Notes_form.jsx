"use strict";
import React, { Component, PropTypes } from "react";

class Notes_form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title : this.props.title || '',
			description : this.props.description || '',
			date: this.props.date || ''
        };
    }
    componentWillReceiveProps(nextProps){
    	let singleNote = nextProps.singleNote;
    	const {title, description} = singleNote;
    	if((title != this.state.title || description != this.state.description) && nextProps.isEdit){
    		this.setState({
				title,
                description
			})
		}
	}

	handleSubmit(event){
    	const {isEdit, singleNote} = this.props;
		event.preventDefault();
		if(this.state.title === "") return;
		let newDate = "posted @"+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds()
		let newNote={
			title : this.state.title,
			description : this.state.description,
			date : isEdit ? singleNote.date : newDate
		};
		this.refs.yout_form.reset();
		console.log(newNote);
        isEdit ? this.props.onUpdateNote(newNote) : this.props.onNewNote(newNote);
        this.onSubmit();
	}

	handleInput(e){
		this.setState({
			title: e.target.value
		})
	}

	handleText(e){
        this.setState({
            description: e.target.value
        })
	}

	onSubmit(){
		this.setState({
			title:'',
			description:''
		});
		this.props.onToggleForm();
	}

	render(){
		const {title, description} = this.state;
		let style={
			display : this.props.formDisplayed ? "block" : "none"
		};
		return(
			<div className="note_form_wrap">
				<form ref="yout_form" action="#" className="note_form" style={ style } onSubmit={ this.handleSubmit.bind(this) }>
					<h5>笔记</h5>
					<input ref="title" type="text" className="your_title" placeholder="你的笔记的标题" value={title} onChange={this.handleInput.bind(this)}/>
					<textarea ref="description" className="your_description" placeholder="笔记的内容" value={description} onChange={this.handleText.bind(this)}/>
					<input type="button" value="取消" className="cancel_btn" onClick={ this.onSubmit.bind(this) }/>
					<input type="submit" value="确认" className="confirm_btn"/>
				</form>
			</div>
		);
	}
}

Notes_form.propTypes = {
	onToggleForm : PropTypes.func.isRequired,
	formDisplayed : PropTypes.bool.isRequired,
	onNewNote : PropTypes.func.isRequired
}

export default Notes_form; 