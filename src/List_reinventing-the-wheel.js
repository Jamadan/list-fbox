// We have a list of 1000 items, in the live version these blocks often need to
// update causing a mass redraw, even though only a handful are visible.

import { useState } from "react";

// Can you rebuild the list component to display only the visible
// items (< 10) while preserving the scroll functionality.
// This should work with a 100,000 item list.

const getVisibleBlocks = (data, start, height, buffer = 200) => {
  let totalHeight = 0;
  const end = start + height;

  return data.map((block) => {
    const display =
      totalHeight > start - buffer && block.height + totalHeight < end + buffer;

    totalHeight += block.height;
    return (
      <BlockWrapper
        key={block.name}
        height={block.height}
        name={block.name}
        display={display}
      />
    );
  });
};

function List(props) {
  const [blocks, setBlocks] = useState(getVisibleBlocks(props.data, 0, 800));
  let totalHeight = props.data.reduce((acc, cur) => acc + cur.height, 0);

  const onScroll = (e) => {
    const visible = getVisibleBlocks(props.data, e.target.scrollTop, 800);
    setBlocks(visible);
  };

  return (
    <div style={{ overflow: "none" }}>
      <div
        onScroll={(e) => onScroll(e)}
        style={{ overflow: "scroll", height: totalHeight }}
      >
        {blocks}
      </div>
    </div>
  );
}

function BlockWrapper(props) {
  const style = {
    height: props.height,
    background: "white",
    color: "white",
    padding: 10,
    boxSizing: "border-box",
    marginBottom: 10,
  };

  // By putting predicate here, data changes within Block component won't be re-rendered
  // Only visible components will be re-rendered
  return <div style={style}>{props.display && <Block {...props} />}</div>;
}

function Block(props) {
  const style = {
    height: props.height,
    background: "grey",
    color: "white",
    padding: 10,
    boxSizing: "border-box",
  };
  return <div style={style}>{props.name}</div>;
}

export default List;
