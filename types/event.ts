export const EVENT_CATEGORIES = ['Todos', 'Académico', 'Tecnología', 'Cultural', 'Deportes', 'Otros'] as const;
export type EventCategory = Exclude<(typeof EVENT_CATEGORIES)[number], 'Todos'>;
export type UniversityEvent = { id: string; title: string; description: string; category: EventCategory; date: string; time: string; location: string; imageUrl?: string };
