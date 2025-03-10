import "./app.css";
import Entry from "./entry";
import CurrentEntry from "./currentEntry";
import { createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";

export interface player {
  id: string
  name: string,
  score: number,
  icon: string
}

export default function App() {
  const [players, setPlayers] = createStore<player[]>([])
  const [currentPlayer, setCurrentPlayer] = createSignal<player|null>(null)

  const addPlayer = () => {
    setPlayers([...players, { id: `${players.length + 1}`, name: `Player ${players.length + 1}`, score: 0 , icon: `./assets/${players.length + 1}.png`}]);
    if (!currentPlayer()) {
      setCurrentPlayer(players[0])
    }
  }
  const select = (id: string) => {
    setCurrentPlayer(players.find((player) => player.id === id) || null)
  };
  const increase = (id: string) => {
    setPlayers((p) => p.id === id, "score", (score) => score += 1);    
  };

  return (
    <main>
      <h1>Leaderboard</h1>
      <Show when={players.length} fallback={"Empty"}>
        <div class="content">
          <CurrentEntry Player={currentPlayer()} />
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Adjust Score</th>
              </tr>
              <For each={[...players].sort((a, b) => b.score - a.score)} >{(player, i) =>
                  <Entry name={player.name} score={player.score} select={() => select(player.id)} increase={() => increase(player.id)} />
              }</For>
            </tbody>
          </table>
        </div>
      </Show>
      <button class="button add-player" onClick={addPlayer} type="button">Add Player</button>
    </main>
  );
}
