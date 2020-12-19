function loadScript(scriptSrc, loadedCallback, errorCallback) {
  let script = document.createElement("script");
  script.src = scriptSrc;

  script.onload = () => loadedCallback(scriptSrc);
  script.onerror = () => 
  errorCallback(new Error(`Script ${scriptSrc} loading failed`));

  document.head.append(script);
}

export function demo() {
  loadScript(
    "/src/probes/probe1.js", 
    (src) => {
      console.log(`=> Script ${src} loaded...`);
      probe(); 
    },
    (error) => {
      console.log("### Load failed...");
      console.log(error);
    }
  );
}