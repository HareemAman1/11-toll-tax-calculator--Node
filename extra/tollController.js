const calculateToll = require('../utils/calculateToll');
const { saveEntry, saveExit } = require('../utils/saveData');
const fs = require('fs');
const path = require('path');

const entriesFilePath = path.join(__dirname, '../../entries.json');

const tollEntry = (req, res) => {
    const { entryPoint, date, numberPlate } = req.body;
    if (!entryPoint || !date || !numberPlate) {
        return res.status(400).send('Missing required fields');
    }

    saveEntry({ entryPoint, date, numberPlate });
    res.status(200).json({ message: 'Entry recorded' });
};

const tollExit = (req, res) => {
    const { entryPoint, exitPoint, date, numberPlate } = req.body;
    if (!entryPoint || !exitPoint || !date || !numberPlate) {
        return res.status(400).send('Missing required fields');
    }

    let entries = [];
    if (fs.existsSync(entriesFilePath)) {
        const data = fs.readFileSync(entriesFilePath);
        entries = JSON.parse(data);
    }

    const entry = entries.find(entry => 
        entry.numberPlate === numberPlate && 
        entry.entryPoint === entryPoint &&
        entry.date === date
    );

    if (!entry) {
        return res.status(404).send('No matching entry found');
    }

    const toll = calculateToll(entryPoint, exitPoint, date, numberPlate);

    saveExit({ entryPoint, exitPoint, date, numberPlate, toll });

    res.status(200).json({ toll });
};

module.exports = { tollEntry, tollExit };
