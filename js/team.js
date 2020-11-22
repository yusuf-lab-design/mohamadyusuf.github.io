function showStanding(data) {
    let standings = "";
    let stnElement = document.getElementById("standings");

    data.standings[0].table.forEach(function(team) {
        standings += `
            <tr>
            <td>${team.position}</td>
                <td>
                    <a href="./detail_teams.html?id=${team.team.id}">
                        <img src="${team.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/>
                    </a>
                    ${team.team.name}
                </td>               
                <td>${team.won}</td>
                <td>${team.draw}</td>
                <td>${team.lost}</td>
                <td>${team.points}</td>
            </tr>
        `;
    });

    stnElement.innerHTML = `
    <table class="striped responsive-table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Win</th>
                <th>Draw</th>
                <th>Lost</th>
                <th>Points</th>
            </tr>
            </thead>
        <tbody id="standings">
            ${standings}
        </tbody>
    </table>
    `;

}