function loadScript(scriptSrc, loadedCallback) {
  let script = document.createElement("script");
  script.src = scriptSrc;

  script.onload = () => loadedCallback(scriptSrc);

  document.head.append(script);
}

export function demo() {
  loadScript("/src/probe.js", (src) => {
    console.log(`=> Script ${src} loaded...`);
    
    probe();
  });
}