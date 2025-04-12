class Cursor {
  constructor() {
    this.cursor = document.createElement("div");
    this.cursor.classList.add("custom-cursor");
    document.body.appendChild(this.cursor);
    document.body.style.cursor = "none";
    document.addEventListener("mousemove", (e) => this.moveCursor(e));
  }

  moveCursor(event) {
    this.cursor.style.left = `${event.clientX}px`;
    this.cursor.style.top = `${event.clientY}px`;
  }
}

export default Cursor;
