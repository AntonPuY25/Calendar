import React, {ChangeEvent, useState} from 'react'
import './calendar.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {changeDataAC, formatDate, reservedDataAC, selectDataAC, TypeInitialState} from "../../bll/calendarReducer";
import {areEqual, getMonthData} from "./functions";
import classnames from 'classnames';
import SuperRadio from "../common/superRadio/superRadio";
import {Api} from "../../dall/api";

function Calendar() {
    const time = [10, 12, 14]
    const localState = useSelector<AppRootStateType, TypeInitialState>(store => store.CalendarReducer)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [currentDate, setCurrentDate] = useState<Date>()
    const [customerName, setCustomerName] = useState<string>('')
    const [customerEmail, setCustomerEmail] = useState<string>('')
    const [timeReserved, setTimeReserved] = useState<number>(time[1])
    const dispatch = useDispatch()
    const monthData = getMonthData(localState.data.getFullYear(), localState.data.getMonth())
    const handlePrevMonthButtonClick = () => {
        const date = new Date(localState.data.getFullYear(), localState.data.getMonth() - 1);
        dispatch(changeDataAC(date));
    };
    const handleNextMonthButtonClick = () => {
        const date = new Date(localState.data.getFullYear(), localState.data.getMonth() + 1);
        dispatch(changeDataAC(date));
    };

    const handleSelectMonth = (e: ChangeEvent<HTMLSelectElement>) => {
        const date = new Date(localState.data.getFullYear(), +e.currentTarget.value);
        dispatch(changeDataAC(date));
    };
    const handleSelectYear = (e: ChangeEvent<HTMLSelectElement>) => {
        const date = new Date(+e.currentTarget.value, localState.data.getMonth());
        dispatch(changeDataAC(date));

    };

    const handleDay = (date: Date) => {
        dispatch(selectDataAC(date));
        setEditMode(true)
        setCustomerName('')
        setCustomerEmail('')
    }

    const reserveDate = () => {
        dispatch(reservedDataAC(currentDate!));
        setEditMode(false)
        sessionStorage.setItem(formatDate(currentDate), JSON.stringify({name:customerName,time:timeReserved}))
      let cost = currentDate?.getDay() === 6 || currentDate?.getDay() === 0 ?
              (24 - timeReserved) * 30 + 'р.':
               (24 - timeReserved) * 10 + 'р.'

      Api.sendEmail(customerEmail,timeReserved,cost,customerName)
    }




    return <>
        <div className={editMode ? 'popup' : 'hide'}>
            <div className={'popupContent'}>
                <span onClick={() => setEditMode(false)} className={'x'}>X</span>
                <input placeholder={'Name'} value={customerName} onChange={(e) =>
                    setCustomerName(e.currentTarget.value)} type="text"/>
                <input placeholder={'Email'} value={customerEmail} onChange={(e) =>
                    setCustomerEmail(e.currentTarget.value)} type="text"/>
                <span><SuperRadio
                    name={"value"}
                    options={time}
                    value={timeReserved}
                    onChangeOption={setTimeReserved}/></span>
                <button className="btn" disabled={(customerName.length&&customerEmail.length)<5} onClick={reserveDate}>Reserve</button>
            </div>
        </div>
        <div className={'calendar'}>
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
                        {week.map((date: Date, index: number) => {
                            let DataReserved = sessionStorage.getItem(formatDate(date))
                                let dateString = formatDate(date); //YYYY-MM-DD
                                let isInArr = localState.reservedDate.includes(dateString)
                                return date ?
                                    <td onClick={() => {
                                        handleDay(date)
                                        setCurrentDate(date)
                                    }}
                                        style={isInArr ? {background: '#c125b9'} : {}}
                                        key={index} className={classnames('day', {
                                        'today': areEqual(date, localState.currentDate),
                                        'selected': areEqual(date, localState.selectedDate),
                                    })}>{isInArr ? <div>
                                        <div>
                                            {date.getDate()}
                                        </div>
                                        <div>
                                            {DataReserved&&JSON.parse(DataReserved).name}
                                        </div>
                                        <div>
                                            Стоимость:{date.getDay() === 6 || date.getDay() === 0 ?
                                            DataReserved&&(24 - JSON.parse(DataReserved).time) * 30 + 'р.':
                                            DataReserved&&(24 - JSON.parse(DataReserved).time) * 10 + 'р.'}
                                        </div>
                                        <div>
                                            Бронь с:{timeReserved + ":00"}
                                        </div>
                                    </div> : <div>
                                        <div>
                                            {date.getDate()}
                                        </div>
                                        <div>
                                            Стоимость:{date.getDay() === 6 || date.getDay() === 0 ?
                                            '30р./час' : '10р./час'}
                                        </div>
                                    </div>}</td>

                                    :
                                    <td key={index}/>
                            }
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        </div>

    </>
        ;
}

export default Calendar;
