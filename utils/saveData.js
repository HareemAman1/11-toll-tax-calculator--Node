const fs = require('fs')
const path = require('path')

const enteriesFilePath = path.join(__dirname, '../enteries.json')
// const exitsFilePath = path.join(__dirname, '../exits.json')


///////////// ENTRY POINT /////////////
function saveEntry(entry){
    let enteries = []
    if (fs.existsSync(enteriesFilePath)){
        const data = fs.readFileSync(enteriesFilePath)
        enteries = JSON.parse(data)
    }
    
    enteries.push(entry)
    fs.writeFileSync(enteriesFilePath, JSON.stringify(enteries, null, 2))
}

///////////// EXIT POINT /////////////
function saveExit(exit){
    let exits = []
    if (fs.existsSync(enteriesFilePath)){
        const data = fs.readFileSync(enteriesFilePath)
        exits = JSON.parse(data)
    }
    
    exits.push(exit)
    fs.writeFileSync(enteriesFilePath, JSON.stringify(exits, null, 2))
}


module.exports = {saveEntry, saveExit}










// const readenteriesFilePath = path.join(__dirname, '../enteries.json')
// const readexitsFilePath = path.join(__dirname, '../exits.json')


// function readEntriesFile(callback) {
    //     fs.readFile(readenteriesFilePath, (err, data) => {
//         if (err) {
//             return callback(err, null);
//         }
//         const entries = JSON.parse(data);
//         callback(null, entries);
//     });
// }

// // Function to read exits.json
// function readExitsFile(callback) {
//     fs.readFile(readexitsFilePath,  (err, data) => {
//         if (err) {
//             return callback(err, null);
//         }
//         const exits = JSON.parse(data);
//         callback(null, exits);
//     });
// }

// module.exports = {saveEntry, saveExit, readEntriesFile, readExitsFile}