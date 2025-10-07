import { create } from 'zustand'

export type FavoritesState = {
	ids: string[]
	toggle: (id: string) => void
	isFavorite: (id: string) => boolean
}

const storageKey = 'uao:favorites'

function load(): string[] {
	try {
		const raw = localStorage.getItem(storageKey)
		return raw ? JSON.parse(raw) : []
	} catch {
		return []
	}
}

export const useFavorites = create<FavoritesState>((set, get) => ({
	ids: load(),
	toggle: (id) =>
		set((s) => {
			const exists = s.ids.includes(id)
			const next = exists ? s.ids.filter((x) => x !== id) : [...s.ids, id]
			localStorage.setItem(storageKey, JSON.stringify(next))
			return { ids: next }
		}),
	isFavorite: (id) => get().ids.includes(id),
}))
