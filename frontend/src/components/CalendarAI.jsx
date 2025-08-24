import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const CalendarAI = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Seasons Calendar</h3>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        footer={
          selectedDate ? (
            <p className="text-sm text-gray-600 mt-2">You selected {format(selectedDate, 'PPP')}.</p>
          ) : (
            <p className="text-sm text-gray-600 mt-2">Please pick a day.</p>
          )
        }
      />
      {/* Future: Display events for selected date */}
    </div>
  );
};

export default CalendarAI;
