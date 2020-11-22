let base_url = "https://api.football-data.org/v2/";
let token = "83f5c554bdea46318947a928845c842f";
let endPoint = `${base_url}competitions/2021/standings`;
let endPointTeam = `${base_url}teams`;


var fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': token
        },
    });
        
};

function status(response) {
    if (response.status !== 200) {
        console.log(`Error: ${response.status}`);
        //Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function finishLoading() {
    const loading = document.getElementById('loading-container');
    loading.style.display = 'none';
};

function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log(`Error: ${error}`);

    const loadFailed = `
        <p class="white-text center-align">
            Gagal memuat data. Periksa koneksi internet lalu coba lagi.
        </p>
    `;
    document.getElementById('progress-bar').className = 'determinate';
      document.getElementById('load-failed').innerHTML = loadFailed;
}

function getStandings() {
    if("caches" in window) {
        caches.match(endPoint).then(function(response) {
            if(response) {
                response.json().then(function(data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                    finishLoading();
                });
            }
        });
    }

    fetchAPI(endPoint)
        .then(status)
        .then(json)
        .then(function(data) {
            showStanding(data);
            finishLoading();
        })
        .catch(error);
}


function getTeamById() {
    return new Promise(function (resolve, reject) {
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        var squadsHTML = "";

        if ("caches" in window) {
            caches
                .match(endPointTeam + "/" + idParam)
                .then(function (response) {
                    if (response) {
                        response.json().then(function (data) {
                            data = JSON.parse(
                                JSON.stringify(data).replace(/http:/g, "https:")
                            );

                            document.getElementById("club_logo").src = data.crestUrl;
                            document.getElementById("name").innerHTML = data.name;
                            document.getElementById("shortName").innerHTML = data.shortName;
                            document.getElementById("address").innerHTML = data.address;
                            document.getElementById("phone").innerHTML = data.phone;
                            document.getElementById("website").innerHTML = data.website;
                            document.getElementById("email").innerHTML = data.email;
                            document.getElementById("clubColors").innerHTML = data.clubColors;
                            document.getElementById("tla").innerHTML = data.tla;
                            document.getElementById("founded").innerHTML = data.founded;
                            document.getElementById("areaID").innerHTML = data.area.id;
                            document.getElementById("areaName").innerHTML = data.area.name;

                            // Sisipkan komponen card ke dalam elemen dengan id #content
                            document.getElementById("list-player").innerHTML = squadsHTML;

                            // kirim object hasil parsing json agar bisa disimpan ke indexed db
                            resolve(data);
                        });
                    }
                });
        }

        fetchAPI(endPointTeam + "/" + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                // Objek JaceScript dari response.json() masuk lewat variabel data.
                // merubah link yg http ke https
                data = JSON.parse(JSON.stringify(data).replace(/http:/g, "https:"));
                // Menyusun komponen card artikel secara dinamis
                document.getElementById("club_logo").src = data.crestUrl;
                document.getElementById("name").innerHTML = data.name;
                document.getElementById("shortName").innerHTML = data.shortName;
                document.getElementById("address").innerHTML = data.address;
                document.getElementById("phone").innerHTML = data.phone;
                document.getElementById("website").innerHTML = data.website;
                document.getElementById("email").innerHTML = data.email;
                document.getElementById("clubColors").innerHTML = data.clubColors;
                document.getElementById("tla").innerHTML = data.tla;
                document.getElementById("founded").innerHTML = data.founded;
                document.getElementById("areaID").innerHTML = data.area.id;
                document.getElementById("areaName").innerHTML = data.area.name;

                // Sisipkan komponen card ke dalam elemen dengan id #content
                document.getElementById("list-player").innerHTML = squadsHTML;

                // kirim object hasil parsing json agar bisa disimpan ke indexed db
                resolve(data);
            })
            .catch(error);
    });
}
