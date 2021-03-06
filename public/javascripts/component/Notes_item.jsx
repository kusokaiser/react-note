"use strict";
import React, { Component, PropTypes } from "react";

class Notes_item extends React.Component{

	handleOver(){
		this.refs.delete.style.display="block";
        this.refs.edit.style.display="block";
	}

	handleOut(){
		this.refs.delete.style.display="none";
        this.refs.edit.style.display="none";
	}

	handleDelete(){
		this.props.onDeleteNote(this.props.date);
	}

    handleEdit(){
	    this.props.onEdit(this.props.date)
	}

	render(){
		return(
			<div>
				<div className="notes_item" onMouseOver={ this.handleOver.bind(this) } onMouseOut={ this.handleOut.bind(this) }>
					<h4>{ this.props.title }</h4>
					<p>{ this.props.description }</p>
					<input className="edit" ref="edit" type="button" value="编辑" onClick={ this.handleEdit.bind(this) }/>
					<input className="delete" ref="delete" type="button" value="删除它" onClick={ this.handleDelete.bind(this) }/>
					<span className="date">{ this.props.date }</span>
				</div>
			</div>
		);
	}
}

Notes_item.propTypes = {
	title : PropTypes.string.isRequired,
	description : PropTypes.string.isRequired,
	date : PropTypes.string.isRequired,
	onDeleteNote : PropTypes.func.isRequired
}

export default Notes_item;