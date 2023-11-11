import './App.scss';
import AddEvent from './components/events/add-event.component';
import EventsBoard from './components/events/events-board.component';
import Hours from './components/helpers/hours.component';
import useEvents from './hooks/use-events';

function App() {
  const [events, addNewEvent] = useEvents([]);

  return (
    <div className="container-fluid app-container d-flex my-5">
      <AddEvent addNewEvent={addNewEvent}/>
      <Hours />
      <EventsBoard events={events} />
    </div>
  );
}

export default App;
