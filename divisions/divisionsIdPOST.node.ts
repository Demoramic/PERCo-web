export {};
//Division editing method
//Nodejs server side implementation
import http from 'http'; //in case of https request, you need to import the https module

//Response data structure
interface ResponseData {
	result?: string; //division id (Returned in case of success)
	error?: string; //Returned in case of error
}

//Request data
let bodyParams = JSON.stringify({
	comment: 'Edited division',
	name: 'New name of division',
	work_schedule: 4,
});

//Authorization token
let token = 'master'; 

//id of the edited division
const divisionId = 10;

//http(s) request parameters
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/divisions/${divisionId}?token=${token}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyParams),
    },
    
};

//Server request
const req = http.request(options, (response) => {
	let data = '';
	//Get data from the server
	response.on('data', (chunk) => {
		data += chunk;
	});
	//Handling of received data
	response.on('end', () => {
        //Decode the response in json format
		let responseData = JSON.parse(data) as ResponseData;
		//If the server returns a code of 200, then we process the data
		if (response.statusCode === 200) {
			console.log('Division successfully edited');
		}
		//If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
		else {
			throw new Error(`An error occurred while executing the request ${responseData.error}`);
		}
	});
});

//Sending request body
req.write(bodyParams);

//Handling errors occurred during request execution
req.on('error', (error) => {
	console.error(error.message);
});

//Completing the request
req.end();
