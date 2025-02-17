import "./currentEntry.css"
import { player } from "./app"

export default function CurrentEntry(props: player) {
  return (
    <div class="current-entry">
        <div class="current-entry-name">{props.name}</div>
        <div class="current-entry-score">{props.score}</div>
    </div>
  );
}