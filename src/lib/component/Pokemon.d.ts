export interface Pokemon {
	id: number
	name: string
	type?: string[] | null
	base: Base
}
export interface Base {
	HP: number
	Attack: number
	Defense: number
	Sp_Attack: number
	Sp_Defense: number
	Speed: number
}
