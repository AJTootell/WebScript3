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
      today = new Date();
      weatherWidget = createWeatherMenu()
      document.body.append(weatherWidget);
      createWeatherWidget(weatherWidget,today.getDay());
      break;
    default:
      console.log("Missing widget: " + widget)
      break;
  }
}

/*
██     ██ ███████  █████  ████████ ██   ██ ███████ ██████
██     ██ ██      ██   ██    ██    ██   ██ ██      ██   ██
██  █  ██ █████   ███████    ██    ███████ █████   ██████
██ ███ ██ ██      ██   ██    ██    ██   ██ ██      ██   ██
 ███ ███  ███████ ██   ██    ██    ██   ██ ███████ ██   ██
*/
function createWeatherMenu(){
  var
  weatherWidget = document.createElement('section'),
  today = new Date();

  weatherWidget.id = 'weatherWidget';

  var day = today.getDay();

  createButton(function(e){
    createWeatherWidget(weatherWidget,day);
  },weatherWidget,dayOfWeekAsString(day));
  createButton(function(e){
    createWeatherWidget(weatherWidget,day +1);
  },weatherWidget,dayOfWeekAsString(day +1));
  createButton(function(e){
    createWeatherWidget(weatherWidget,day +2);
  },weatherWidget,dayOfWeekAsString(day +2));
  createButton(function(e){
    createWeatherWidget(weatherWidget,day +3);
  },weatherWidget,dayOfWeekAsString(day +3));
  createButton(function(e){
    createWeatherWidget(weatherWidget,day +4);
  },weatherWidget,dayOfWeekAsString(day +4));

  return weatherWidget;
}
function createWeatherWidget(weatherWidget,day){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/weather', true);
  xhr.onload = function() {
    var
    data = JSON.parse(xhr.responseText),
    table,
    thread,
    tr;

    data.forEach(function(entry){
      var
      time = new Date(entry.dateTime);

      if(time.getDay() == day){
        if(time.getHours() == 0 || table == undefined){
          oldTable = weatherWidget.children[5];
          if(oldTable != undefined){
            weatherWidget.removeChild(oldTable)
          }
          table = createTable(weatherWidget,[dayOfWeekAsString(time.getDay()),"Forecast","Temperature"]);
        }

        tr = document.createElement('tr');
        table.children[table.children.length -1].append(tr);

        addToTable(tr,formatTime(time),'th','row');
        addToTable(tr,capitaliseFirstLetter(entry.description),'th','row');
        addToTable(tr,Math.round(entry.temp) + '&#8451','th','row');
      }
    });
    //document.getElementById('weatherWidget').append(table);
  }
  xhr.send();
}

function createButton(func,section,text){
  var button = document.createElement('button');
  button.innerHTML = text;
  button.addEventListener('click',func)
  section.append(button);
}

function createTable(section,headers){
  table = document.createElement('table'),
  thread = document.createElement('thread'),
  tr = document.createElement('tr');

  section.append(table);
  table.append(thread);
  thread.append(tr);

  headers.forEach(function(header){
    addToTable(tr,header,'th','col');
  });
  return table;
}

function addToTable(table,text,format,position) {
  var
  newEl = document.createElement(format);

  if(format == 'th'){
    newEl.scope = position;
  }

  newEl.innerHTML = text;
  table.append(newEl);
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
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex];
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
