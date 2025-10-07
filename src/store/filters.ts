import { create } from 'zustand'

export type FiltersState = {
	query: string
	categories: string[]
	days: string[]
	setQuery: (q: string) => void
	setCategories: (c: string[]) => void
	toggleCategory: (c: string) => void
	toggleDay: (d: string) => void
	reset: () => void
}

export const useFilters = create<FiltersState>((set) => ({
	query: '',
	categories: [],
	days: [],
	setQuery: (q) => set({ query: q }),
	setCategories: (c) => set({ categories: c }),
	toggleCategory: (c) =>
		set((s) => ({
			categories: s.categories.includes(c)
				? s.categories.filter((x) => x !== c)
				: [...s.categories, c],
		})),
	toggleDay: (d) =>
		set((s) => ({
			days: s.days.includes(d) ? s.days.filter((x) => x !== d) : [...s.days, d],
		})),
	reset: () => set({ query: '', categories: [], days: [] }),
}))
