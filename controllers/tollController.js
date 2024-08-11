const calculateToll = require("../utils/calculateToll");
const { saveEntry, saveExit } = require("../utils/saveData");

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

const tollExit = (req, res) => {
  const { entryPoint, exitPoint, date, numberPlate } = req.body;
  if (!entryPoint || !exitPoint || !date || !numberPlate) {
    return res.status(400).send("Fill all feilds");
  }

  const tollCalculation = calculateToll(
    entryPoint,
    exitPoint,
    date,
    numberPlate
  );

  if (!calculateToll(entryPoint, exitPoint, date, numberPlate).toll) {
    return res.status(400).send("Choose exit point from the list");
  }

  saveExit({
    entryPoint,
    exitPoint,
    date,
    numberPlate,
    toll: tollCalculation.toll,
  });
  res.status(200).json({ toll: tollCalculation.toll });
};

module.exports = { tollEntry, tollExit };

//     const toll = calculateToll(entryPoint, exitPoint, date, numberPlate);
//     saveExit({ entryPoint, exitPoint, date, numberPlate, toll });
//     res.status(200).json({ toll });
// };
