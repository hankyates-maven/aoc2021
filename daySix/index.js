import data from './data.json'
import _ from 'lodash/fp.js'

const {memoize, flatMap, over, size, negate, nth, tap, reduce, pipe, map, zipAll} = _

// Part 1
const generation = flatMap(fish => fish === 0 ? [6, 8] : [fish - 1])
const recurse = (generationNum, dta) => generationNum === 80 ? dta.length : recurse(generationNum + 1, generation(dta))

console.log(
  recurse(0, data)
)

// Part 2
let currentGeneration = data
for (let i = 0; i < 256; i++) {
  currentGeneration = currentGeneration.flatMap(memoize(fish => fish === 0 ? [6, 8] : [fish - 1]))
}

console.log(
  currentGeneration
)
