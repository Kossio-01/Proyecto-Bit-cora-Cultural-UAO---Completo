import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CalendarEvent {
  id: string
  titulo: string
  fecha: string
  lugar: string
  categoria: string
  imagen?: string
}

interface CalendarStore {
  events: CalendarEvent[]
  addEvent: (event: CalendarEvent) => void
  removeEvent: (id: string) => void
  isInCalendar: (id: string) => boolean
}

export const useCalendar = create<CalendarStore>()(
  persist(
    (set, get) => ({
      events: [],
      addEvent: (event) => {
        const { events } = get()
        if (!events.find(e => e.id === event.id)) {
          set({ events: [...events, event] })
        }
      },
      removeEvent: (id) => {
        const { events } = get()
        set({ events: events.filter(e => e.id !== id) })
      },
      isInCalendar: (id) => {
        const { events } = get()
        return events.some(e => e.id === id)
      }
    }),
    {
      name: 'calendar-storage'
    }
  )
)
