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


// Returns list of plants from the excel data
export const extractPlants = () => {
    return ["Smelter 1", "Smelter 2"]
}

// Returns list of machines from the excel data
export const extractMachines = (data) => {
    return uniq(data.map(machine => machine['Main_WorkCtr']))
}

// Returns list of equipments from the excel data
export const extractEquipment = (data) => {
    return uniq(data.map(machine => machine['Equip_Tag_No']))
}

// Filters table by name 
export const filterByName = (data, machineName) => {
    return data.filter((machine) => machine['Main_WorkCtr'] === machineName)
}

export const filterHealthDate = (data, )
// Gets health info of machine
export const filterHealth = (data, machineName='', plantName='', dateFilters={}, equipmentFilter='') => {
    // Filters the machineData based on filters
    // Daily range
    let datesList = [];
    let healthList = [];
    let summaries = []
    console.log('data', data)
    data.map((machine) => {
        const machineDate = new Date(machine['Date_of_Visit'])
        const startDate = new Date(dateFilters?.startDate)
        const endDate = new Date(dateFilters?.endDate)
        
        const dateMatch = Boolean((machineDate >= startDate && machineDate <= endDate))
        const machineNameMatch = Boolean(machine['Main_WorkCtr'] === machineName)
        const plantMatch = Boolean(plantName) 
        const equipmentMatch = Boolean(machine['Equip_Tag_No'] === equipmentFilter)
        console.log('equipFilter', equipmentFilter)
        if(dateMatch && machineNameMatch && plantMatch && equipmentMatch){
            datesList.push(machine.Date_of_Visit)
            healthList.push(HEALTH_STATUS[machine['Health_Status'].toUpperCase()])
            summaries.push({observation: machine.Observations_Analysis, analysis: machine.Recommendations, remarks: machine.Remarks})
        }
    });
    return {datesList, healthList,summaries}
}

// Gets cumulative health status
export const getHealthCumulative = (data) => {
    const health = {CRITICAL: 0, NORMAL: 0, MARGINAL: 0} 
    data.forEach(row => health[row['Health_Status']]++);
    return health
}

export const findDeltaTable = (tableData, changedRows) => {
    const differences = [];

    // Create a map from changedRows for faster lookup
    const mapB = new Map(changedRows.map(item => [item.Sl_No, item]));

    // Iterate through List A and compare each item with List B
    for (const itemA of tableData) {
        const itemB = mapB.get(itemA.Sl_No);
        if (itemB) {
            // Compare the items (excluding Sl_No) for differences
            const { Sl_No, ...restA } = itemA;
            const { Sl_No: _, ...restB } = itemB;

            if (JSON.stringify(restA) !== JSON.stringify(restB)) {
                differences.push(itemB); // Add the updated item from changedRows
            }
        }
    }

    return differences;
}