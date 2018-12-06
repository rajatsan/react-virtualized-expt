const faker = require('faker');

faker.seed(42);

function getData(pageSize, pageNumber) {
  let startIndex = pageSize*pageNumber;
  let res = [];
  for (let i = startIndex; i < startIndex + pageSize; i++) {
    res.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.image.cats(),
      index: i+1,
    })
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(res));
  })

}

module.exports = getData;