let dbBruce = null;
let dbBryan = null;
let count = 0;

const button = document.querySelector(".button");

// ELEMENT HTML
button.addEventListener("click", () => {
  count++;
  const objectPerson = {
    name: "username" + count,
    age: count + count + count,
    country: "Indonesia" + count,
    id: 1,
  };
  const tx = makeTransaction(dbBruce, "bruceStore", "readwrite");
  const store = tx.objectStore("bruceStore");
  // makeRequest("put", store, null, { k: "Hello_World!" + count, id: 8 }); // for update
  makeRequest("add", store, null, { k: "HELLO_WORLD" + count });
  // makeRequest("get", store, 3);
  const objectStore = makeRequest("getAll", store);
  objectStore.onsuccess = (e) => {
    console.log(e.target.result);
  }
  // makeRequest("delete", store, 7);
});

// FUNCTION
function makeTransaction(database, store, method) {
  const tx = database.transaction(store, method);
  tx.oncomplete = (event) => {
    console.log("transaction complete");
  };
  tx.onerror = (err) => {
    console.warn("transaction failed");
  };
  return tx;
}

function makeRequest(code, store, key = null, value = null) {
  let objectStore = null;
  if (code === "getAll") {
    objectStore = store.getAll();
  } else if (code === "get") {
    objectStore = store.get(key);
    return objectStore
  } else if (code === "add") {
    objectStore = store.add(value);
  } else if (code === "delete") {
    objectStore = store.delete(key);
  } else if (code === "put") {
    objectStore = store.put(value);
  }
  return objectStore;
  // objectStore.onsuccess = (e) => {
  //   const request = e.target.result;
  //   request && console.log(request);
  //   console.log("success " + code);
  //   return e.target.result;
  // };
  // objectStore.onerror = (e) => {
  //   console.warn("failed " + code);
  // };
}

// DATABASES
function makeDB() {
  const bruceDbRequest = indexedDB.open("bruceDB", 3);
  const bryanDbRequest = indexedDB.open("bryanDB", 2);

  bryanDbRequest.addEventListener("success", (event) => {
    dbBryan = event.target.result;
    // console.log({ dbBryan });
  });

  bruceDbRequest.addEventListener("success", (event) => {
    dbBruce = event.target.result;
    // console.log("success first");
  });

  bruceDbRequest.addEventListener("upgradeneeded", (event) => {
    // console.log(event.target.result);
    console.log(event);
    dbBruce = event.target.result;
    const oldVersion = event.oldVersion;
    const newVersion = event.newVersion || dbBruce.version;
    console.log({ oldVersion, newVersion });
    if (!dbBruce.objectStoreNames.contains("bruceStore")) {
      dbBruce.createObjectStore("bruceStore", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  });

  bruceDbRequest.addEventListener("error", (event) => {
    console.warn(event);
  });
}

makeDB();

// module.exports = { makeTransaction, makeRequest, makeDB };