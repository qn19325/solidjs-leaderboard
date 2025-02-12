import "./app.css";
import "./entry.css";

interface propsObj {
  name: string;
  score: number;
  select(): void;
  increase(): void;
}

export default function Entry(props: propsObj) {
  return (
    <tr onclick={props.select}>
      <td class="entry-name">{props.name}</td>
      <td class="entry-score">{props.score}</td>
      <td class="entry-buttons">
        <button class="button" onClick={props.increase} type="button">+</button>
        <button class="button" onClick={props.increase} type="button">-</button>
      </td>
    </tr>
  );
}
