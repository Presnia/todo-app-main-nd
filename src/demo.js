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
      probe1(); 
    },
    (error) => {
      console.log("### Load failed...");
      console.log(error);
    }
  );

  loadScript(
    "/src/probes/probe2.js", 
    (src) => {
      console.log(`=> Script ${src} loaded...`);
      probe2(); 
    },
    (error) => {
      console.log("### Load failed...");
      console.log(error);
    }
  );

  console.log("==> This line is next after loadScript...")
}