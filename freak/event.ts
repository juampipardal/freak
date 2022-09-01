export const onClick = (f: Function) => ({
    type: "event-click",
    click: f
  });

  export const onHover = (f: Function) => ({
    type: "event-hover",
    click: f
  });