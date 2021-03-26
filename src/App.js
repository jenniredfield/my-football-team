import "./App.css";
import data from "./data/data.json";
import moment from "moment";

function App() {
  const gamesExtracted = Object.keys(data.games).map(
    (game) => data.games[game]
  );
  const gamesFormatted = gamesExtracted.map((game) => {
    return {
      ...game,
      homeTeam: data.teams[game.homeTeam].name,
      awayTeam: data.teams[game.awayTeam].name,
      date: moment(game.date).format("MMMM Do YYYY"),
      hometeam_goals: game.hometeam_goals.map((homeTeamGoals) => {
        const player = data.users[homeTeamGoals.scorer] || {};
        return {
          ...homeTeamGoals,
          playerName: Object.keys(player).length ? player.username : "",
        };
      }),
    };
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Football Team</h1>
        <img src="/football.png" className="logo" alt="ball"></img>
      </header>

      <div className="app-content">
        <div className="app-matches">
          {gamesFormatted.reverse().map((game) => {
            return (
              <div className="app-match" key={game.date}>
                <div className="app-match-date">
                  <p>{game.date}</p>
                </div>
                <div className="app-match-details">
                  <div className="app-match-details__team">
                    <p>{game.homeTeam}</p>
                    {game.hometeam_goals.length &&
                      game.hometeam_goals.map((goal) => {
                        return (
                          <p className="app-match-details__scorer-name">{`${
                            goal.playerName || goal.scorer
                          } ${goal.minute}'`}</p>
                        );
                      })}
                  </div>
                  <div>
                    <p className="app-match-details__score">{`${game.hometeam_goals.length}-${game.awayteam_goals.length}`}</p>
                  </div>
                  <div className="app-match-details__team">
                    <p>{game.awayTeam}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
