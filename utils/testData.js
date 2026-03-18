// const fs = require('fs');

// function generateRandomUser() {
//   const username = `user_${Math.floor(Math.random() * 10000)}`;
//   const password = `Pass${Math.floor(Math.random() * 100)}@123`;
//   const email = `${username.toLowerCase()}@testmail.com`;

//   const user = { username, email, password };
//   fs.writeFileSync('latest-user.json', JSON.stringify(user, null, 2));
//   console.log('✅ Saved latest user to latest-user.json');
//   return user;
// }

// function generateInvalidUser() {
//   const invalidemail = `invalid_${Math.floor(Math.random()*1000)}@testmail.com`;
//   const invalidpassword = `invalid_${Math.floor(Math.random() * 1000)}@fake.com`;
//   const invaliduser = { invalidemail, invalidpassword };
//   return invaliduser;
// }

// function getLatestUser() {
//   try {
//     const data = fs.readFileSync('latest-user.json', 'utf8');
//     const user = JSON.parse(data);
//     console.log('✅ Loaded saved user:', user.email, user.password);
//     return user;
//   } catch (error) {
//     console.log('❌ No latest-user.json found. Run signup test first!');
//     return null;
//   }
// }

// // ✅ SINGLE export - BOTH functions
// module.exports = { generateRandomUser, getLatestUser, generateInvalidUser};


const fs = require('fs');
async function generateRandomUser() {
  const { faker } = await import('@faker-js/faker');
  const username = faker.person.fullName().replace(/\s+/g, '_').toLowerCase();
  const password = faker.internet.password({ length: 12, memorable: true });
  const email = faker.internet.email(username);

  const user = { username, email, password };
  fs.writeFileSync('latest-user.json', JSON.stringify(user, null, 2));
  console.log('✅ Saved latest user:', user.email);
  return user;
}

async function generateInvalidUser() {
  const { faker } = await import('@faker-js/faker');
  const invalidemail = `invalid_${faker.string.alphanumeric(6)}@test.com`;
  const invalidpassword = faker.string.alpha(6);
  return { invalidemail, invalidpassword };
}

async function getLatestUser() {
  try {
    const data = fs.readFileSync('latest-user.json', 'utf8');
    const user = JSON.parse(data);
    console.log('✅ Loaded saved user:', user.email);
    return user;
  } catch (error) {
    console.log('❌ No latest-user.json found. Run signup test first!');
    return null;
  }
}

module.exports = { generateRandomUser, getLatestUser, generateInvalidUser };
