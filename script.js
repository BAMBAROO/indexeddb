const { makeRequest, makeTransaction, makeDB } = require("./indexeddb.js");

makeDB();

const button = document.querySelector(".button");

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
  // makeRequest("add", store, null, { k: "HELLO_WORLD" + count });
  // makeRequest("get", store, 3);
  makeRequest("getAll", store);
  // makeRequest("delete", store, 7);
});
