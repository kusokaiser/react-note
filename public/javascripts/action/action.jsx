"use strict";
import $ from "../jquery.min.js";

//事件
export const INIT_NOTES = "INIT_NOTES";
export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const GET_NOTE = "GET_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
//action创建函数

//异步action会被redux-thunk中间件拦截，传入dispatch，getState等参数后执行
export function initNotes(){
	return function(dispatch, getState){
		$.ajax({
			url : "/init",
			type : "get",
			dataType : "json",
			cache : false,
			success : function(notes){
				/*notes是从数据库读取到的笔记数组*/
				notes=notesSort(notes);
				dispatch({ type : INIT_NOTES, notes : notes });
			}.bind(this),
			error : function(){
				console.log("notes获取失败~");
			}.bind(this)
		})
	}
}
export function addNote(newNote){
	return function(dispatch, getState){
		$.ajax({
			url : "/addNote",
			type : "post",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			//客户端与服务端通过json字符串进行通信
			data : JSON.stringify(newNote),
			cache : false,
			success : function(notes){
				console.log("笔记添加成功！");
				notes=notesSort(notes);
				dispatch({ type : ADD_NOTE, notes : notes });
			}.bind(this),
			error : function(){
				console.log("笔记添加失败啦~");
			}.bind(this)
		});
	}
}
export function deleteNote(delete_date){
	return function(dispatch, getState){
		$.ajax({
			url : "/deleteNote",
			type : "post",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			data : JSON.stringify(delete_date),
			cache : false,
			success : function(notes){
				console.log("笔记已经被删除啦！");
				notes=notesSort(notes);
				dispatch({ type : DELETE_NOTE, notes : notes });
			}.bind(this),
			error : function(){
				console.log("笔记删除失败啦~");
			}.bind(this)

		});
	}
}
export function getNote(get_date){
    return function(dispatch, getState){
        $.ajax({
            url : "/getNote",
            type : "post",
            contentType : "application/json; charset=utf-8",
            dataType : "json",
            data : JSON.stringify(get_date),
            cache : false,
            success : function(notes){
                console.log("笔记已经获取成功啦！");
                notes=notesSort(notes);
                dispatch({ type : GET_NOTE, singleNote : notes[0] });
            }.bind(this),
            error : function(){
                console.log("笔记获取失败啦~");
            }.bind(this)

        });
    }
}
export function updateNote(note){
    return function(dispatch, getState){
        $.ajax({
            url : "/updateNote",
            type : "post",
            contentType : "application/json; charset=utf-8",
            dataType : "json",
            data : JSON.stringify(note),
            cache : false,
            success : function(notes){
                console.log("笔记更新成功啦！");
                notes=notesSort(notes);
                dispatch({ type : UPDATE_NOTE, notes : notes });
            }.bind(this),
            error : function(){
                console.log("笔记更新失败啦~");
            }.bind(this)

        });
    }
}

function notesSort(newNotes){
	/*将数据库取到的notes倒序排列再显示，即后添加上去的记录在最前面显示*/
	newNotes.reverse();
	return newNotes;
}