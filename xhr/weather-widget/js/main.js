const request = new XMLHttpRequest();
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', true);
request.addEventListener('load', onLoad);
request.addEventListener('error', () => console.log("Сетевая ошибка."));
function onLoad() {
	if (request.status === 200) {
	  const response = JSON.parse(request.responseText);
	  setData(response);
	} else {
	  console.log(`Ошибка: ${request.status}: ${request.statusText}`);
	}
}
request.send();

