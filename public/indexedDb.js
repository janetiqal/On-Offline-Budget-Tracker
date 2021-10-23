let request = indexedDB.open("budget", 1);
// console.log(request)
let db;

request.onerror = (err) => {
    console.log("the error:", err.target.errorCode)
};

request.onsuccess = (evt) => {
    db = evt.target.result;
    alert("on success evt fired")
    console.log("db:",db)
    console.log(request.result)

   if (navigator.onLine) { 
       console.log("app online")

   }
};
//executes whenever a new db is created, then then onsuccess event is executed, if db already exists then onsucces event is executed first
request.onupgradeneeded = (evt) => {
    const db = evt.target.result;
    db.createObjectStore(('transaction'), {autoIncrement: true});
};

function saveRecord (record) {
    const transaction = db.transaction(['transaction'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('transaction');
    budgetObjectStore.add(record);
};

// we run another onsuccess event 
function uploadAllTransactions () {
    console.log("check db syncing?")
    const transaction = db.transaction(['transaction'], 'readwrite'); 
    const budgetObjectStore = transaction.objectStore('transaction');
    
    const queuedTransactions = budgetObjectStore.getAll();

    queuedTransactions.onsuccess = () => {
        //only making an API request if data is queued
        if (queuedTransactions.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method:"POST",
                body: JSON.stringify(queuedTransactions.result),
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json"
                }
              })
              .then(response => response.json())
              .then(() => {
                  
                  const transaction = db.transaction(['transaction'], 'readwrite');
                  const budgetObjectStore = transaction.objectStore('transaction');
                  budgetObjectStore.clear();
                  console.log("all queued transactions submitted to db")
              })
              .catch((err) => {
                  console.log(err)
              });
        };
    };
};

window.addEventListener("online", uploadAllTransactions);