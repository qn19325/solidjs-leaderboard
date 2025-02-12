import { createEffect, createSignal, For, Show } from "solid-js";
import "./app.css";
import Entry from "./entry";
import CurrentEntry from "./currentEntry";

export interface player {
  name: string,
  score: number
}

export default function App() {
  const [players, setPlayers] = createSignal<player[]>([])
  const [currentPlayer, setCurrentPlayer] = createSignal<player>({name: "", score: 0})

  const addPlayer = () => {
    setPlayers([...players(), { name: `Player ${players().length + 1}`, score: 0 }]);
    if (currentPlayer().name === "") {
      setCurrentPlayer(players()[0])
    }
  }
  const select = (idx: number) => {
    setCurrentPlayer(players()[idx])
  };
  const increase = (idx: number) => {
    setPlayers(p => p.map((val, i) => { return idx === i ? { ...val, score: val.score + 1} : val }).sort((a, b) => b.score - a.score))
    if (players()[idx].name === currentPlayer().name) {
      setCurrentPlayer(players()[idx])
    }
  };

  return (
    <main>
      <h1>Leaderboard</h1>
      <Show when={players().length} fallback={"Empty"}>
        <CurrentEntry name={currentPlayer()?.name ?? ""} score={currentPlayer()?.score ?? 0} />
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Adjust Score</th>
            </tr>
            <For each={players()} >{(player, i) =>
                <Entry name={player.name} score={player.score} select={() => select(i())} increase={() => increase(i())} />
            }</For>
          </tbody>
        </table>
      </Show>
      <button class="button add-player" onClick={addPlayer} type="button">Add Player</button>
    </main>
  );
}
