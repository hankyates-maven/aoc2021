import data from './data.json'

// Part 1
console.log(
  data
  .reduce(({prev, count}, d) => 
    ({
      prev: d,
      count: d > prev ? count + 1 : count
    }), {prev: null, count: 0})
)

//Part 2
console.log(
  data
    .map((d, i) => data.slice(i, i+3))
    .filter(d => d.length === 3)
    .map(d => d.reduce((a, dd) => a + dd, 0))
    .reduce(({prev, count}, d) =>
      ({
        prev: d,
        count: d > prev ? count + 1 : count
      }), {prev: Infinity, count: 0})
)
