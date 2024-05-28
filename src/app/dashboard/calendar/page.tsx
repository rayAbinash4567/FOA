import DefaultLayout from '@/components/Layouts/DefaultLayout';
import MyCalendar from '@/components/MyCalender';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinnacle Partnerships Calender | Partnerships Calander ',
  description: 'This is our Partnerships  Calander',
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <MyCalendar />
    </DefaultLayout>
  );
};

export default CalendarPage;
