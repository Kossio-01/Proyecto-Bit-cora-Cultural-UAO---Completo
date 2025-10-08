// import dependencies
import axios from 'axios'
import { z } from 'zod'

const urlOrPath = z.string().url().or(z.string().startsWith('/'))

const EventSchema = z.object({
	id: z.string(),
	titulo: z.string(),
  categoria: z.enum(['CONCIERTO', 'CULTURA', 'DEPORTIVO', 'ACADEMICO']),
	fecha: z.string(),
	lugar: z.string(),
	imagen: urlOrPath.optional(),
	video: urlOrPath.optional(),
	audio: urlOrPath.optional(),
	tipoMultimedia: z.enum(['imagen', 'video', 'audio']).optional(),
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
