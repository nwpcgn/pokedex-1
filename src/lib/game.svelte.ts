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

export interface Items {
	id: number
	name: string
}

export class Game {
	pokemon: Pokemon = $state()
	items: Items = $state([])
	add(obj) {
		this.pokemon = obj
		this.pokemon.agility = 1
	}
}

export let player = new Game()
export let enemy = new Game()

class Box {
	width = $state(0)
	height = $state(0)
	x = $state(0)
	y = $state(0)
	current = $derived(this.y * this.width + this.x)

	constructor(width, height, x, y) {
		this.width = width
		this.height = height
		this.x = x
		this.y = y
	}

	update(x, y) {
		this.x = x
		this.y = y
	}
}

export let box = new Box(12, 12, 0, 0)
