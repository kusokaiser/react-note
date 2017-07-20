"use strict";
import { combineReducers } from "redux";
import { INIT_NOTES, ADD_NOTE, DELETE_NOTE, GET_NOTE, UPDATE_NOTE} from "../action/action.jsx";

//处理笔记初始化、添加及删除请求
function notes(state = [], action){
	console.log(action);
	//每一次的操作无论是添加、删除还是初始化，全部的笔记内容会被重新更新一次
	switch(action.type){
		case INIT_NOTES:
        case ADD_NOTE:
		case DELETE_NOTE:
		case UPDATE_NOTE:
			return [...action.notes];
		default:
			return state;
	}
}

function singleNote(state = {}, action) {
    switch(action.type){
        case GET_NOTE:
            return action.singleNote;
        default:
            return state;
    }

}

const rootReducer = combineReducers({ notes, singleNote });
export default rootReducer;