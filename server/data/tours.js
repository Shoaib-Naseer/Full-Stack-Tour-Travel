// seeders/tourSeeder.js
const toursData = [
  {
    name: "Westminister Bridge",
    description: "Westminister Bridge",
    location: "London",
    base_price: 100.0,
    limit: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    booking_start_date: new Date("2023-08-31"),
    booking_end_date: new Date("2023-09-20"),
    pickupLocationIds: [1, 2],
    categoryIds: [1],
  },
  {
    name: "Bali, Indonesia",
    description: "Description for Tour 2",
    location: "Indonesia",
    base_price: 150.0,
    limit: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    booking_start_date: new Date("2023-09-20"),
    booking_end_date: new Date("2023-12-31"),
    pickupLocationIds: [1],
    categoryIds: [1,2]
  },
  {
    name: "Snowy Mountains, Thailand",
    description: "Snowy Mountains, Thailand",
    location: "Thailand",
    base_price: 150.0,
    limit: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    booking_start_date: new Date("2023-09-20"),
    booking_end_date: new Date("2023-12-31"),
    pickupLocationIds: [3],
    categoryIds: [1,2]
  },
  {
    name: "Beautiful Sunrise, Thailand",
    description: "Beautiful Sunrise, Thailand",
    location: "Thailand",
    base_price: 150.0,
    limit: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    booking_start_date: new Date("2023-09-20"),
    booking_end_date: new Date("2023-12-31"),
    pickupLocationIds: [1],
    categoryIds: [2]
  },
  {
    name: "Nusa Pendia Bali, Indonesia",
    description: "Nusa Pendia Bali, Indonesia",
    location: "Indonesia",
    base_price: 150.0,
    limit: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    booking_start_date: new Date("2023-09-20"),
    booking_end_date: new Date("2023-12-31"),
    pickupLocationIds: [1, 2],
    categoryIds: [1]
  },
  {
    name: "Cherry Blossoms Spring",
    description: "Cherry Blossoms Spring",
    location: "Japan",
    base_price: 150.0,
    limit: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    booking_start_date: new Date("2023-09-20"),
    booking_end_date: new Date("2023-12-31"),
    pickupLocationIds: [1, 2],
  },
  {
    name: "Holmen Lofoten",
    description: "Holmen Lofoten",
    location: "France",
    base_price: 150.0,
    limit: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    booking_start_date: new Date("2023-09-20"),
    booking_end_date: new Date("2023-12-31"),
    pickupLocationIds: [1, 2],
  },

  // Add more tour data as needed
];

module.exports = toursData;
