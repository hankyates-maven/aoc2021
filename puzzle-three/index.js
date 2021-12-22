import data from './data.json'
import _ from 'lodash/fp.js'
const {times, identity, over, size, negate, nth, tap, reduce, pipe, map, zipAll} = _

// Part 1
let [gamma, epsilon] = pipe(
    map(d => d.split('')),
    zipAll,
    map(d => d.reduce((a, dd) => a + parseInt(dd, 10), 0)),
    reduce(([gamma, epsilon], d) => [
      gamma + (d > (data.length / 2) ? '1' : '0'),
      epsilon + (d < (data.length / 2) ? '1' : '0'),
    ], ['', '']),
    map((d) => parseInt(d, 2)),
  )(data)

console.log(
  'Part 1: ',
  gamma * epsilon
)

// Part 2
let allCB = mcb => pipe(
  over([
    pipe(
      size,
      s => s / 2
    ),
    pipe(
      map(d => d.split('')),
      zipAll,
      map(d => d.reduce((a, dd) => a + parseInt(dd, 10), 0)),
    ),
  ]),
  ([s, d]) => d.map(dd => mcb ? dd >= s : dd < s),
)
let nMCB = position => pipe(allCB(true), nth(position))
let nLCB = position => pipe(allCB(false), nth(position))

let filterCB = mcb => position => pipe(
  over([
    identity,
    mcb ? nMCB(position) : nLCB(position),
  ]),
  ([dta, sb]) => dta.filter(d => sb ? d[position] === '1' : d[position] === '0'),
)

let recurse = (mcb, position, dta) => {
  if (dta.length === 1) {
    return dta[0]
  } else {
    return recurse(mcb, position + 1, filterCB(mcb)(position)(dta))
  }
}

console.log(
  'Part 2: ',
  parseInt(recurse(true, 0, data), 2) * parseInt(recurse(false, 0, data), 2),
)

