import { Server, Faker, uid } from 'react-mock'
import axios from 'axios'

function mock() {
	let mockData;
	const endPoint = '/api/v1/todos';
	const todoSchema = {
		accounts:Math.random(),
		role: Faker.internet.email(),
		key: () => Faker.lorem.sentence(),
		id: () => Faker.date.past()
	};
	const requestHandler = (request, generator) => {
		const todoList = generator.next(10, todoSchema);
		return [200, { 'Content-Type': 'application/json' }, JSON.stringify(todoList)];
	};
	Server.mockGet(endPoint, requestHandler);
	Server.on(); // to start mocking /api/v1/todos API
	axios.get('/api/v1/todos').then(({ data }) => {
		// data is an array of 10 todo objects
		mockData = data
	});
	return mockData
}
export default mock
