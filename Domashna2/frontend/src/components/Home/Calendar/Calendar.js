import React, { useState, useEffect } from 'react';
import './Calendar.css';

function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [dates, setDates] = useState([]);


    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];


    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };


    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };


    useEffect(() => {
        const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
        const firstDay = getFirstDayOfMonth(currentMonth.getMonth(), currentMonth.getFullYear());
        const daysArray = [];


        for (let i = 0; i < firstDay; i++) {
            daysArray.push(null);
        }


        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        setDates(daysArray);
    }, [currentMonth]);


    const changeMonth = (direction) => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(prev.getMonth() + direction);
            return newMonth;
        });
    };


    const formatMonth = (date) => {
        const options = {year: 'numeric', month: 'long'};
        return date.toLocaleDateString('en-US', options);
    }
 return (
    <div className="calendarContainer">
      <div className="calendarHeader">
        <img
          loading="lazy"
          src ="/icons/left.png"
          className="navIcon"
          alt="Previous month"
          onClick={() => changeMonth(-1)} // Navigate to the previous month
        />
        <div>{formatMonth(currentMonth)}</div>
        <img
          loading="lazy"
          src="/icons/right.png"
          className="navIcon"
          alt="Next month"
          onClick={() => changeMonth(1)} // Navigate to the next month
        />
      </div>
      <div className="calendar">
        <div className="weekDays">
          {days.map(day => (
            <div key={day} className="weekDay">{day}</div>
          ))}
        </div>
        <div className="dates">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`date ${date === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear() ? 'activeDate' : ''}`}
            >
              {date || ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;