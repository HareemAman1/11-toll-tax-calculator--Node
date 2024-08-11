const fs = require('fs')
const path = require('path')

const enteriesFilePath = path.join(__dirname, '../enteries.json')
const exitsFilePath = path.join(__dirname, '../exits.json')

function saveEntry(entry){
    let enteries = []
    if (fs.existsSync(enteriesFilePath)){
        const data = fs.readFileSync(enteriesFilePath)
        enteries = JSON.parse(data)
    }

    enteries.push(entry)
    fs.writeFileSync(enteriesFilePath, JSON.stringify(enteries, null, 2))
}

function saveExit(exit){
    let exits = []
    if (fs.existsSync(exitsFilePath)){
        const data = fs.readFileSync(exitsFilePath)
        exits = JSON.parse(data)
    }

    exits.push(exit)
    fs.writeFileSync(exitsFilePath, JSON.stringify(exits, null, 2))
}

module.exports = {saveEntry, saveExit}