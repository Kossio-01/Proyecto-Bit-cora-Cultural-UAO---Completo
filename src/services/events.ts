// import dependencies
import axios from 'axios'
import { z } from 'zod'

const EventSchema = z.object({
	id: z.string(),
	titulo: z.string(),
  categoria: z.enum(['CONCIERTO', 'CULTURA', 'DEPORTIVO', 'ACADEMICO']),
	fecha: z.string(),
	lugar: z.string(),
	imagen: z.string().url().optional(),
	orientacion: z.enum(['horizontal', 'vertical']).optional(),
	duracion: z.string().optional(),
	entrada: z.string().optional(),
	precioCOP: z.number().optional(),
	precioPts: z.number().optional(),
	descripcion: z.string().optional(),
})

export type EventItem = z.infer<typeof EventSchema>

export async function fetchEvents(): Promise<EventItem[]> {
	const response = await axios.get('/data/events.json', { headers: { 'Cache-Control': 'no-cache' } })
	const parsed = z.array(EventSchema).safeParse(response.data)
	if (!parsed.success) {
		console.error(parsed.error)
		return []
	}
	return parsed.data
}
