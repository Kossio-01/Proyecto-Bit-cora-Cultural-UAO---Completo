import { create } from 'zustand'

export type RewardState = {
	points: number
	cashEarned: number
	history: { id: string; type: 'points' | 'cash' | 'purchase'; amount: number; label: string }[]
	sharedEvents: Set<string> // Track de eventos ya compartidos
	addPoints: (amt: number, label: string) => void
	addCash: (amt: number, label: string) => void
	purchaseWithPoints: (pointsCost: number, eventName: string) => boolean
	canEarnPointsForShare: (eventId: string) => boolean
	markEventAsShared: (eventId: string) => void
}

export const useRewards = create<RewardState>((set) => ({
	points: 255,
	cashEarned: 50000,
	sharedEvents: new Set(),
	history: [
		{ id: 'h1', type: 'points', amount: 100, label: 'Asististe al festival de Cali 22' },
		{ id: 'h2', type: 'points', amount: 5, label: 'Compartiste evento en redes sociales' },
	],
	addPoints: (amt, label) => set((s) => ({ points: s.points + amt, history: [{ id: crypto.randomUUID(), type: 'points', amount: amt, label }, ...s.history] })),
	addCash: (amt, label) => set((s) => ({ cashEarned: s.cashEarned + amt, history: [{ id: crypto.randomUUID(), type: 'cash', amount: amt, label }, ...s.history] })),
	purchaseWithPoints: (pointsCost, eventName) => {
		const state = useRewards.getState()
		if (state.points >= pointsCost) {
			set((s) => ({ 
				points: s.points - pointsCost, 
				history: [{ id: crypto.randomUUID(), type: 'purchase', amount: -pointsCost, label: `Entrada comprada: ${eventName}` }, ...s.history] 
			}))
			return true
		}
		return false
	},
	canEarnPointsForShare: (eventId) => {
		const state = useRewards.getState()
		return !state.sharedEvents.has(eventId)
	},
	markEventAsShared: (eventId) => {
		set((s) => ({ 
			sharedEvents: new Set([...s.sharedEvents, eventId])
		}))
	},
}))
