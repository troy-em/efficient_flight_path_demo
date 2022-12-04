const flightsData = [ {
    flightNumber: 1,
    departureDate: '2022-01-01T15:00:00-06:00',
    arrivalDate: '2022-01-01T17:00:00-05:00',
    availableSeats: 10,
    departurePoint: 'MCI',
    arrivalPoint: 'NYC',
  },
  {
    flightNumber: 2,
    departureDate: '2022-01-01T18:00:00-05:00',
    arrivalDate: '2022-01-02T19:00:00+03:00',
    availableSeats: 0,
    departurePoint: 'NYC',
    arrivalPoint: 'NBI',
  },
  {
    flightNumber: 3,
    departureDate: '2022-01-02T18:00:00-05:00',
    arrivalDate: '2022-01-03T19:00:00+03:00',
    availableSeats: 21,
    departurePoint: 'NYC',
    arrivalPoint: 'NBI',
  },
  {
    flightNumber: 4,
    departureDate: '2022-01-03T18:00:00+03:00',
    arrivalDate: '2022-01-03T19:00:00+03:00',
    availableSeats: 4,
    departurePoint: 'NBI',
    arrivalPoint: 'WIL',
  },
  {
    flightNumber: 5,
    departureDate: '2022-01-03T20:00:00+03:00',
    arrivalDate: '2022-01-03T21:00:00+03:00',
    availableSeats: 3,
    departurePoint: 'NBI',
    arrivalPoint: 'WIL',
  } ];

function flightpath(departurepoint, arrivalpoint) {
    console.log("Dep,Arr:" +departurepoint +","+arrivalpoint)
    // check for flights that match the user arrival point input and departure point
    let matchedarrivalpoint = []
    let matcheddeparturepoint = []
    for (var i = 0; i < flightsData.length; i++) {
        if (flightsData[i].arrivalPoint == arrivalpoint) {
          matchedarrivalpoint.push(flightsData[i].flightNumber)
        }
        if (flightsData[i].departurePoint == departurepoint) {
          matcheddeparturepoint.push(flightsData[i].flightNumber)
        }
    }
    if (matcheddeparturepoint.length === 0) {
          alert("Sorry! No Flight From "+departurepoint+" currently!")
    } else {
      console.log("Matched Departure Points: "+matcheddeparturepoint)
      if (matchedarrivalpoint.length === 0) {
        alert("Sorry! No Flight To "+arrivalpoint+" currently!")
      } else {
        console.log("Matched Arrival Points: "+matchedarrivalpoint)
      }
    }
}



function inputCheck() {
    // Get Departure Point Input
    var form = document.forms[0];
    var selectDeparturePoint = form.querySelector('input[name="departurepoint"]');
    var departurepoint = selectDeparturePoint.value;
    if (departurepoint=="") {
        alert("Please Enter Departure Point !")

    } else {
        console.log("Departure Point: " +departurepoint)
        // Get Arrival Point Input
        var selectArrivalPoint = form.querySelector('input[name="arrivalpoint"]');
        var arrivalpoint = selectArrivalPoint .value;
        if (arrivalpoint=="") {
            alert("Please Enter Arrival Point !")
        } else {
          console.log("Arrival Point: " +arrivalpoint)
          flightpath(departurepoint, arrivalpoint)
        }
    }
}