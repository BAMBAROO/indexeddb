const button = document.querySelector('.button');
const result = document.querySelector('.result');

let savedb;

const objectStatic = {
  nama: 'bryan',
  age: 20,
  gender: 'male'
}

button.addEventListener('click', function() {
  const tx = savedb.transaction("saveInstagram", "readwrite");
  const store = tx.objectStore("saveInstagram");
  objectStatic.age += objectStatic.age+1;
  const objectStore = store.add(objectStatic);
  objectStore.onsuccess = (e) => {
    console.log('success')
  }
})

result.addEventListener('click', () => {
  const tx = savedb.transaction("saveInstagram", "readwrite");
  const store = tx.objectStore("saveInstagram");
  const objectStore = store.getAll();
  objectStore.onsuccess = (e) => {
    console.log(e.target.result);
  }
})

const save = indexedDB.open('save', 1);

save.addEventListener("success", (event) => {
  savedb = event.target.result;
  // console.log({ dbBryan });
});

save.addEventListener("success", (event) => {
  savedb = event.target.result;
  // console.log("success first");
});

save.addEventListener("upgradeneeded", (event) => {
  console.log(event);
  savedb = event.target.result;
  const oldVersion = event.oldVersion;
  const newVersion = event.newVersion || dbBruce.version;
  console.log({ oldVersion, newVersion });
  if (!savedb.objectStoreNames.contains("saveInstagram")) {
    savedb.createObjectStore("saveInstagram", {
      keyPath: "id",
      autoIncrement: true,
    });
  }
});
