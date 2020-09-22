export {};
import { DivisionInList } from "../models/division.model";
//Метод получения данных подразделения
//Реализация на стороне браузера

//Структура получаемых данных
type ResponseData = ErrorData | DivisionInList[];

interface ErrorData {
	error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = 'localhost';

//авторизационный токен
const token = 'master';

//запрос к серверу
fetch(`http://${percoServerHost}/api/divisions/list?token=${token}`, {
	method: 'get',
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
			throw new Error((<ErrorData>data).error);
		}
	})
	//обрабатываем полученные данные в случае успешного ответа сервера
	.then((data) => {
		console.log(`Список подразделений: `, data);
	})
	//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
	.catch((error) => {
		console.log(error.message);
	});