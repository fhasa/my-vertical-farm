
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  
import { getDatabase, ref ,get,child, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// import {Chart} from 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js'

// Initialize Firebase
const  firebaseConfig = {
  apiKey: "AIzaSyADywmfNsRaT-9RnE1MXS24nS5ujfgseBg",
  authDomain: "iot-vertical-farming-40e8a.firebaseapp.com",
  databaseURL: "https://iot-vertical-farming-40e8a-default-rtdb.firebaseio.com",
  projectId: "iot-vertical-farming-40e8a",
  storageBucket: "iot-vertical-farming-40e8a.appspot.com",
  messagingSenderId: "372914315084",
  appId: "1:372914315084:web:a609be0fc0f122561979e9",
  measurementId: "G-8V3RS63HZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
/*
const starCountRef = ref(db, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  updateStarCount(postElement, data);
});
*/
// Get a reference to the database service

// Set up the chart
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [], // X-axis labels will be added dynamically
        datasets: [{
            label: 'My Data',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [] // Y-axis values will be added dynamically
        }]
    },

    // Configuration options go here
    options: {}
});

/*
const starCountRef = ref(db, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  updateStarCount(postElement, data);
});
*/

const dbRef = ref(getDatabase());
get(child(dbRef, 'sensor_value_history/branch1')).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

// Add data to the chart when it is added to the database
// const fatref=  ref(database,'sensor_value_history/branch1','/branch1');

// onValue(fatref, function(snapshot) {
//   const dta = snapshot.val();
//   console.log(dta);
//   // chart.data.labels.push(data.air_humidity);
//   //console.log(data.branch1);

//   chart.data.datasets[0].data.push(dta.air_temperature);
//   console.log(dta.air_temperature);
//   chart.update();
// });
