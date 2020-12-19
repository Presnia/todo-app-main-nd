function loadScript(scriptSrc, loadedCallback, errorCallback) {
  console.log("Loading script...")

  let script = document.createElement("script");
  script.src = scriptSrc;

  script.onload = () => loadedCallback(scriptSrc);
  script.onerror = () => 
  errorCallback(new Error(`Script ${scriptSrc} loading failed`));

  document.head.append(script);
}

function probe1loaded(src) {
  console.log(`=> Script ${src} loaded...`);
      probe1(); 

  loadScript(
    "/src/probes/probe2.js", 
    probe2loaded,
    probeError
  );
};

function probe2loaded(src) {
  console.log(`=> Script ${src} loaded...`);
  probe2(); 

  console.log("I am ready to use probe1 and probe2");
};

function probeError(error) {
  console.log("### Load failed...");
  console.log(error);
}

export function demo() {
  loadScript(
    "/src/probes/probe1.js", 
    probe1loaded,
    probeError
  );

  console.log("==> This line is next after loadScript...")
}