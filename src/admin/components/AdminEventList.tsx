import { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '@config/firebase';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

function AdminEventList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const eventsCollection = collection(firestore, 'events');
    const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(eventsData);
    });
    return unsubscribe;
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(firestore, 'events', id));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
      <Link 
        to="/admin/events/new" 
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create New Event
      </Link>
      <ul className="mt-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 my-2 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p>{event.description}</p>
              <p className="text-sm text-gray-600">{event.date}</p>
            </div>
            <div className="flex space-x-2">
              <Link 
                to={`/admin/events/edit/${event.id}`} 
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Edit
              </Link>
              <button 
                onClick={() => handleDelete(event.id)} 
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminEventList;