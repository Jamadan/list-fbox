// We have a list of 1000 items, in the live version these blocks often need to
// update causing a mass redraw, even though only a handful are visible.

// Can you rebuild the list component to display only the visible
// items (< 10) while preserving the scroll functionality.
// This should work with a 100,000 item list.
import { useInView } from "react-intersection-observer";

function List(props) {
  const totalBlocks = props.data.map((block) => {
    return <Block key={block.name} height={block.height} name={block.name} />;
  });

  return <div style={{ overflow: "scroll" }}>{totalBlocks}</div>;
}

function Block(props) {
  const [ref, inView] = useInView();
  const style = {
    height: props.height,
    background: "grey",
    color: "white",
    padding: 10,
    boxSizing: "border-box",
    marginBottom: 10,
    overflow: "hidden",
  };
  return (
    <div style={style} ref={ref}>
      {inView ? <div style={style}>{props.name}</div> : null}
    </div>
  );
}

export default List;
