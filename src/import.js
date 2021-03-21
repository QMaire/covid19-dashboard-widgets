export const getData = async function (store) {

	const dataRequest = await fetch("https://www.data.gouv.fr/fr/datasets/r/f335f9ea-86e3-4ffa-9684-93c009d5e617")
	const data = await dataRequest.text()

	var CSVdata = []

	var tmpArray = csvToArray(data)

	tmpArray.forEach(function(row){
		CSVdata.push(row)
	})

	var mesuresData = {}

	CSVdata.forEach(function(row){
		mesuresData[row["date"]] = row
	})

	const regionaldataRequest2 = await fetch("https://raw.githubusercontent.com/geoffreyaldebert/data-dashboards/master/regions.json")
	const regionalData = await regionaldataRequest2.json()
	store.commit("setTerritoireData",{level:"reg",data:regionalData})

	console.log(regionalData)

	const departementaldataRequest2 = await fetch("https://raw.githubusercontent.com/geoffreyaldebert/data-dashboards/master/departements.json")
	const departementalData = await departementaldataRequest2.json()
	store.commit("setTerritoireData",{level:"dep",data:departementalData})


	store.commit("initData",mesuresData)

	store.commit("endImport",true)


	return true
}

function csvToArray (csvString) {

	var csvArray = []
	var csvRows = csvString.split(/\n/)
	var csvHeaders = csvRows.shift().split(',')
	for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex) {
		var rowArray = csvRows[rowIndex].split(',')
		var rowObject = csvArray[rowIndex] = {}
		for (var propIndex = 0; propIndex < rowArray.length; ++propIndex) {
			var propValue = rowArray[propIndex].replace(/^"|"$/g, '').replace(/\r/g, '')
			var propLabel = csvHeaders[propIndex].replace(/^"|"$/g, '').replace(/\r/g, '')
			rowObject[propLabel] = propValue
		}
	}

	return csvArray

}
