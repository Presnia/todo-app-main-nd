function loadScript(scriptSrc) {
  let script = document.createElement("script");
  script.src = scriptSrc;

  script.onload = () => console.log(`### Script ${scriptSrc} loaded`);

  document.head.append(script);
}

export function demo() {
  loadScript("/src/probe.js");

  console.log("=> Script loaded...");
  probe();
}