const usersData = [
    {
      username: "adminUser",
      email: "admin@example.com",
      password: "adminPassword",
      gender: "Male",
      birthdate: new Date("1990-01-01"),
      location: "City A, Country X",
      profile_image: '../uploads/images/ava-1.jpg',
      role_id: 1,
      createdAt: new Date(), // Provide a valid createdAt value
      updatedAt: new Date(), // Provide a valid updatedAt value
    },
    {
      username: "user1",
      email: "user1@example.com",
      password: "user1Password",
      gender: "Female",
      birthdate: new Date("1995-05-15"),
      location: "City B, Country Y",
      profile_image: '../uploads/images/ava-2.jpg',
      role_id: 2,
      createdAt: new Date(), // Provide a valid createdAt value
      updatedAt: new Date(), // Provide a valid updatedAt value
    },
    {
        username: "user2",
        email: "user2@example.com",
        password: "user2Password",
        gender: "Female",
        birthdate: new Date("1995-05-15"),
        location: "City B, Country Y",
        profile_image: '../uploads/images/ava-3.jpg',
        role_id: 2,
        createdAt: new Date(), // Provide a valid createdAt value
        updatedAt: new Date(), // Provide a valid updatedAt value
      },
  ];

  module.exports = usersData
  