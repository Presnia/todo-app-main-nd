import todoState from "./todoState.js";

const d = new Date();

function ISODateString(){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())
}

export default class Todo {
  constructor(text) {
    this.text = text;
    this.state = todoState.InProcess;
    this.dateCreated = ISODateString(d);
    this.dateCompleted = null;
  }

  postpone() {
    this.state = todoState.Postponed;
  }

  resume() {
    this.state = todoState.InProcess;
  }

  done() {
    this.state = todoState.Done;
    this.dateCompleted = new Date();
  }
}
