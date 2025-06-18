let birds = [];
let nextId = 1;

function getAllBirds() {
  return birds;
}

function getBirdById(id) {
  return birds.find((b) => b.id === id);
}

function createBird(data) {
  const newBird = {
    id: nextId++,
    name: data.name,
    species: data.species,
    description: data.description || ''
  };
  birds.push(newBird);
  return newBird;
}

function updateBird(id, data) {
  const bird = getBirdById(id);
  if (!bird) return null;
  bird.name = data.name !== undefined ? data.name : bird.name;
  bird.species = data.species !== undefined ? data.species : bird.species;
  bird.description = data.description !== undefined ? data.description : bird.description;
  return bird;
}

function deleteBird(id) {
  const index = birds.findIndex((b) => b.id === id);
  if (index === -1) return false;
  birds.splice(index, 1);
  return true;
}

module.exports = {
  getAllBirds,
  getBirdById,
  createBird,
  updateBird,
  deleteBird,
};
