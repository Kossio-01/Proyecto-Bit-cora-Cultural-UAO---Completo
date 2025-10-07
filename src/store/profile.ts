import { create } from 'zustand'

export type ProfileState = {
	name: string
	email: string
	avatarUrl: string
	attended: number
	favoritesCount: number
	upcoming: number
	interests: string[]
	setInterests: (i: string[]) => void
}

export const useProfile = create<ProfileState>(() => ({
	name: 'María Rodriguez',
	email: 'maria.rodriguez@uao.edu.co',
	avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256',
	attended: 12,
	favoritesCount: 8,
	upcoming: 5,
	interests: ['Concierto', 'Arte', 'Cine', 'Charlas'],
	setInterests: () => {},
}))
