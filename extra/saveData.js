const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const entriesFilePath = path.join(__dirname, '../../entries.json');
const exitsFilePath = path.join(__dirname, '../../exits.json');

// Function to save vehicle entry
function saveEntry(entry) {
    let entries = [];
    if (fs.existsSync(entriesFilePath)) {
        const data = fs.readFileSync(entriesFilePath);
        entries = JSON.parse(data);
    }

    // Add a unique ID to the entry
    const entryWithId = { id: uuidv4(), ...entry };
    entries.push(entryWithId);
    fs.writeFileSync(entriesFilePath, JSON.stringify(entries, null, 2));
    return entryWithId.id;
}

// Function to save vehicle exit details with the same ID as entry
function saveExit(exitDetails) {
    let exits = [];
    if (fs.existsSync(exitsFilePath)) {
        const data = fs.readFileSync(exitsFilePath);
        exits = JSON.parse(data);
    }

    exits.push(exitDetails);
    fs.writeFileSync(exitsFilePath, JSON.stringify(exits, null, 2));
}

module.exports = { saveEntry, saveExit };
