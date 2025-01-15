import { fi } from '@faker-js/faker';
import { uniq } from 'lodash'

export const RANGE = {
    DAILY: 'DAILY',
    MONTHLY: 'MONTHLY'
}

export const HEALTH_STATUS = {
    NORMAL: 250,
    MARGINAL: 500,
    CRITICAL: 750
}
export const machineFilter = ({data, filterString}) => {
    return data;
}

// Returns list of machines from the excel data
export const extractMachines = (data) => {
    console.log('data', data)
    return uniq(data.map(machine => machine['Main_WorkCtr']))
}

// Filters table by name 
export const filterByName = (data, machineName) => {
    return data.filter((machine) => machine.Main_WorkCtr === machineName)
}

// Gets health info of machine by range(monthly, daily)
export const filterHealthByMachineRange = (data, machineName, range=RANGE.DAILY) => {
    // Daily range
    let datesList = [];
    let healthList = [];
    let summaries = []
   if(range === RANGE.DAILY){
    data.map((machine) => {
        if(machine.Main_WorkCtr === machineName){
            datesList.push(machine.Date_of_Visit)
            healthList.push(HEALTH_STATUS[machine.Health_Status.toUpperCase()])
            summaries.push({observation: machine.Observations_Analysis, analysis: machine.Recommendations, remarks: machine.Remarks})
        }
    });
   }
    return {datesList, healthList,summaries}
}
// const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: [65, 59, 80, 81, 56, 55, 40],
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             tension: 0.4,
//         },
//     ],
// };