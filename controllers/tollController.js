const calculateToll = require("../utils/calculateToll");
const { saveEntry, saveExit, readEntriesFile, readExitsFile } = require("../utils/saveData");

///////////// ENTRY POINT /////////////
const tollEntry = (req, res) => {
  const { entryPoint, date, numberPlate } = req.body;
  if (!entryPoint || !date || !numberPlate) {
    return res.status(400).send("Fill all feilds");
  }

  if (!calculateToll(entryPoint, entryPoint, date, numberPlate).toll) {
    return res.status(400).send("Choose entry point from the list");
  }

  saveEntry({ entryPoint, date, numberPlate });
  res.status(200).send("Entry recorded");
};


///////////// EXIT POINT /////////////
const tollExit = (req, res) => {
  const { entryPoint, exitPoint, date, numberPlate } = req.body;
  if (!entryPoint || !exitPoint || !date || !numberPlate) {
    return res.status(400).send("Fill all feilds");
  }
 
  if (!calculateToll(entryPoint, exitPoint, date, numberPlate).toll) {
    return res.status(400).send("Choose exit point from the list");
  }
  
  const tollCalculation = calculateToll(entryPoint, exitPoint, date, numberPlate);

  saveExit({entryPoint, exitPoint, date, numberPlate, toll: tollCalculation.toll});
  res.status(200).json({ toll: tollCalculation.toll });
};

module.exports = { tollEntry, tollExit };









//     const toll = calculateToll(entryPoint, exitPoint, date, numberPlate);
//     saveExit({ entryPoint, exitPoint, date, numberPlate, toll });
//     res.status(200).json({ toll });
// };



// // GET: Retrieve entries.json
// const getEntries = (req, res) => {
//   readEntriesFile((err, entries) => {
//       if (err) {
//           return res.status(500).json({ error: 'Error reading entries file' });
//       }
//       res.status(200).json(entries);
//   });
// };

// // GET: Retrieve exits.json
// const getExits = (req, res) => {
//   readExitsFile((err, exits) => {
//       if (err) {
//           return res.status(500).json({ error: 'Error reading exits file' });
//       }
//       res.status(200).json(exits);
//   });
// };