function Component() {
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', category: 'work', start: '2024-09-16T10:00:00', end: '2024-09-16T11:00:00' },
    { id: 2, title: 'Birthday Party', category: 'personal', start: '2024-09-20T18:00:00', end: '2024-09-20T22:00:00' },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', category: '', start: '', end: '' });

  const categories = {
    work: 'bg-blue-500',
    personal: 'bg-green-500',
  };

  const handleCreateEvent = () => {
    setEvents([...events, { id: events.length + 1, ...newEvent }]);
    setNewEvent({ title: '', category: '', start: '', end: '' });
    setShowModal(false);
  };

  const handleDragResize = (event, newStart, newEnd) => {
    setEvents(events.map((e) => e.id === event.id ? { ...e, start: newStart, end: newEnd } : e));
  };

  return (
    <div className="bg-zinc-950 text-white p-6 max-w-7xl mx-auto">
      <header className="flex justify-between mb-6">
        <button className="px-6 py-3 rounded-lg bg-blue-500 hover:scale-[1.02]" onClick={() => setView('month')}>Month</button>
        <button className="px-6 py-3 rounded-lg bg-blue-500 hover:scale-[1.02]" onClick={() => setView('week')}>Week</button>
        <button className="px-6 py-3 rounded-lg bg-blue-500 hover:scale-[1.02]" onClick={() => setView('day')}>Day</button>
      </header>
      {view === 'month' && (
        <div className="grid grid-cols-7 gap-2">
          {Array(35).fill(0).map((_, i) => (
            <div key={i} className="p-2 border border-gray-200 dark:border-gray-800 rounded-xl">
              <span className="text-lg">{i + 1}</span>
              {events.filter((event) => new Date(event.start).getDate() === i + 1).map((event) => (
                <div key={event.id} className={`mt-2 ${categories[event.category]} p-2 rounded-lg`}>
                  <span className="text-sm">{event.title}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {view === 'week' && (
        <div className="grid grid-cols-7 gap-2">
          {Array(7).fill(0).map((_, i) => (
            <div key={i} className="p-2 border border-gray-200 dark:border-gray-800 rounded-xl">
              <span className="text-lg">{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i]}</span>
              {events.filter((event) => new Date(event.start).getDay() === i).map((event) => (
                <div key={event.id} className={`mt-2 ${categories[event.category]} p-2 rounded-lg`}>
                  <span className="text-sm">{event.title}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {view === 'day' && (
        <div className="p-2 border border-gray-200 dark:border-gray-800 rounded-xl">
          <span className="text-lg">{selectedDate.toLocaleDateString()}</span>
          {events.filter((event) => new Date(event.start).toLocaleDateString() === selectedDate.toLocaleDateString()).map((event) => (
            <div key={event.id} className={`mt-2 ${categories[event.category]} p-2 rounded-lg`}>
              <span className="text-sm">{event.title}</span>
            </div>
          ))}
        </div>
      )}
      <button className="px-6 py-3 rounded-lg bg-blue-500 hover:scale-[1.02] absolute bottom-6 right-6" onClick={() => setShowModal(true)}>Create Event</button>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-50 flex justify-center items-center">
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-zinc-950 text-white">
            <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event title" className="p-2 rounded-lg w-full" />
            <select value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} className="p-2 rounded-lg w-full mt-2">
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
            <input type="datetime-local" value={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })} className="p-2 rounded-lg w-full mt-2" />
            <input type="datetime-local" value={newEvent.end} onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })} className="p-2 rounded-lg w-full mt-2" />
            <button className="px-6 py-3 rounded-lg bg-blue-500 hover:scale-[1.02] mt-2" onClick={handleCreateEvent}>Create</button>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full p-2 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-7 gap-2">
          {Array(7).fill(0).map((_, i) => (
            <span key={i} className="text-sm">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Component;
