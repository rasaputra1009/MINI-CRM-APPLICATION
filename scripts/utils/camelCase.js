module.exports = str =>
  str
    .split(/(?:-|\s|_)+/)
    .map(chunk => `${chunk[0].toUpperCase()}${chunk.slice(1)}`)
    .join('');
