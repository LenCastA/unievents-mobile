import { EVENTS } from '@/data/events';
import { EventCategory, UniversityEvent } from '@/types/event';

// Punto único de acceso a datos: puede reemplazarse por fetch a una API REST.
export async function getEvents(category?: EventCategory): Promise<UniversityEvent[]> {
  return category ? EVENTS.filter((event) => event.category === category) : EVENTS;
}
export async function getEventById(id: string): Promise<UniversityEvent | undefined> {
  return EVENTS.find((event) => event.id === id);
}
