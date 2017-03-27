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


  switch (widget) {
    case 'weather':
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/weather', true);
      xhr.onload = function() {
        console.log("Getting widget: " + widget);
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
          day = date.getDay();
          appendNewListItem(innerUl,dayOfWeekAsString(day) + " " + row.dateTime)
          appendNewListItem(innerUl,row.description)
          appendNewListItem(innerUl,"Temperature: " + row.temp)
          appendNewListItem(innerUl,"Cloud coverage: " + row.clouds + "%")
          appendNewListItem(innerUl,"Wind speed: " + row.windSpeed)
          appendNewListItem(innerUl,"Wind speed: " + row.seaLevel)
          ul.append(innerUl)
        });
        weatherWidget.append(ul);
        document.body.append(weatherWidget);
      }
      xhr.send();
      break;
    default:
      console.log("Missing widget: " + widget)
      break;
  }
}

function dayOfWeekAsString(dayIndex) {
  return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex];
}

function appendNewListItem(list, item) {
  var li = document.createElement("li")
  li.textContent = item;
  list.append(li);
}
