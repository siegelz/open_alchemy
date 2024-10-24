
import { all, initial, recipes } from './recipes.js';

var allRecipes = recipes.reduce((comb, [first, second]) => {
  if (!comb.hasOwnProperty(second)) comb[second] = [];
  comb[second].push(first);
  return comb;
}, {});

module.exports = allRecipes;
