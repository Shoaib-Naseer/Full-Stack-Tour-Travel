"use strict";
const tourPickupLocationsData = [
  // Define the associations between tours and pickup locations
  {
    tour_id: 1, // The ID of the tour associated with this pickup location
    pickup_location_id: 1, // The ID of the pickup location associated with this tour
  },
  {
    tour_id: 1,
    pickup_location_id: 2,
  },
  {
    tour_id: 2,
    pickup_location_id: 1,
  },
  {
    tour_id: 3,
    pickup_location_id: 3,
  },
  {
    tour_id: 4,
    pickup_location_id: 1,
  },
  {
    tour_id: 5,
    pickup_location_id: 1,
  },
  {
    tour_id: 5,
    pickup_location_id: 2,
  },
  {
    tour_id: 6,
    pickup_location_id: 1,
  },
  {
    tour_id: 6,
    pickup_location_id: 2,
  },
  {
    tour_id: 7,
    pickup_location_id: 1,
  },
  {
    tour_id: 7,
    pickup_location_id: 2,
  },
  // Add more associations as needed
];

module.exports = tourPickupLocationsData;
