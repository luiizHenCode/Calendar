import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/all";

import styles from "./styles.module.scss";

const date = new Date();

export function Calendar({ getDateSelect }) {
  const [prevMonthDays, setPrevMonthDays] = useState([]);
  const [currentMonthDays, setCurrentMonthDays] = useState([]);
  const [nextMonthDays, setNextMonthDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [dateSelect, setDateSelect] = useState(null);

  const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"];

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  date.setDate(1);

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  // Get prev month days
  const getPrevMonthDays = async () => {
    let days = [];
    for (let x = firstDayIndex; x > 0; x--) {
      days.push(prevLastDay - x + 1);
    }
    setPrevMonthDays(days);
  };

  // Get current month days
  const getCurrentMonthDays = async () => {
    let days = [];
    for (let x = 1; x <= lastDay; x++) {
      days.push(x);
    }
    setCurrentMonthDays(days);
  };

  // Get next month days
  const getNextMonthDays = async () => {
    let days = [];
    for (let x = 1; x <= nextDays; x++) {
      days.push(x);
    }
    setNextMonthDays(days);
  };

  // See prev month
  const handlePrevMonth = async () => {
    console.log("prev month");
    date.setMonth(date.getMonth() - 1);
    await runAllFunctions();
  };

  // See next month
  const handleNextMonth = async () => {
    console.log("next month");
    date.setMonth(date.getMonth() + 1);
    await runAllFunctions();
  };

  // Return date in format dd/mm/yyyy
  const handleClickGetDate = (day, month, year) => {
    const date = {
      day,
      month,
      year,
    };
    setDateSelect(date);
    if (getDateSelect) getDateSelect(date);
  };

  // Run all functions
  const runAllFunctions = async () => {
    getPrevMonthDays();
    getCurrentMonthDays();
    getNextMonthDays();
    setCurrentMonth(date.getMonth());
  };

  useEffect(() => {
    runAllFunctions();
  }, [currentMonth]);

  return (
    <div className={styles.container}>
      <div className={styles.month}>
        <button onClick={handlePrevMonth}>
          <IoIosArrowBack size={24} />
        </button>

        <div>
          <span className={styles.monthName}>{months[date.getMonth()]}</span>
          <span className={styles.monthYear}> {date.getFullYear()}</span>
        </div>

        <button onClick={handleNextMonth}>
          <IoIosArrowForward size={24} />
        </button>
      </div>

      <div className={styles.weekDays}>
        {weekDays.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>

      <div className={styles.days}>
        {prevMonthDays.map((day, index) => (
          <PrevDay key={index} day={day} click={handlePrevMonth} />
        ))}

        {currentMonthDays.map((day, index) => {
          if (
            day === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
          ) {
            return (
              <Day
                key={index}
                isToday={true}
                isSelected={
                  dateSelect &&
                  dateSelect.day === day &&
                  dateSelect.month === date.getMonth()
                }
                day={day}
                click={handleClickGetDate}
              />
            );
          } else {
            return (
              <Day
                key={index}
                isSelected={
                  dateSelect &&
                  dateSelect.day === day &&
                  dateSelect.month === date.getMonth()
                }
                day={day}
                click={handleClickGetDate}
              />
            );
          }
        })}

        {nextMonthDays.map((day, index) => (
          <NextDay key={index} day={day} click={handleNextMonth} />
        ))}
      </div>
    </div>
  );
}

// Day month component
const Day = ({ day, isToday, isSelected, click, ...rest }) => {
  return (
    <div
      onClick={() => click(day, date.getMonth(), date.getFullYear())}
      className={`${isToday ? styles.today : ""} ${
        isSelected ? styles.selected : ""
      }`}
      {...rest}
    >
      {day}
    </div>
  );
};

// Day prev month component
const PrevDay = ({ day, click, ...rest }) => {
  return (
    <div onClick={click} className={styles.prevDate} {...rest}>
      {day}
    </div>
  );
};

// Day next month component
const NextDay = ({ day, click, ...rest }) => {
  return (
    <div onClick={click} className={styles.nextDate} {...rest}>
      {day}
    </div>
  );
};
