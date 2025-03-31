import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { firestore } from '@config/firebase';

interface EventData {
  title: string;
  description: string;
  date: string;
}

function AdminEventForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState<EventData>({ title: '', description: '', date: '' });
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing && id) {
      const fetchEvent = async () => {
        try {
          const docRef = doc(firestore, 'events', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setEventData(docSnap.data() as EventData);
          } else {
            console.error('No such event!');
          }
        } catch (error) {
          console.error('Error fetching event:', error);
        }
      };
      fetchEvent();
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && id) {
        const docRef = doc(firestore, 'events', id);
        await updateDoc(docRef, eventData);
        console.log('Event updated');
      } else {
        const eventsCollection = collection(firestore, 'events');
        await addDoc(eventsCollection, eventData);
        console.log('Event created');
      }
      navigate('/admin/events');
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (id && window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(firestore, 'events', id));
        console.log('Event deleted');
        navigate('/admin/events');
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Event' : 'Create New Event'}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={eventData.title}
          onChange={handleChange}
          required
          className="px-3 py-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={eventData.description}
          onChange={handleChange}
          required
          className="px-3 py-2 border rounded"
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="px-3 py-2 border rounded"
        />
        <div className="flex space-x-4">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
            {loading ? 'Saving...' : 'Save'}
          </button>
          {isEditing && (
            <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdminEventForm;