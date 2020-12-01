export {};
//Division deleting method
//Browser side implementation

//Response data structure
interface ResponseData {
	result?: string; //Returned in case of success
	error?: string; //Returned in case of error
}

//Must use your percoweb host address here
let percoServerHost = 'localhost';

//Authorization token
const token = 'user_token';

//Id of the deleted division
const divisionId = 11;


//Server request
fetch(`http://${percoServerHost}/api/divisions/${divisionId}?token=${token}`, {
	method: 'delete'
})
	.then(async (response) => {
		//Decode the response in json format
		let data = (await response.json()) as ResponseData;
		//If the server returns a code of 200, then we process the data
		//in next "then" handler
		if (response.ok) {
			console.log('Division successfully deleted');
		}
		//If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
		else {
			throw new Error(data.error);
		}
	})
	//handle all possible errors that may occur during the execution of the "fetch" (e.g. server unavailability)
	.catch((error) => {
		console.log(error.message);
	});
