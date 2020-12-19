function loadScript(scriptSrc) {
  let script = document.createElement("script");
  script.src = scriptSrc;

  document.head.append(script);
}

export function demo() {
  loadScript("/src/probe.js");
}