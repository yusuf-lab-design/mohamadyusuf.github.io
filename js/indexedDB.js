function cekData(teamName, id) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                var tx = db.transaction(teamName, "readonly");
                var store = tx.objectStore(teamName);
                return store.get(id);
            })
            .then(function(data) {
                if (data != undefined) {
                    resolve("This team saved");
                } else {
                    reject("This team not saved");
                }
            });
    });
}

function deleteData(teamName, data) {
    databasePromise(idb)
        .then(function(db) {
            var tx = db.transaction(teamName, "readwrite");
            var store = tx.objectStore(teamName);
            store.delete(data);
            return tx.complete;
        })
        .then(function() {
            document.getElementById("saved").innerHTML = "delete";
            M.toast({
                html: "Team Delete.",
            });
        })
        .catch(function() {
            M.toast({
                html: "Error!!",
            });
        });
}

function saveData(dataType, data) {
    var teamName = "";
    var dataToCreate = {};
    if (dataType == "team") {
        teamName = "team_saved";
        dataToCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            tla: data.tla,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            website: data.website,
            email: data.email,
            founded: data.founded,
            clubColors: data.clubColors,
            venue: data.venue,
            squad: data.squad,
        };
    }

    databasePromise(idb)
        .then((db) => {
            const tx = db.transaction(teamName, "readwrite");
            tx.objectStore(teamName).put(dataToCreate);

            return tx.complete;
        })
        .then(function() {
            document.getElementById("saved").innerHTML = "save";
            M.toast({
                html: "This team is saved.",
            });
        })
        .catch(function() {
            M.toast({
                html: "Error!!",
            });
        });
}

function getSavedDataById(dataType) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    if (dataType == "team") {
        var squadsHTML = "";
        getDataById("team_saved", idParam).then(function(data) {
            data = JSON.parse(JSON.stringify(data).replace(/http:/g, "https:"));
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
            document.getElementById("list-player").innerHTML = squadsHTML;
        });
    }
}

function getDataById(teamName, id) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                var tx = db.transaction(teamName, "readonly");
                var store = tx.objectStore(teamName);
                return store.get(id);
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function getAllData(teamName) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                var tx = db.transaction(teamName, "readonly");
                var store = tx.objectStore(teamName);
                return store.getAll();
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function setSavedToHTML(type) {
    if (type == "team") {
        getAllData("team_saved").then(function(data) {
            teamDataSaved(data);
        });
    }
}