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

// here last element in branch2 document
const branch2last = query(
  ref(database, "sensor_value_history/branch2"),
  limitToLast(1)
);

onValue(branch2last, (snapshot) => {
  const branch2data = snapshot.val();
  for(let v in branch2data){
    var light2= branch2data[v].light_intensity;
    document.getElementById("lightint2").innerHTML=light2;
    var humidity2=branch2data[v].air_humidity;
    document.getElementById("humidity2").innerHTML=humidity2;
    var airt2=branch2data[v].air_temperature;
    document.getElementById('airt22').innerHTML=airt2;
    var date2=branch2data[v].datetime;
    document.getElementById('datebr2').innerHTML=date2;
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

var chrwt = document.getElementById("myChart3").getContext("2d");
var chartwt1= new Chart("myChart3", {
  type: "line",
  data: {
      labels: cdatem,
      datasets: [
          {
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(255, 0, 102,1.0)",
              borderColor: "rgba(255, 0, 102,0.1)",
              data: wtempm,
          },
      ],
  },
  options: {
      legend: { display: false },
      scales: {
          yAxes: [{ ticks: { min: 0, max: 40} }],
      },
  },
});
//end of water temp charts 
chartwt1.update();
  });
// 

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

// light intensity chart
var cli = document.getElementById("myChart4").getContext("2d");

var cli1= new Chart("myChart4", {
  type: "line",
  data: {
      labels: xdate,
      datasets: [
          {
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(153, 51, 255,1.0)",
              borderColor: "rgba(153, 51, 255,0.1)",
              data: xlight,
          },
      ],
  },
  options: {
      legend: { display: false },
      scales: {
          yAxes: [{ ticks: { min: 0, max: 1000 } }],
      },
  },
});

// light intensity charts end
// humidity starts
var humidity = document.getElementById("myChart44").getContext("2d");
var chum = document.getElementById("myChart44").getContext("2d");

var chum1= new Chart("myChart44", {
  type: "line",
  data: {
      labels: xdate,
      datasets: [
          {
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(153, 51, 255,1.0)",
              borderColor: "rgba(153, 51, 255,0.1)",
              data: xhum,
          },
      ],
  },
  options: {
      legend: { display: false },
      scales: {
          yAxes: [{ ticks: { min: 0, max: 100 } }],
      },
  },
});
console.log(xhum);
// humidity ends

//Air Temperature start
var artt1chrt = document.getElementById("myChart6").getContext("2d");

var artt1ch=new Chart("myChart6", {
  type: "line",
  data: {
      labels: xdate,
      datasets: [
          {
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(255,100,0,1.0)",
              borderColor: "rgba(255,100,0,0.1)",
              data: xtemp,
          },
      ],
  },
  options: {
      legend: { display: false },
      scales: {
          yAxes: [{ ticks: { min: 0, max: 50 } }],
      },
  },
});


//Air Temperature ends



//branch2
get(child(dbRef, "sensor_value_history/branch1"))
  .then((snapshot) => {
    var temp2=[];
    var hum2=[];
    var lightint22=[];
    var datedate2=[];
const branch2listofData = snapshot.val();
// console.log(branch2listofData);

for( let g in branch2listofData){
temp2.push(branch2listofData[g].air_temperature);
hum2.push(branch2listofData[g].air_humidity);
lightint22.push(branch2listofData[g].light_intensity)
datedate2.push(branch2listofData[g].datetime);
}





//Air Temperature start
var light2chrt = document.getElementById("myChart99").getContext("2d");

var light22chrt=new Chart("myChart99", {
  type: "line",
  data: {
      labels: datedate2,
      datasets: [
          {
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(255,100,0,1.0)",
              borderColor: "rgba(255,100,0,0.1)",
              data: lightint22,
          },
      ],
  },
  options: {
      legend: { display: false },
      scales: {
          yAxes: [{ ticks: { min: 0, max: 1000 } }],
      },
  },
});

//air temp

var hum2chrt = document.getElementById("myChart100").getContext("2d");

var hum1ch=new Chart("myChart100", {
  type: "line",
  data: {
      labels: datedate2,
      datasets: [
          {
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(255,200,0,1.0)",
              borderColor: "rgba(255,200,0,0.1)",
              data: hum2,
          },
      ],
  },
  options: {
      legend: { display: false },
      scales: {
          yAxes: [{ ticks: { min: 0, max: 100 } }],
      },
  },
});

var temp2chrt = document.getElementById("myChart111").getContext("2d");

var artt1ch=new Chart("myChart111", {
  type: "line",
  data: {
      labels: datedate2,
      datasets: [
          {
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(100,200,70,1.0)",
              borderColor: "rgba(100,200,70,0.1)",
              data: temp2,
          },
      ],
  },
  options: {
      legend: { display: false },
      scales: {
          yAxes: [{ ticks: { min: 0, max: 100 } }],
      },
  },
});
  });
  artt1ch.update();

} else {
console.log("No data available");
}
})
.catch((error) => {
console.error(error);
});


  
