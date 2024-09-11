'use client';

import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  parseISO,
} from 'date-fns';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

interface Event {
  id: string;
  date: string; // ISO string
  title: string;
}

type ViewType = 'month' | 'week' | 'day';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');

  // Sample events data - replace with actual data fetching logic
  const [events] = useState<Event[]>([
    {
      id: '1',
      date: '2023-06-04T10:00:00Z',
      title: 'Co-Marketing Organizational Kick Off Meeting',
    },
    { id: '2', date: '2023-06-15T14:00:00Z', title: 'Product Review' },
    // Add more events as needed
  ]);

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(parseISO(event.date), date));
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const dayEvents = getEventsForDate(day);
        days.push(
          <td
            key={day.toString()}
            className={`ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31 ${
              !isSameMonth(day, monthStart) ? 'text-gray-400' : ''
            }`}
          >
            <span className="font-medium text-black dark:text-white">
              {formattedDate}
            </span>
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="mt-1 overflow-hidden text-xs text-primary"
              >
                {event.title}
              </div>
            ))}
          </td>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <tr key={day.toString()} className="grid grid-cols-7">
          {days}
        </tr>
      );
      days = [];
    }
    return <tbody>{rows}</tbody>;
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <tbody>
        <tr className="grid grid-cols-7">
          {days.map((day) => {
            const dayEvents = getEventsForDate(day);
            return (
              <td
                key={day.toString()}
                className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31"
              >
                <span className="font-medium text-black dark:text-white">
                  {format(day, 'EEE d')}
                </span>
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="mt-1 overflow-hidden text-xs text-primary"
                  >
                    {event.title}
                  </div>
                ))}
              </td>
            );
          })}
        </tr>
      </tbody>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    return (
      <tbody>
        <tr className="grid grid-cols-1">
          <td className="ease relative h-screen cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:p-6">
            <span className="font-medium text-black dark:text-white">
              {format(currentDate, 'EEEE, MMMM d, yyyy')}
            </span>
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="mt-2 text-sm text-primary"
              >
                <span className="font-medium">
                  {format(parseISO(event.date), 'HH:mm')}
                </span>{' '}
                - {event.title}
              </div>
            ))}
          </td>
        </tr>
      </tbody>
    );
  };

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentDate((prevDate) => {
      switch (view) {
        case 'month':
          return direction === 'prev'
            ? subMonths(prevDate, 1)
            : addMonths(prevDate, 1);
        case 'week':
          return direction === 'prev'
            ? subWeeks(prevDate, 1)
            : addWeeks(prevDate, 1);
        case 'day':
          return direction === 'prev'
            ? subDays(prevDate, 1)
            : addDays(prevDate, 1);
        default:
          return prevDate;
      }
    });
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Calendar" />

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => navigate('prev')}
            className="text-primary hover:text-primary-dark"
          >
            &lt; Prev
          </button>
          <div>
            <button
              onClick={() => setView('month')}
              className={`mx-1 px-2 py-1 rounded ${
                view === 'month'
                  ? 'bg-primary text-white'
                  : 'text-primary hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`mx-1 px-2 py-1 rounded ${
                view === 'week'
                  ? 'bg-primary text-white'
                  : 'text-primary hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('day')}
              className={`mx-1 px-2 py-1 rounded ${
                view === 'day'
                  ? 'bg-primary text-white'
                  : 'text-primary hover:bg-gray-100'
              }`}
            >
              Day
            </button>
          </div>
          <h2 className="text-xl font-bold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => navigate('next')}
            className="text-primary hover:text-primary-dark"
          >
            Next &gt;
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <th
                  key={day}
                  className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5"
                >
                  <span className="hidden lg:block">{day}</span>
                  <span className="block lg:hidden">{day.slice(0, 1)}</span>
                </th>
              ))}
            </tr>
          </thead>
          {view === 'month' && renderMonthView()}
          {view === 'week' && renderWeekView()}
          {view === 'day' && renderDayView()}
        </table>
      </div>
    </div>
  );
};

export default Calendar;