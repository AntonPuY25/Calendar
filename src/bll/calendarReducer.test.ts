import {CalendarReducer, reservedDataAC, TypeInitialState} from './calendarReducer'

let state:TypeInitialState

beforeEach(() => {
    state = {
        years: [ 2021, 2022,2023,2024,2025],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        data: new Date(),
        currentDate: new Date(),
        selectedDate: new Date(),
        reservedDate:[]
    }
})
test('changeData',()=>{
    const action = reservedDataAC( new Date())
    const result = CalendarReducer(state, action)
    expect(result.data.getMonth()).toBe(new Date().getMonth())
    expect(result.data.getDay()).toBe(new Date().getDay())
    expect(result.data.getFullYear()).toBe(new Date().getFullYear())

} )