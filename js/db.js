let dbPromised = idb.open("football-app", 1, upgradeDb => {
  let articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("post_title", "post_title", { unique: false });
});


function saveForLater(team) {
  dbPromised
    .then(db => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(() => {
      console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(teams => {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(team => {
        resolve(team);
      });
  });
}


function deleteTeam(id){
  dbPromised.then(db => {
    let tx = db.transaction("teams", "readwrite");
    let store = tx.objectStore("teams");
    store.delete(id);
    return tx.complete;
  }).then(() => {
    console.log('Item deleted');
  });
}
