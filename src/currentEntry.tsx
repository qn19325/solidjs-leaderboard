import "./currentEntry.css"
import { player } from "./app"

interface currentEntryProps {
  Player: player | null
}

export default function CurrentEntry(props: currentEntryProps) {
  return (
    <div class="current-entry">
        <img class="current-entry-icon" src={props.Player?.icon} alt="" />
        <div class="current-entry-name">{props.Player?.name}</div>
        <div class="current-entry-score">{props.Player?.score}</div>
    </div>
  );
}