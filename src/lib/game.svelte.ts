import pokedex from './pokedex.json'
import views from './views.json'
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

export class Fighter {
	pokemon: Pokemon = $state({} | null)
	items: Items = $state([])
	add(obj) {
		this.pokemon = obj
		this.pokemon.agility = 1
	}
	reset() {
		this.pokemon = null
	}
}

export interface Views {
	slug: string
	title: string
	viewType: string
}

export let player = new Fighter()
export let enemy = new Fighter()


class Game {
	pokedex: Pokemon = $state([])
	constructor(pokedex) {
		this.pokedex = pokedex
	}

	getPkmn() {
		const pkmn = this.pokedex.shift()
		return pkmn
	}
}


export let game = new Game(pokedex)

export const typeColor = {
	Normal: '#A8A878',
	Fire: '#F08030',
	Water: '#6890F0',
	Electric: '#F8D030',
	Grass: '#78C850',
	Ice: '#98D8D8',
	Fighting: '#C03028',
	Poison: '#A040A0',
	Ground: '#E0C068',
	Flying: '#A890F0',
	Psychic: '#F85888',
	Bug: '#A8B820',
	Rock: '#B8A038',
	Ghost: '#705898',
	Dragon: '#7038F8',
	Dark: '#EE99AC',
	Steel: '#B8B8D0'
}

export const getTypeStyle = (key: String) => {
	const color = typeColor[key] ? typeColor[key] : '#fefefe'
	const style = `background-color: ${color};`
	return style
}
