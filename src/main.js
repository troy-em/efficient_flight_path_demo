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
  availableSeats: 1,
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
  availableSeats: 0,
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

document.getElementById('flights').innerHTML = flightsData.map(flight =>
`<div class="flightdiv">
  <div><b style="color: #2F558E;">Flight:</b> ${flight.flightNumber}</div>
  <hr>
  <div><b style="color: #2F558E;">Depature Date:</b><br> ${new Date(flight.departureDate).toLocaleString()}</div>
  <div><b style="color: #2F558E;">Arrival Date:</b><br>${new Date(flight.arrivalDate).toLocaleString()}</div>
  <div><b style="color: #2F558E;">Seats Available:</b><br>${flight.availableSeats}</div>
  <div><b style="color: #2F558E;">From:</b><br> ${flight.departurePoint}</div>
  <div><b style="color: #2F558E;">To:</b><br> ${flight.arrivalPoint}</div>
</div>`
).join('')

function efficientflightpath(departurepoint, arrivalpoint) {
  // check for flights that match the user arrival point input and departure point
  let efficientroute = document.getElementById("routearr")
  efficientroute.innerHTML = ""
  let matcheddeparturepoint = []
  let matchedarrivalpoint = []
  let matcheddeparturepointwithavailableseats = []
  let matchedarrivalpointwithavailableseats = []
  let directflights = []
  let nodirectflights = false
  let directflightsduration = []
  for (var i = 0; i < flightsData.length; i++) {
    if (flightsData[i].departurePoint == departurepoint) {
      matcheddeparturepoint.push(flightsData[i].flightNumber)
    }
    if (flightsData[i].arrivalPoint == arrivalpoint) {
      matchedarrivalpoint.push(flightsData[i].flightNumber)
    }
  }

  // check if departure and arrival points selected are available
  if (matcheddeparturepoint.length === 0) {
      efficientroute.style.color = '#f94449'
      efficientroute.innerHTML = "Sorry! No Flight From "+departurepoint+" currently!"
  } else {
    console.log("Matched Departure Points: "+matcheddeparturepoint)
    if (matchedarrivalpoint.length === 0) {
      efficientroute.style.color = '#f94449'
      efficientroute.innerHTML = "Sorry! No Flight To "+arrivalpoint+" currently!"
    } else {
      console.log("Matched Arrival Points: "+matchedarrivalpoint)

      // get only flights with available sits
      for (var i = 0; i < matcheddeparturepoint.length; i++) {
        let currentflightnumber = matcheddeparturepoint[i]
        for (var j = 0; j < flightsData.length; j++) {
          if (flightsData[j].flightNumber ==  currentflightnumber && flightsData[j].availableSeats != 0) {
            matcheddeparturepointwithavailableseats.push(currentflightnumber)
          }
        }
      }
      console.log("matcheddeparturepointwithavailableseats: "+matcheddeparturepointwithavailableseats)

      for (var i = 0; i < matchedarrivalpoint.length; i++) {
        let currentflightnumber = matchedarrivalpoint[i]
        for (var j = 0; j < flightsData.length; j++) {
          if (flightsData[j].flightNumber ==  currentflightnumber && flightsData[j].availableSeats != 0) {
            matchedarrivalpointwithavailableseats.push(currentflightnumber)
          }
        }
      }
      console.log("matchedarrivalpointwithavailableseats: "+matchedarrivalpointwithavailableseats)

      if (matcheddeparturepointwithavailableseats.length === 0 || matchedarrivalpointwithavailableseats.length === 0) {
        efficientroute.style.color = '#f94449'
        efficientroute.innerHTML = "Sorry! No Complete Connection from " +departurepoint+" to "+arrivalpoint+" with available seats"
      } else {

        // check for direct flights
        for (var i = 0; i < matcheddeparturepointwithavailableseats.length; i++) {
          let currentflightnumber =  matcheddeparturepointwithavailableseats[i]
          for (var j = 0; j < matchedarrivalpointwithavailableseats.length; j++) {
            // if no direct flights
            if (matchedarrivalpointwithavailableseats[j] != currentflightnumber) {
              console.log("Not Direct Flights")
              nodirectflights = true
            } else {
              directflights.push(matchedarrivalpointwithavailableseats[j])
              console.log("Direct Flights: "+directflights)

              // if direct flights are more than one, compare flight duration and pick the fastest
              if (directflights.length > 1) {
                for (var i = 0; i < directflights.length; i++) {
                  let currentflightnumber = directflights[i]
                  for (var j = 0; j < flightsData.length; j++) {
                    if (flightsData[j].flightNumber ==  currentflightnumber) {
                      directflightsduration.push(Math.abs((new Date(flightsData[j].arrivalDate))-(new Date(flightsData[j].departureDate))))
                    }
                  }
                }

                console.log("directflightsduration: "+directflightsduration)
                let fastestdirectflightduration = Math.min(...directflightsduration)
                console.log("Fastest Direct Flight Duration: "+fastestdirectflightduration)
                let fastestdirectflights = directflightsduration.filter((v) => (v === fastestdirectflightduration)).length;
                console.log("fastestdirectflights: "+fastestdirectflights)

                // if fastestdirectflights is more than one pick the earliest departure time
                if (fastestdirectflights > 1) {
                  console.log("fastestdirectflights more than one....")
                  let directflightsdeparturetime =[]
                  for (var i = 0; i < directflights.length; i++) {
                    let currentflightnumber = directflights[i]
                    for (var j = 0; j < flightsData.length; j++) {
                      if (flightsData[j].flightNumber ==  currentflightnumber) {
                        directflightsdeparturetime.push(new Date(flightsData[j].departureDate))
                      }
                    }
                  }
                  console.log("directflightsdeparturetime: "+directflightsdeparturetime)
                  let ordereddirectflightsdeparturetime = directflightsdeparturetime.sort(function(a,b){return Date.parse(a) > Date.parse(b)})
                  let earliestdirectflightdeptime = ordereddirectflightsdeparturetime[0]
                  console.log("earliestdirectflightdeptime: "+earliestdirectflightdeptime)
                  for (var i = 0; i < directflights.length; i++) {
                    let currentflightnumber = directflights[i]
                    for (var j = 0; j < flightsData.length; j++) {
                      if (flightsData[j].flightNumber ==  currentflightnumber && (new Date(flightsData[j].departureDate)).getTime() == (earliestdirectflightdeptime).getTime()) {
                        let earliestdirectflight = flightsData[j].flightNumber
                        console.log(earliestdirectflight)
                        efficientroute.style.color = '#95bb72'
                        efficientroute.innerHTML = "Flights "+earliestdirectflight
                      }
                    }
                  }
                } else {
                  efficientroute.style.color = '#95bb72'
                  efficientroute.innerHTML = "Flights "+fastestdirectflights.toString()
                }
              } else {
                  efficientroute.style.color = '#95bb72'
                  efficientroute.innerHTML = "Flights "+directflights.toString()
              }
            }
          }
        }
        // No direct flights
        if (nodirectflights = true) {
          nodirectflightspath(departurepoint, arrivalpoint, flightsData)
        }
      }
    }
  }
}

function nodirectflightspath(departurepoint, arrivalpoint, flightsData) {
  // Create a queue to store flights that need to be checked
  let queue = [departurepoint];
  // Create an object to store the flights that have been visited
  let visited = {};
  // Create a variable to store the final path
  let path = [];
  console.log("Started")
  while (queue.length > 0) {
    // Get the current flight code
    let current = queue.shift();
    // Mark the current flight as visited
    visited[current] = true;

    // Loop through all flights
    for (let i = 0; i < flightsData.length; i++) {
      let flight = flightsData[i];
      // Check if the flight is from the current location and has available seats
      if (flight.departurePoint === current && flight.availableSeats > 0) {
        // Check if the flight arrives before the next flight's departure time
        let nextDeparture = flightsData.find(f => f.departurePoint === flight.arrivalPoint)?.departureDate;
        if (!visited[flight.arrivalPoint] && (!nextDeparture || new Date(flight.arrivalDate) <= new Date(nextDeparture))) {
          // Add the flight to the queue and the path
          queue.push(flight.arrivalPoint);
          path.push(i);
          console.log('Path: '+path)

          // Check if the flight is the final destination
          if (flight.arrivalPoint === arrivalpoint) {
            let result = path.map(index => flightsData[index].flightNumber);
            if (result.length > 1) {
              console.log("Result: " +result)
              let efficientroute = document.getElementById("routearr")
              efficientroute.style.color = '#95bb72'
              efficientroute.innerHTML = "Flights "+result.toString()
            }
          }
        }
      }
    }
  }
  // If no path is found, return an empty array
  return [];
  conssole.log("No Paths")
}

function inputCheck() {
  // Get Departure Point Input
  var form = document.forms[0];
  var selectDeparturePoint = form.querySelector('input[name="departurepoint"]');
  var departurepoint = selectDeparturePoint.value;
  let efficientroute = document.getElementById("routearr")
  if (departurepoint=="") {
    efficientroute.style.color = '#f94449'
    efficientroute.innerHTML = "Please Enter Departure Point !"

  } else {
      console.log("Departure Point: " +departurepoint)
      // Get Arrival Point Input
      var selectArrivalPoint = form.querySelector('input[name="arrivalpoint"]');
      var arrivalpoint = selectArrivalPoint .value;
      if (arrivalpoint=="") {
        efficientroute.style.color = '#f94449'
        efficientroute.innerHTML ="Please Enter Arrival Point !"
      } else {
        console.log("Arrival Point: " +arrivalpoint)
        efficientflightpath(departurepoint, arrivalpoint)
      }
  }
}
