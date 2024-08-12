const interchange = {
    'Zero Point': 0,
    'NS Interchange': 5,
    'Ph4 Interchange': 10,
    'Ferozpur Interchange': 17,
    'Lake City Interchange': 24,
    'Raiwand Interchange': 29,
    'Bahria Interchange': 34
}

const base = 20;
const distanceRate = 0.2;
const weekTax = 1.5;
const holidays = ['03-23', '08-14', '12-25']  

function calculateToll(entryPoint, exitPoint, date, numberPlate) {

    const entryDistance = interchange[entryPoint]
    const exitDistance = interchange[exitPoint]
    const day = new Date(date).getDay()
    const distanceTravelled = exitDistance - entryDistance

    let toll = distanceRate * distanceTravelled + base;

    const dateStr = date.slice(5);
    if (holidays.includes(dateStr)) {
        // toll /= 2;
        toll *= 0.5;
    } else {

        // MON & WED
        const lastDig = parseInt(numberPlate.split('-')[1]) % 2;
        if ((day === 1 || day === 3) && lastDig === 0) {
            toll *= 0.1;
        }

        // TUES & THURS
        else if ((day === 2 || day === 4) && lastDig !== 0) {
            toll *= 0.1;
        }

        // SAT & SUN  //additional charge
        else if (day === 6 || day === 0) {
            // toll *= weekTax;  
            toll += distanceTravelled * distanceRate * (weekTax - 1);
        }
    }

    return { toll };
}


module.exports = calculateToll







// if (!interchange.hasOwnProperty(entryPoint) || !interchange.hasOwnProperty(exitPoint)) {
//     return { error: 'Choose points from the list' };
// }



// // MON & WED 
// const lastDig = parseInt(numberPlate.split('-')[1]) % 2;
// if ((day === 1 || day === 3) && lastDig === 0){
//     toll*=0.9

// // TUES & THURS 
// } else if ((day === 2 || day === 4) && lastDig !==0) {
//     toll*=0.9
// }

// // SAT & SUN 
// if (day === 6 || day === 0){
//     toll += distanceTravelled * distanceRate * (weekTax - 1);
// }

// // NATIONAL HOLIDAYS 
// const dateStr = date.slice(5)
// if(holidays.includes(dateStr)) {
//     toll*=0.5
// }

// return toll.toFixed(2)
// }