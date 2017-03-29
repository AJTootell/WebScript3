function addWidget(){
  console.log("Adding a widget");
  var
  widForm = document.getElementById('widForm'),
  widget = encodeURIComponent(widForm[0].value),
  thisLayout = window.body.h1,
  layout = encodeURIComponent(thisLayout.id),
  url = '/add?widget="'+widget+'"&layout="'+layout+'"';

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
  console.log('widget added');
  xhr.send();
}

function changeLayout(){

}

function populate(widget,xPos,yPos){

  console.log("Getting widget: " + widget);
  switch (widget) {
    case 'weather':
      today = new Date();
      weatherWidget = createWeatherMenu(xPos,yPos)
      document.body.append(weatherWidget);
      createWeatherWidget(weatherWidget,today.getDay());
      break;
    default:
      console.log("Missing widget: " + widget)
      break;
  }

}
/*
  ██████  ██████   █████   ██████      ███████ ███    ██  █████  ██████  ██      ███████ ██████
  ██   ██ ██   ██ ██   ██ ██           ██      ████   ██ ██   ██ ██   ██ ██      ██      ██   ██
  ██   ██ ██████  ███████ ██   ███     █████   ██ ██  ██ ███████ ██████  ██      █████   ██   ██
  ██   ██ ██   ██ ██   ██ ██    ██     ██      ██  ██ ██ ██   ██ ██   ██ ██      ██      ██   ██
  ██████  ██   ██ ██   ██  ██████      ███████ ██   ████ ██   ██ ██████  ███████ ███████ ██████
*/

var widget;

function widgetMoveStarted (e) {
  widget = e.target;
  widget.addEventListener("mousemove", moveHandler, true);
}

function widgetDropped (e) {
  widget.removeEventListener("mousemove", moveHandler, true);
}

function moveHandler (e) {
  e.preventDefault();
  //console.log()
  widget.style.left = e.pageX - 25 + 'px';
  widget.style.top = e.pageY - 25 + 'px';

}


/*
  ██     ██ ███████  █████  ████████ ██   ██ ███████ ██████
  ██     ██ ██      ██   ██    ██    ██   ██ ██      ██   ██
  ██  █  ██ █████   ███████    ██    ███████ █████   ██████
  ██ ███ ██ ██      ██   ██    ██    ██   ██ ██      ██   ██
   ███ ███  ███████ ██   ██    ██    ██   ██ ███████ ██   ██
*/
function createWeatherMenu(xPos,yPos){
  var
  weatherWidget = document.createElement('section'),
  today = new Date();

  weatherWidget.classList.add('weatherWidget');
  weatherWidget.style = 'left: ' + yPos + "px; \n top: " + xPos + "px;";
  //weatherWidget.draggable = true;

  var day = today.getDay();

  for(var i=0;i<6;i++) {
    var d = function(a) {
      return createButton(function(){
        createWeatherWidget(weatherWidget,day+a);
      },weatherWidget,dayOfWeekAsString(day+a));
    }(i);
  }

  weatherWidget.addEventListener("mouseup", widgetDropped, false);
  weatherWidget.addEventListener("mousedown", widgetMoveStarted, false)

  return weatherWidget;
}

function createWeatherWidget(weatherWidget,day){
  day = day > 6 ? day -7:day;
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

        addToTable(tr,formatTime(time),'td','row');
        addToTable(tr,capitaliseFirstLetter(entry.description),'td','row');
        addToTable(tr,Math.round(entry.temp) + '&#8451','td','row');
      }
    });
    //document.getElementById('weatherWidget').append(table);
  }
  xhr.send();
}

/*
  ██    ██ ████████ ██ ██
  ██    ██    ██    ██ ██
  ██    ██    ██    ██ ██
  ██    ██    ██    ██ ██
   ██████     ██    ██ ███████
*/

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
  dayIndex = dayIndex > 6 ? dayIndex -7:dayIndex;
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex];
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
