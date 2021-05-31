export const initialState: TypeInitialState = {
    years: [ 2021, 2022,2023,2024,2025],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    data: new Date(),
    currentDate: new Date(),
    selectedDate: new Date(),
    reservedDate:[]
}

export const changeDataAC = (data: Date) => {
    return {
        type: '/calendarReducer/CHANGE_DATA',
        data
    } as const
}
export const selectDataAC = (data: Date) => {
    return {
        type: '/calendarReducer/SELECT_DATA',
        data
    } as const
}
export const reservedDataAC = (data: Date) => {
    return {
        type: '/calendarReducer/RESERVED_DATA',
        data
    } as const
}
export const CalendarReducer = (state: TypeInitialState = initialState, action: TypeActions): TypeInitialState => {
    switch (action.type) {
        case '/calendarReducer/CHANGE_DATA':
            return {
                ...state,
                data: action.data
            }
        case '/calendarReducer/SELECT_DATA':
            return{
                ...state,
                selectedDate:action.data
            }
        case '/calendarReducer/RESERVED_DATA':
            let arr = [...state.reservedDate];
            let formatted = formatDate(action.data)
            if (arr.includes(formatted)) {
                return {
                    ...state,
                    reservedDate:arr.filter(d => d!== formatted)
                }
            }
            return {
                ...state,
                reservedDate:[...state.reservedDate, formatted]
            }
        default:
            return state
    }
}


type TypeActions =
    | ReturnType<typeof changeDataAC>
    | ReturnType<typeof selectDataAC>
    | ReturnType<typeof reservedDataAC>

export type TypeInitialState = {
    years: number[]
    monthNames: string[]
    weekDayNames: string[]
    data: Date
    currentDate: Date
    selectedDate: Date
    reservedDate:string[]

}

export const formatDate = (d?: Date): string => {
    if (!d) return '';
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-')
}