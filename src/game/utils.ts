export const sleep = (milliseconds = 1000) =>
	new Promise((resolve) => setTimeout(resolve, milliseconds))

export const fetchData = async (url = '') => {
	try {
		const res = await fetch(url)
		const data = await res.json()
		return data
	} catch (error) {
		throw new Error(error)
	}
}

export const paginate = (arr = [], size = 0) =>
	arr.reduce((acc, val, i) => {
		let idx = Math.floor(i / size)
		let page = acc[idx] || (acc[idx] = [])
		page.push(val)

		return acc
	}, [])

export const shuffle = (array = []) => {
	let currentIndex = array.length
	let temporaryValue, randomIndex
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}

	return array
}
