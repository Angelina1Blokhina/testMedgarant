import React from 'react';

const busy = [
  { start: '10:30', stop: '10:50' },
  { start: '18:40', stop: '18:50' },
  { start: '14:40', stop: '15:50' },
  { start: '16:40', stop: '17:20' },
  { start: '20:05', stop: '20:20' },
];
 const Schedule = () => {
    const getFreeTimeSlots = () => {
        const startTime = new Date().setHours(9, 0, 0, 0);
        const endTime = new Date().setHours(21, 0, 0, 0);
        const timeSlots = [];
        let currentTime = startTime
        while (currentTime+ 30 * 60000 <= endTime) {
            const startSlot = new Date(currentTime);
            const endSlot = new Date(currentTime + 30 * 60000);
            let isSlotAvailable = true;
            for (const appointment of busy) {
                const [startHour, startMinute] = appointment.start.split(':');
                const appointmentStart = new Date();
                appointmentStart.setHours(startHour, startMinute, 0, 0);
                const [stopHour, stopMinute] = appointment.stop.split(':');
                const appointmentStop = new Date();
                appointmentStop.setHours(stopHour, stopMinute, 0, 0);
                if  ((startSlot >= appointmentStart && startSlot < appointmentStop) ||
                    (endSlot > appointmentStart && endSlot <= appointmentStop)){
                        currentTime = appointmentStop.getTime();
                        isSlotAvailable = false;
                };
            }
            if (isSlotAvailable) {
                const startTimeString = startSlot.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false
                });
                const endTimeString = endSlot.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false
                });
                timeSlots.push(`${startTimeString} - ${endTimeString}`);
                currentTime += 30 * 60000;
            }
      
    }
    return timeSlots;
  };

  const freeTimeSlots = getFreeTimeSlots();

  return (
    <div>
      <h3>Свободные окна:</h3>
      <ul>
        {freeTimeSlots.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
