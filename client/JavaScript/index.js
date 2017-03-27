function submitted(){
  console.log("Getting a new one in there");
  var
  name = document.querySelector('#newName').value,
  desc = document.querySelector('#newDesc').value,
  url = '/insert?name="'+encodeURIComponent(name)+'"&desc="'+encodeURIComponent(desc)+'"';

  console.log(url);

  var xhr = new XMLHttpRequest();

  xhr.open('POST', url, true);

  xhr.onload = function() {
    if (xhr.status === 200){
      console.log('gud connection made');
    } else{
      console.log('error inserting new widget');
    }
  }
  console.log('widget sent');
  xhr.send();
}

function populate(widget){

  console.log("Getting widget: " + widget);
  switch (widget) {
    case 'weather':
      createWeatherWidget();
      break;
    default:
      console.log("Missing widget: " + widget)
      break;
  }
}

function addTableHeader(table,position,text) {
  var
  tableHeader = document.createElement('th');

  tableHeader.scope = position;

  tableHeader.innerHTML = text;

  table.append(tableHeader);
}

function formatTime(date){
  var
  formattedTime,
  hours = date.getHours(),
  minutes = date.getMinutes();

  minutes = minutes < 10? minutes + "0": minutes;

  formattedTime = hours + ":" + minutes;

  return formattedTime;
}

function dayOfWeekAsString(dayIndex) {
  return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex];
}

function appendNewListItem(list, item) {
  var li = document.createElement("li")
  li.textContent = item;
  list.append(li);
}

/*
██     ██ ███████  █████  ████████ ██   ██ ███████ ██████
██     ██ ██      ██   ██    ██    ██   ██ ██      ██   ██
██  █  ██ █████   ███████    ██    ███████ █████   ██████
██ ███ ██ ██      ██   ██    ██    ██   ██ ██      ██   ██
 ███ ███  ███████ ██   ██    ██    ██   ██ ███████ ██   ██
*/



function createWeatherWidget2(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/weather', true);
  xhr.onload = function() {
    var
    data = JSON.parse(xhr.responseText),
    weatherWidget = document.createElement('table');
    weatherWidget.classList.add('weather');
    weatherWidget.append(document.createElement('thread'));
    weatherWidget.thread.append(document.createElement('tr'));

    addTableHeader(weatherWidget.thread.tr,'col',"Forecast");
    addTableHeader(weatherWidget.thread.tr,'col',"Temperature");

    data.forEach(function(time){

    });
    document.body.append(weatherWidget);
  }
  xhr.send();
}

function createWeatherWidget(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/weather', true);
  xhr.onload = function() {
    var
    data = JSON.parse(xhr.responseText),
    weatherWidget = document.createElement('section'),
    ul = document.createElement("ul");
    weatherWidget.classList.add('weather');
    //console.log(data[0]);
    data.forEach(function (row){
      //console.log(row);
      var
      innerUl = document.createElement("ul"),
      date = new Date(row.dateTime),
      day = date.getDay() - 1;
      if(date.getHours() == 0){
        weatherWidget.append(ul);
        ul = document.createElement("ul");
      }
      appendNewListItem(innerUl,dayOfWeekAsString(day) + " " + formatTime(date))
      appendNewListItem(innerUl,row.description)
      appendNewListItem(innerUl,"Temp: " + Math.round(row.temp))
      //appendNewListItem(innerUl,"Cloud coverage: " + row.clouds + "%")
      //appendNewListItem(innerUl,"Wind speed: " + row.windSpeed)
      //appendNewListItem(innerUl,"Wind speed: " + row.seaLevel)
      ul.append(innerUl)
    });
    weatherWidget.append(ul);
    document.body.append(weatherWidget);
  }
  xhr.send();
}
