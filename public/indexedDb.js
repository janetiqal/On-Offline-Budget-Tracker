let request = indexedDB.open("budget", 1);
let db;

request.onerror = (err) => {
    console.log("the error:", err.target.errorCode)
};

request.onsuccess = (evt) => {
    db = evt.target.result;
   if (navigator.onLine) { 
       console.log("app online")
   }
};
//executes whenever a new db is created, then the onsuccess event is executed, if db already exists then onsucces event is executed first
request.onupgradeneeded = (evt) => {
    const db = evt.target.result;
    db.createObjectStore(('transaction'), {autoIncrement: true});
};

function saveRecord (record) {
    const transaction = db.transaction(['transaction'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('transaction');
    budgetObjectStore.add(record);
};

// we run another onsuccess event inside this function when the app is back online and if data is in the queue to be added to database
function uploadAllTransactions () {
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