import React, {ChangeEvent} from 'react'
import s from './calendar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {changeData, TypeInitialState} from "../../bll/calendarReducer";
import {getMonthData} from "./functions";

function Calendar() {


    const localState = useSelector<AppRootStateType, TypeInitialState>(store => store.CalendarReducer)
    const dispatch = useDispatch()
    const monthData = getMonthData(localState.data.getFullYear(), localState.data.getMonth())
    const handlePrevMonthButtonClick = () => {
        const date = new Date(localState.data.getFullYear(), localState.data.getMonth() - 1);
        dispatch(changeData(date));
    };

    const handleNextMonthButtonClick = () => {
        const date = new Date(localState.data.getFullYear(), localState.data.getMonth() + 1);
        dispatch(changeData(date));
    };

    const handleSelectMonth = (e: ChangeEvent<HTMLSelectElement>) => {
        const date = new Date(localState.data.getFullYear(), +e.currentTarget.value);
        dispatch(changeData(date));

    };
    const handleSelectYear = (e: ChangeEvent<HTMLSelectElement>) => {
        const date = new Date(+e.currentTarget.value, localState.data.getMonth());
        dispatch(changeData(date));

    };

    const handleDay = (date: Date) => {
        console.log(date)

    }


    return (
        <div className={s.calendar}>
            <header>
                <button onClick={handlePrevMonthButtonClick}>{'<'}</button>
                <select
                    onChange={handleSelectMonth}
                    value={localState.data.getMonth()}
                >{localState.monthNames.map((name, index) => {
                    return <option key={name} value={index}>{name}</option>
                })}</select>
                <select

                    onChange={handleSelectYear}
                    value={localState.data.getFullYear()}
                >{localState.years.map(year => {
                    return <option key={year} value={year}>{year}</option>
                })}</select>
                <button onClick={handleNextMonthButtonClick}>{'>'}</button>
            </header>
            <table>
                <thead>
                <tr>
                    {localState.weekDayNames.map(days => {
                        return <th key={days}>{days}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {monthData.map((week: any, index: number) =>

                    <tr key={index} className="week">
                        {week.map((date: Date, index: number) => date ?
                            <td onClick={() => handleDay(date)} key={index} className={s.day}>{date.getDate()}</td>
                            :
                            <td key={index}/>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        </div>

    );
}

export default Calendar;
