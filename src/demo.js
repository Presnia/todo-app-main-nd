function loadScript(scriptSrc, loadedCallback) {
  let script = document.createElement("script");
  script.src = scriptSrc;

  script.onload = () => loadedCallback(null, scriptSrc);
  script.onerror = () => loadedCallback(new Error(`Script ${scriptSrc} loading failed`));

  document.head.append(script);
}

// error-first callback pattern

export function demo() {
  loadScript("/src/probes/probe.js", (error, src) => {
    if(error) {
      console.log(error); 
      return;
    }

    console.log(`=> Script ${src} loaded...`);
    probe();
  });
}