QUESTION:

Given two airport codes, write a function which finds an efficient path between the two given points. The function should return an array of flight numbers.
A valid path must have available seats and the arrival time must be before the next point in the path's departure time. The number of connecting flights can be more than one.
For the example below, an input of 'NYC', 'WIL' should return: [1, 3, 5]. Flight 2 is ineligible because it has no available seats. Flight 4 does not qualify because it's departure date is before it's closest connecting flight's arrival date (flight 3).
