import {createStore} from 'redux'
import {applyMiddleware} from 'redux'
import {combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {CalendarReducer} from "./calendarReducer";



let rootReducer = combineReducers({
    CalendarReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
