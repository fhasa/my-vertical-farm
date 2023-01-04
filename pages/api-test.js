import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  child,
  query,
  limitToLast,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// import {Chart} from 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADywmfNsRaT-9RnE1MXS24nS5ujfgseBg",
  authDomain: "iot-vertical-farming-40e8a.firebaseapp.com",
  databaseURL: "https://iot-vertical-farming-40e8a-default-rtdb.firebaseio.com",
  projectId: "iot-vertical-farming-40e8a",
  storageBucket: "iot-vertical-farming-40e8a.appspot.com",
  messagingSenderId: "372914315084",
  appId: "1:372914315084:web:a609be0fc0f122561979e9",
  measurementId: "G-8V3RS63HZW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);



// here last element in branch1 document
const recentPostsRef = query(
  ref(database, "sensor_value_history/branch1"),
  limitToLast(1)
);
onValue(recentPostsRef, (snapshot) => {
  const branch1last = snapshot.val();
/*
light_intensity
datetime
air_temperature
air_humidity

*/
  for(let t in branch1last){
    var humidity= branch1last[t].air_humidity;
    document.getElementById("humidity1").innerHTML=humidity;
    var airtemp1=branch1last[t].air_temperature;
    document.getElementById('airt1').innerHTML=airtemp1;
    var lightintensity1=branch1last[t].light_intensity;
    document.getElementById('lightint1').innerHTML=lightintensity1;
    var datebranch1=branch1last[t].datetime;
    document.getElementById('datebr1').innerHTML=datebranch1;
  }
  console.log(branch1last);
});










// here last element in branch2 document
const branch2 = query(
  ref(database, "sensor_value_history/branch2"),
  limitToLast(1)
);
onValue(branch2, (snapshot) => {
  const br2data = snapshot.val();
  console.log(br2data);
});
// here last element in centric document
const water = query(
  ref(database, "sensor_value_history/centric"),
  limitToLast(1)
);

onValue(water, (snapshot) => {
  const centricdata = snapshot.val();
  
  for(let m in centricdata){
    var ph=centricdata[m].ph;
    document.getElementById("ph").innerHTML = ph;
    console.log(ph);
    var tds=centricdata[m].tds;
    document.getElementById("tds").innerHTML = tds;
    console.log(tds);
   var watt=centricdata[m].water_temperature;
   document.getElementById("wtmp").innerHTML = watt;
    console.log(watt);
   var datt=centricdata[m].datetime;
   document.getElementById("datec").innerHTML = datt;
    console.log(datt);
  }
});












const dbRef = ref(getDatabase());

get(child(dbRef, "sensor_value_history/centric"))
  .then((snapshot) => {
    const centricjson= snapshot.val();
    let phm=[];
    let tdsm=[];
    let wtempm=[];
    let cdatem=[];

    for(let r in centricjson ){
      phm.push(centricjson[r].ph);
      tdsm.push(centricjson[r].tds);
      wtempm.push(centricjson[r].water_temperature);
      cdatem.push(centricjson[r].datetime);
    }

 // start of ph chart
    var chrph = document.getElementById("myChart2").getContext("2d");
   
    var charph1= new Chart("myChart2", {
        type: "line",
        data: {
            labels: cdatem,
            datasets: [
                {
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(0,255,0,.8)",
                    borderColor: "rgba(0,255,0,0.1)",
                    data: phm,
                },
            ],
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: 0, max: 14 } }],
            },
        },
    });
                      
//end of ph chart

//start of tds chart

var chrtds = document.getElementById("myChart1").getContext("2d");


var chartds1= new Chart("myChart1", {
  type: "line",
  data: {
      labels: cdatem,
      datasets: [
          {
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.1)",
              data: tdsm,
          },
      ],
  },
  options: {
      legend: { display: false },
      scales: {
          yAxes: [{ ticks: { min: 100, max: 20000 } }],
      },
  },
});

//end of tds chart



// start of water temp charts
//end of water temp charts 

  });





























get(child(dbRef, "sensor_value_history/branch1"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      let xtemp = [];
      let xhum = [];
      let xdate = [];
      let xlight = [];

      const datajson = snapshot.val();

      for (let key in datajson) {
        // console.log(key);  // logs "object1", "object2", "object3"
        xhum.push(datajson[key].air_humidity); // logs the object for each key
        xtemp.push(datajson[key].air_temperature);
        xdate.push(datajson[key].datetime);
        xlight.push(datajson[key].light_intensity);
      }

      var ctx = document.getElementById("myChart").getContext("2d");
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: xdate, // X-axis labels will be added dynamically
          datasets: [
            {
              label: "Air Temperature",
              backgroundColor: "rgb(255, 99, 132, .005)",
              lineTension: 0,
              borderColor: "rgb(255, 99, 132, 1)",
              pointRadius: 1,
              borderWidth: 1,
              data: xtemp,
              // Y-axis values will be added dynamically
            },
          ],
        },

        // Configuration options go here
        options: {
          scales: {
            yAxes: [{ ticks: { min: 0, max: 50 } }],
            xAxes: [
              {
                display: false, // hide the labels on the x-axis
              },
            ],
          },
          //   scales: {

          // }
        },
      });

    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

