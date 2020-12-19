function loadScript(scriptSrc, loadedCallback, errorCallback) {
  console.log("Loading script...");

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

  loadScript("/src/probes/probe2.js", probe2loaded, probeError);
}

function probe2loaded(src) {
  console.log(`=> Script ${src} loaded...`);
  probe2();

  console.log("I am ready to use probe1 and probe2");
}

function probeError(error) {
  console.log("### Load failed...");
  console.log(error);
}

function scriptDemo() {
  loadScript("/src/probes/probe1.js", probe1loaded, probeError);

  console.log("==> This line is next after loadScript...");
}

export function timeoutDemo() {
  console.log(`=> Start`);

  const now = Date.now();

  setTimeout(() => {
    console.log(`Inside Timeout 1000 ...`);
    const timeout1 = Date.now();
    console.log(`1. Time passed ${timeout1 - now}`);
  }, 1000);

  console.log(`Between timeouts`);

  setTimeout(() => {
    console.log(`Inside Timeout 2000 ...`);
    const timeout2 = Date.now();
    console.log(`2. Time passed ${timeout2 - now}`);
  }, 2000);

  console.log(`=> Processing`);
  console.log(`=> End`);
};

export function demo() {
  // producing code
  // consuming code
  // promise
  const promiseExample = new Promise((resolve, reject) => {
    // executor function === producing code
    // resolve(value) -> all is good
    // reject(error) -> all is bad
    // state:
    // pending - right after creation
    // fulfilled - right after resolve
    // rejected - right after reject
  });

  promiseExample.then(
    (result) => {/* handle a successful result */},
    (error) => {/* handle an error */}
  );

  const delayPromise = new Promise((resolve, reject) => {
    console.log(`Executor function run...`);
    setTimeout(() => {
      console.log("timeout passed");
      const randomValue = parseInt(Math.random() * 100);
      console.log(`edge is ${randomValue}`);
      randomValue <= 50 
        ? resolve("done") 
        : reject(new Error("Whooops!!!!"));
    }, 2000);
  });

  delayPromise.then(
    (result) => { 
      console.log(`Promise result ${result}`); 
    },
    (error) => {
      console.log(error);
    }
  );

  console.log(`After promise`);
}
