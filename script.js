window.onload = function () {
  getKota();
  jam();
};

function jam() {
  let waktu = new Date();
  let jam = set(waktu.getHours());
  let menit = set(waktu.getMinutes());

  document.getElementById("clock").innerHTML = "" + jam + ":" + menit + "";
  setTimeout("jam()", 1000);
}

function set(clock) {
  clock = clock < 10 ? "0" + clock : clock;
  return clock;
}

function getKota() {
  axios
    .get("https://api.banghasan.com/sholat/format/json/kota")
    .then((response) => {
      for (let x of response.data.kota) {
        let selection = document.getElementById("selection");
        let option = document.createElement("option");
        option.setAttribute("value", x.id);
        option.text = x.nama;
        selection.appendChild(option);
      }
      $(document).ready(function () {
        $("#selection").select2();
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ada yang salah!",
        text: error,
      });
    });
}

function pilihKota() {
  const kota = document.getElementById("selection");
  const idKota = kota.options[kota.selectedIndex].value;
  const k = new Date();
  year = k.getFullYear();
  month = k.getMonth();
  date = k.getDate();
  const tanggal = "" + year + "-" + month + "-" + date + "";

  axios
    .get(
      "https://api.banghasan.com/sholat/format/json/jadwal/kota/" +
        idKota +
        "/tanggal/" +
        tanggal +
        ""
    )
    .then((response) => {
      let api = response.data.jadwal.data;
      let apiArray = [api.subuh, api.dzuhur, api.ashar, api.maghrib, api.isya];

      document.getElementById("subuh").innerHTML = apiArray[0];
      document.getElementById("dzuhur").innerHTML = apiArray[1];
      document.getElementById("ashar").innerHTML = apiArray[2];
      document.getElementById("maghrib").innerHTML = apiArray[3];
      document.getElementById("isya").innerHTML = apiArray[4];

      let a = setInterval(function () {
        const monthNames = [
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
          "December",
        ];

        let m = new Date().getMonth();
        let d = new Date().getDate();
        let y = new Date().getFullYear();

        // for (let i = 0; i < apiArray.length; i++) {}
        // if (set(clock) > apiArray[i]) {
        // }

        // function nextSession(value) {
        //   return value >
        // }

        // function recursive(n) {
        //   if (set(clock) > apiArray[]) return;
        //   console.log(n > set);
        // }
        // recursive(10);

        // let filter = apiArray.filter(function (api) {
        //   if (set(clock) > apiArray) {
        //     return api > set(clock);
        //   }
        // });

        // if (a == true) {
        //   clearInterval(a);
        //   return a;
        // }

        const countDate = new Date(
          "" + monthNames[m] + " " + d + ", " + y + " " + apiArray[1] + ":00"
        ).getTime();
        const timeNow = new Date().getTime();
        const distance = countDate - timeNow;

        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("nextTime").innerHTML =
          hours + " hours " + minutes + " minutes";
        document.getElementById("countSubuh").innerHTML =
          hours + " hours " + minutes + " minutes";

        if (distance < 1) {
          clearInterval();
          let text = document.getElementById("nextTime");
          let sound = document.getElementById("audio");
          text.innerHTML = "WAKTUNYA SHOLAT!";
          text.classList.add("blink");
          sound.play();
        }
      }, 1000);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ada yang salah!",
        text: error,
      });
    });
}

const button = document.getElementById("tuas");
const bottomSheet = document.getElementById("divBottom");
button.addEventListener("click", function () {
  if (bottomSheet.style.bottom <= "-65%") {
    bottomSheet.style.bottom = 0;
  } else {
    bottomSheet.style.bottom = "-65%";
  }
});
