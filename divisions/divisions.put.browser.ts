export {};
//Метод создания нового подразделения
//Реализация на стороне браузера

//Структура получаемых данных
interface ResponseData {
	id?: number; //id подразделения (возвращается в случае успеха)
	error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = 'localhost';

//Данные для отправки запроса
let bodyParams = {
	accompanying: 136,
	comment: 'Подразделение под номером один',
	name: 'Первое подразделение',
	staff_access_template: 51,
	tel: '+79654563423',
	visitor_access_template: 52,
	work_schedule: 5,
};

//авторизационный токен
let token = 'master';

//запрос к серверу
fetch(`http://${percoServerHost}/api/divisions?token=${token}`, {
	method: 'put',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(bodyParams),
})
	.then(async (response) => {
		//декодируем ответ в формате json
		let data = (await response.json()) as ResponseData;
		//если сервер вернул код ответа 200, то передаем декодированные данные
		//в следующий обработчик then
		if (response.ok) {
			return data;
		}
		//если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
		else {
			throw new Error(data.error);
		}
	})
	//обрабатываем полученные данные в случае успешного ответа сервера
	.then((data) => {
		console.log('ID созданного подразделения: ', data.id);
	})
	//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
	.catch((error) => {
		console.log(error.message);
	});