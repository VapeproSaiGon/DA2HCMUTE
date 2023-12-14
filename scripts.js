window.addEventListener('DOMContentLoaded', (event) => {
  function clock() {
    const today = new Date();

    // get time components
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    //add '0' to hour, minute & second when they are less 10
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;

    //make clock a 12-hour time clock
    const hourTime = hour > 12 ? hour - 12 : hour;

    // if (hour === 0) {
    //   hour = 12;
    // }
    //assigning 'am' or 'pm' to indicate time of the day
    const ampm = hour < 12 ? " AM" : " PM";

    // get date components
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate();

    //declaring a list of all months in  a year
    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    //get current date and time
    const date = monthList[month] + " " + day + ", " + year;
    const time = hourTime + ":" + minute + ":" + second + ampm;

    //combine current date and time


    //print current date and time to the DOM
    document.getElementById("date").innerHTML = date;
    document.getElementById("time").innerHTML = time;
    setTimeout(clock, 1000);
  }
  function RecentLog(){

    let SHEET_ID ='1MHH9thh_6BGFnQPq-mznP--mBguV6yy0G2mgti1G184'
    let SHEET_TITLE = 'DIEMDANH';
    let SHEET_RANGE = 'A2:D9'
  
    let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);
  
    fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
      
      let data = JSON.parse(rep.substr(47).slice(0,-2));

      
      let name_log = document.getElementsByClassName('logname');
      let time_log = document.getElementsByClassName('logtime');
      let status_log = document.getElementsByClassName('logsta');
      let status_logg = document.getElementsByClassName('logstaa');
  
  
      for (var i=0; i<=12;i++)
      {
        if (data.table.rows[i] && data.table.rows[i].c && data.table.rows[i].c[0]) {
          name_log[i].innerHTML = data.table.rows[i].c[0].v;
        }
        if (data.table.rows[i] && data.table.rows[i].c && data.table.rows[i].c[1]) {
          time_log[i].innerHTML = data.table.rows[i].c[1].v;
        }
        
        if (data.table.rows[i] && data.table.rows[i].c && data.table.rows[i].c[2]) {
          status_log[i].innerHTML = data.table.rows[i].c[2].v;
        }
        
        if (data.table.rows[i] && data.table.rows[i].c && data.table.rows[i].c[3]) {
          status_logg[i].innerHTML = data.table.rows[i].c[3].v;
        }
      }
      
    })
  }

  clock();
  RecentLog();
  setInterval(RecentLog,1000);
  var firebaseConfig = {
    // apiKey: "AIzaSyDZ-VncZp1ud2J5iV0cCdTKaXb7Gm75ZQ0",
    // authDomain: "attendance-f9ec3.firebaseapp.com",
    // databaseURL: "https://attendance-f9ec3-default-rtdb.firebaseio.com",
    // projectId: "attendance-f9ec3",
    // storageBucket: "attendance-f9ec3.appspot.com",
    // messagingSenderId: "257336149293",
    // appId: "1:257336149293:web:5f44cfa0b6da6750ca3fa4",
    // measurementId: "G-5QLZPQCJF7"
    apiKey: "AIzaSyC8ByBE8fYEZRDdUe4zEj7CdLHq16bqZJk",
    authDomain: "fir-mq3.firebaseapp.com",
    databaseURL: "https://fir-mq3-default-rtdb.firebaseio.com",
    projectId: "fir-mq3",
    storageBucket: "fir-mq3.appspot.com",
    messagingSenderId: "564081712506",
    appId: "1:564081712506:web:221658b674e4d06d7e4ac3",
    measurementId: "G-QBCS461Z14"

  };
    firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var hain = database.ref("/Students/931030141228/last_attendance_time");
  var hieuin = database.ref("/Students/98326579651/last_attendance_time");
  var anhin = database.ref("/Students/776364360601/last_attendance_time");
  var alertTable = document.getElementById('alertTable').getElementsByTagName('tbody')[0];

// Cảnh báo từ Firebase - FACE
  var faceAlertRef = firebase.database().ref("Alarm/FACE");
  faceAlertRef.on("child_added", function(snapshot) {
  var alertData = snapshot.val();
  var row = alertTable.insertRow();
  var typeCell = row.insertCell(0);
  var contentCell = row.insertCell(1);
  var timeCell = row.insertCell(2);

  typeCell.innerHTML = "FACE";
  contentCell.innerHTML = alertData.content;
  timeCell.innerHTML = alertData.time;
  });

  // Cảnh báo từ Firebase - RFID
  var rfidAlertRef = firebase.database().ref("Alarm/RFID");
  rfidAlertRef.on("child_added", function(snapshot) {
  var alertData = snapshot.val();
  var row = alertTable.insertRow();
  var typeCell = row.insertCell(0);
  var contentCell = row.insertCell(1);
  var timeCell = row.insertCell(2);

  typeCell.innerHTML = "RFID";
  contentCell.innerHTML = alertData.content;
  timeCell.innerHTML = alertData.time;
  });

  const data = [
    {'name': 'Phạm Thanh Hà', 'attendance': null},
    {'name': 'Trần Đức Hiếu', 'attendance': null },
    {'name': 'Phan Ngọc Anh', 'attendance': null }
  ];

  hain.on("value", function(snapshot) {
    var newValue = snapshot.val();
    document.getElementById("abc").innerHTML = newValue;

    // Tìm phần tử có 'name' là 'HIEUNGU' trong mảng data
    var hieungu = data.find((student) => student.name === 'Phạm Thanh Hà');

    console.log(newValue)
    console.log(newValue); // In giá trị mới

// Tạo đối tượng Date từ giá trị mới
var newDate = new Date(newValue);

// Lấy ngày, tháng và năm hiện tại
var currentDate = new Date();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth() + 1; // Lưu ý: Tháng trong JavaScript được đánh số từ 0 đến 11
var currentYear = currentDate.getFullYear();

// Lấy ngày, tháng và năm từ giá trị mới
var newDay = newDate.getDate();
var newMonth = newDate.getMonth() + 1; // Lưu ý: Tháng trong JavaScript được đánh số từ 0 đến 11
var newYear = newDate.getFullYear();

// So sánh nếu ngày mới là ngày hôm nay
if (newDay === currentDay && newMonth === currentMonth && newYear === currentYear) {
  console.log("ok");
} else {
  newValue = "Chưa Điểm Danh";
}
    if (hieungu && newValue) {
      hieungu.attendance = newValue;

      // Cập nhật nội dung bảng
      updateTable();
    }
  
    if (newValue !== "Chưa Điểm Danh") {
      toast({
        message: "NHÂN VIÊN TRẦN ĐỨC HIẾU CHECKIN" + "   " + newValue,
        type: 'on',
        duration: 3000
      });
    }
  });

  hieuin.on("value", function(snapshot) {
    var newValue = snapshot.val();
    document.getElementById("abc").innerHTML = newValue;

    // Tìm phần tử có 'name' là 'HIEUNGU' trong mảng data
    var hieungu = data.find((student) => student.name === 'Trần Đức Hiếu');

    console.log(newValue)
    console.log(newValue); // In giá trị mới

// Tạo đối tượng Date từ giá trị mới
var newDate = new Date(newValue);

// Lấy ngày, tháng và năm hiện tại
var currentDate = new Date();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth() + 1; // Lưu ý: Tháng trong JavaScript được đánh số từ 0 đến 11
var currentYear = currentDate.getFullYear();

// Lấy ngày, tháng và năm từ giá trị mới
var newDay = newDate.getDate();
var newMonth = newDate.getMonth() + 1; // Lưu ý: Tháng trong JavaScript được đánh số từ 0 đến 11
var newYear = newDate.getFullYear();

// So sánh nếu ngày mới là ngày hôm nay
if (newDay === currentDay && newMonth === currentMonth && newYear === currentYear) {
  console.log("ok");
} else {
  newValue = "Chưa Điểm Danh";
}
    if (hieungu && newValue) {
      hieungu.attendance = newValue;

      // Cập nhật nội dung bảng
      updateTable();
    }
  
    if (newValue !== "Chưa Điểm Danh") {
      toast({
        message: "NHÂN VIÊN TRẦN ĐỨC HIẾU CHECKIN" + "   " + newValue,
        type: 'on',
        duration: 3000
      });
    }
  });
  anhin.on("value", function(snapshot) {
    var newValue = snapshot.val();
    document.getElementById("abc").innerHTML = newValue;

    // Tìm phần tử có 'name' là 'HIEUNGU' trong mảng data
    var hieungu = data.find((student) => student.name === 'Phan Ngọc Anh');

    console.log(newValue)
    console.log(newValue); // In giá trị mới

// Tạo đối tượng Date từ giá trị mới
var newDate = new Date(newValue);

// Lấy ngày, tháng và năm hiện tại
var currentDate = new Date();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth() + 1; // Lưu ý: Tháng trong JavaScript được đánh số từ 0 đến 11
var currentYear = currentDate.getFullYear();

// Lấy ngày, tháng và năm từ giá trị mới
var newDay = newDate.getDate();
var newMonth = newDate.getMonth() + 1; // Lưu ý: Tháng trong JavaScript được đánh số từ 0 đến 11
var newYear = newDate.getFullYear();

// So sánh nếu ngày mới là ngày hôm nay
if (newDay === currentDay && newMonth === currentMonth && newYear === currentYear) {
  console.log("ok");
} else {
  newValue = "Chưa Điểm Danh";
}
    if (hieungu && newValue) {
      hieungu.attendance = newValue;

      // Cập nhật nội dung bảng
      updateTable();
    }
  
    if (newValue !== "Chưa Điểm Danh") {
      toast({
        message: "NHÂN VIÊN PHAN NGỌC ANH CHECKIN" + "   " + newValue,
        type: 'on',
        duration: 3000
      });
    }
  });

  const tableBody = document.getElementById('table-body');

  function updateTable() {
    // Xóa nội dung hiện tại của bảng
    tableBody.innerHTML = '';

    // Tạo lại các hàng trong bảng dựa trên mảng data sau khi đã cập nhật giá trị của attendance
    data.forEach((student) => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const attendanceCell = document.createElement('td');

      nameCell.textContent = student.name;
      attendanceCell.textContent = student.attendance !== null ? student.attendance : 'N/A';

      row.appendChild(nameCell);
      row.appendChild(attendanceCell);

      tableBody.appendChild(row);
    });
  }

  // Khởi tạo bảng ban đầu
  updateTable();
});

function toast({ message = '', type = 'on', duration = 3000 }) {
    const main = document.querySelector('#toast');
    if (main) {
      const toast = document.createElement('div');
      const icons = {
        on: 'fa-solid fa-circle-check',
        off: 'fa-solid fa-circle-exclamation'
      };

      const icon = icons[type];
      const delay = duration / 1000;

      toast.classList.add('toast', `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);

      toast.onclick = function (e) {
        if (e.target.closest('.toast__close')) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };

      toast.innerHTML = `
          <div class="toast__icon">
              <i class="${icon}"></i>
          </div>
          <div class="toast__body">
              <div class="toast__msg">${message}</div>
          </div>
          <div class="toast__close">
              <i class="fa-solid fa-xmark"></i>
          </div>
      `;
      main.appendChild(toast);
    }
  }

  function onDevice() {
    toast({
      message: 'Bật thiết bị thành công.',
      type: 'on',
      duration: 3000
    });
  }

  function offDevice() {
    toast({
      message: 'Tắt thiết bị thành công',
      type: 'off',
      duration: 3000
    });
  }


  // soilRef.on("value", function(snapshot) {
	// document.getElementById("soil").innerHTML = snapshot.val();
  // });
  // tempRef2.on("value", function(snapshot) {
	// document.getElementById("temperature2").innerHTML = snapshot.val();
	
  // });
  // humidRef2.on("value", function(snapshot) {
	// document.getElementById("humidity2").innerHTML = snapshot.val();
  // });
  // lightRef2.on("value", function(snapshot) {
	// document.getElementById("light2").innerHTML = snapshot.val();
  // });
  // soilRef2.on("value", function(snapshot) {
	// document.getElementById("soil2").innerHTML = snapshot.val();
  // });



//
fetch('https://sheetdb.io/api/v1/10f19iflf999p', {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {
    var demm = 0;
    var ontime=0;
    var late=0;




for (var i = 0; i < data.length; i++) {
  var rowData = data[i];
  var name = rowData['NAME']; // Trường email từ SheetDB
var ngay = rowData['DATE'];
var trang= rowData['STAGE']
var time= rowData['TIME'] // Trường email từ SheetDB

if(trang=="CHECKIN"){
  
  if(time<=7) {
    ontime=ontime+1;
 
  }
demm=demm+1;

console.log(demm)
}
late=demm-ontime;
console.log(demm)
console.log(ontime)
console.log(late)
document.getElementById("demm").textContent = demm;
document.getElementById("ontime").textContent = ontime;
document.getElementById("late").textContent = late;

} 

})
.catch(error => {
console.error(error); // In lỗi nếu có
});



// Lấy dữ liệu từ Firebase và hiển thị trong bảng

