export const initialState: TypeInitialState = {
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    data: new Date(),
    currentDate: new Date(),
    selectedDate: null
}

export const changeData = (data: Date) => {
    return {
        type: '/calendarReducer/CHANGE_DATA',
        data
    } as const
}
export const CalendarReducer = (state: TypeInitialState = initialState, action: TypeActions): TypeInitialState => {
    switch (action.type) {
        case "/calendarReducer/CHANGE_DATA":
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}


type TypeActions =
    | ReturnType<typeof changeData>
export type TypeInitialState = {
    years: number[]
    monthNames: string[]
    weekDayNames: string[]
    data: Date
    currentDate: Date
    selectedDate: null | Date
}