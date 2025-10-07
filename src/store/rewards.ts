import { create } from 'zustand'

export type RewardState = {
	points: number
	cashEarned: number
	history: { id: string; type: 'points' | 'cash'; amount: number; label: string }[]
	addPoints: (amt: number, label: string) => void
	addCash: (amt: number, label: string) => void
}

export const useRewards = create<RewardState>((set) => ({
	points: 150,
	cashEarned: 50000,
	history: [
		{ id: 'h1', type: 'cash', amount: 20000, label: 'Asististe al festival de Cali 22' },
		{ id: 'h2', type: 'points', amount: 50, label: 'Compartiste evento en redes sociales' },
	],
	addPoints: (amt, label) => set((s) => ({ points: s.points + amt, history: [{ id: crypto.randomUUID(), type: 'points', amount: amt, label }, ...s.history] })),
	addCash: (amt, label) => set((s) => ({ cashEarned: s.cashEarned + amt, history: [{ id: crypto.randomUUID(), type: 'cash', amount: amt, label }, ...s.history] })),
}))
