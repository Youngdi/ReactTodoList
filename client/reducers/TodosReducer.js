import * as ActionTypes from '../constants/ActionTypes';
const initialState = {
    todoList: [],
    error: null,
    deleted: false,
    updated: false,
    added: false,
    got: false,
};

// let a = {a:'1'};
// let b = {b:'2'};
// let c = {a:'3'};
// let d = {d:'4'};
// console.log(Object.assign(a,b,c));
export default function TodosReducer(state = initialState, action) {

    switch (action.type) {
        case ActionTypes.GET_TODO_LIST:
            {
                return Object.assign({}, state, {
                    got: true,
                });
                // return {...state, got: true};
                break;
            }
        case ActionTypes.GET_TODO_LIST_REJECTED:
            {
                return {...state, got: false, error: action.payload };
                break;
            }
        case ActionTypes.GET_TODO_LIST_FULFILLED:
            {
                return Object.assign({}, state, {
                    got: false,
                    todoList: action.payload.userData,
                });
                // return {...state, got: false, todoList: action.payload.userData };
                break;
            }
        case ActionTypes.ADD_TODO:
            {
                return {...state, added: true };
                break;
            }
        case ActionTypes.ADD_TODO_REJECTED:
            {
                return {...state, added: false, error: null };
                break;
            }
        case ActionTypes.ADD_TODO_FULFILLED:
            {
                return {...state, added: false };
                break;
            }
        case ActionTypes.DELETE_TODO:
            {
                return {...state, deleted: true };
                break;
            }
        case ActionTypes.DELETE_TODO_FULFILLED:
            {
                return {...state, deleted: false };
                break;
            }
        case ActionTypes.DELETE_TODO_REJECTED:
            {
                return {...state, deleted: false, error: action.payload };
                break;
            }
        case ActionTypes.UPDATE_TODO:
            {
                return {...state, updated: true };
                break;
            }
        case ActionTypes.UPDATE_TODO_REJECTED:
            {
                return {...state, updated: false, error: action.payload };
                break;
            }
        case ActionTypes.UPDATE_TODO_FULFILLED:
            {
                return {...state, updated: false };
                break;
            }
    }
    return state;
};
