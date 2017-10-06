module.exports = (name) => /-app$/.test(name) ? name : `${name}-app`;
