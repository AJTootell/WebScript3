/*
Redirect from login page to delected dashboard
changes url to appropriate id for the option and lets server do the serving of the new page
*/
function directToDashboard(){

  var
  layout = encodeURIComponent(document.getElementById('laySelect')[0].value),
  url = '/dashboard?layout=' + layout;

  console.log(url);
  if(!layout){
    alert("Select a layout to go to first.")
    return;
  }
  location.href = url;

}
/*
Takes given name of the new layout and posts to server to create new blank dashboard
*/
function createNewLayout(){
  var
  layoutName = document.getElementById("newLayoutName").value,
  url = "/createNewLayout?layoutName="+layoutName,
  xhr = new XMLHttpRequest();

  console.log(url)
  if(!layoutName){
    alert("Name the new layout.")
    return;
  }
  xhr.open('POST', url, true);

  xhr.onload = function(){
    //location.reload();
  };

  xhr.send();
}

/*
██     ██ ██ ██████   ██████  ███████ ████████
██     ██ ██ ██   ██ ██       ██         ██
██  █  ██ ██ ██   ██ ██   ███ █████      ██
██ ███ ██ ██ ██   ██ ██    ██ ██         ██
███ ███  ██ ██████   ██████  ███████    ██
*/
/*
points direction to create blank widget and populate with specific data
easily add new widgets from here
*/
function populate(widgetName,widgetId,xPos,yPos){
  console.log("Getting widget: " + widgetName);
  switch (widgetName) {
    case 'weather':
    console.log("Adding new weather widget: " + widgetName + widgetId);
    var
    today = new Date();

    createWidget(widgetName,widgetId,xPos,yPos);
    createWeatherWidget(widgetId);
    populateWeatherWidget(widgetId,today.getDay());
    break;
    case 'twitter':
    console.log("Adding new twitter widget: " + widgetName + widgetId);
    createWidget(widgetName,widgetId,xPos,yPos);
    createTwitterWidget(widgetId);
    break;
    default:
    console.log("Missing widget: " + widget)
    break;
  }
}
/*
create a blank template of a widget of class section and class based on what widget it is
sets a unique id with widget + id of widget in layoutwidget table
adds event listener to initiate movement of the widget freely areound the page
adds a delete button to remove the widget
*/
function createWidget(widgetName,widgetId,xPos,yPos){
  var
  widget = document.createElement('section');

  widget.classList.add(widgetName);
  widget.id = widgetId;
  widget.style = 'left: ' + xPos + "px; \n top: " + yPos + "px;";
  document.body.append(widget);

  widget.addEventListener("mousedown", widgetMoveStarted, false);

  del = document.createElement('button');
  del.classList.add('delete');
  del.textContent = 'X';
  del.type = 'reset';
  del.addEventListener('click',removeWidget,false);
  widget.append(del);
}

/*
adds a new widget to the layout based on choosen option
posts to the server with the widget id and the layout id
reloads teh page when server has finished
*/
function addWidget(){
  var
  widOptions = document.getElementById('widgetOptions'),
  widget = encodeURIComponent(widOptions.value),
  thisLayout = document.location.search.split('=')[1],
  layout = encodeURIComponent(thisLayout),
  url = '/addWidget?widgetId="'+widget+'"&layoutId="'+layout+'"';

  console.log(url);
  if(!widget){
    alert("Select a widget to add first.")
    return;
  }

  var xhr = new XMLHttpRequest();

  xhr.open('POST', url, true);

  xhr.onload = function(){
    location.reload();
  };
  xhr.send();
}

/*
███████ ██    ██ ███████ ███    ██ ████████ ███████
██      ██    ██ ██      ████   ██    ██    ██
█████   ██    ██ █████   ██ ██  ██    ██    ███████
██       ██  ██  ██      ██  ██ ██    ██         ██
███████   ████   ███████ ██   ████    ██    ███████
*/
/*
seemly unavoidable and greatly irritating global variable
*/
var eventWidget;
/*
sets global varaible and allows target to be moved and end movement
*/
function widgetMoveStarted (e) {
  if(this === e.target){
    eventWidget = e.currentTarget;
    eventWidget.addEventListener("mousemove", moveHandler, true);
    eventWidget.addEventListener("mouseup", widgetDropped, false);
  }
}
/*
removes ability to move and end moving
posts to server to update the widgets new positiooon so not lost if refresh or turn server off
*/
function widgetDropped (e) {
  eventWidget.removeEventListener("mousemove", moveHandler, true);
  eventWidget.removeEventListener("mouseup", widgetDropped, false);
  var
  url = '/newWidgetPosition?xPos='+(e.pageX-25)+
  '&yPos='+(e.pageY-25)+
  '&laywid='+eventWidget.id.slice(6),
  xhr = new XMLHttpRequest();
  console.log(url);
  xhr.open('POST',url,true);
  xhr.send();
}
/*
updates the widgets postion on the page after each little move
*/
function moveHandler (e) {
  e.preventDefault();
  eventWidget.style.left = e.pageX - 25 + 'px';
  eventWidget.style.top = e.pageY - 25 + 'px';
}
/*
removes a set widget, based on target clicked, from the database
reloads the page with remaining wigets for that layout
*/
function removeWidget(e){
  var
  xhr = new XMLHttpRequest(),
  widgetId = e.target.parentNode.id.slice(6),
  layoutId = document.location.search.split('=')[1],
  url = '/removeWidget?widgetId='+widgetId+'&layoutId='+layoutId;

  console.log(widgetId);
  console.log(url);

  xhr.open('POST', url, true);

  xhr.onload = function(){
    location.reload();
  };

  xhr.send();
}
/*
toggle the headers visibility between visible and hidden
toggle buttons opacity from 1 to 0.3
allows for a tidier asthetic on a full screen dashboard
*/
function hideHeader(e){
  var
  button = document.getElementById('hideMe'),
  obj = button.parentNode;
  console.log(obj.style.visibility);
  if(!(obj.style.visibility == 'hidden')){
    obj.style.visibility = 'hidden';
    button.style.opacity = 0.3;
  }else{
    button.style.opacity = 1;
    obj.style.visibility = 'inherit';
  }
}
/*
████████ ██     ██ ██ ████████ ████████ ███████ ██████
---██    ██     ██ ██    ██       ██    ██      ██   ██
---██    ██  █  ██ ██    ██       ██    █████   ██████
---██    ██ ███ ██ ██    ██       ██    ██      ██   ██
---██     ███ ███  ██    ██       ██    ███████ ██   ██
*/
/*
create a twitter widget from twitters api and add it to the given widget
*/
function createTwitterWidget(widgetId){
  var
  widget = document.getElementById(widgetId),
  //twitter = document.createElement('a');
  twitter = document.createElement('a');
  twitter.classList.add("twitter-timeline");
  twitter.href="https://twitter.com/hashtag/portsmouthuni";
  twitter.dataset.widgetId = "847742735004061696";
  twitter.innerhtml = "#portsmouthuni Tweets"
  widget.append(twitter);
  twitter.script = function(d,s,id){
    //console.log("D: " + d + ", S: "+s+", id: "+id);
    var
    js,
    fjs=d.getElementsByTagName(s)[0],
    p=/^http:/.test(d.location)?'http':'https';
    if(!d.getElementById(id)){
      js=d.createElement(s);
      js.id=id;
      js.src=p+"://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js,fjs);
    }
  }(document,"script","twitter-wjs");
}
/*
attempts to change the stlye attributes of the twitter widget every 100ms until successful
*/
function restyleTwitter(){
  var cont = true;
  while(cont){
    if(document.getElementById('twitter-widget-0') != null){
      document.getElementById('twitter-widget-0').style.maxheight = '250px';
      cont = false;
    } else{
      setTimeout(function () {
        restyleTwitter();
      }, 100);;
    }
  }
}

/*
██     ██ ███████  █████  ████████ ██   ██ ███████ ██████
██     ██ ██      ██   ██    ██    ██   ██ ██      ██   ██
██  █  ██ █████   ███████    ██    ███████ █████   ██████
██ ███ ██ ██      ██   ██    ██    ██   ██ ██      ██   ██
-███ ███  ███████ ██   ██    ██    ██   ██ ███████ ██   ██
*/
/*
gets template widgte and adds buttons to populate the widget depending which day of weather is requested
*/
function createWeatherWidget(widgetId){

  var
  weatherWidget = document.getElementById(widgetId);
  today = new Date(),
  day = today.getDay();

  for(var i=0;i<6;i++) {
    var d = function(a) {
      return createButton(function(){
        populateWeatherWidget(widgetId,day+a);
      },weatherWidget,dayOfWeekAsString(day+a));
    }(i);
  }
}
/*
populates a table with the requested days weather, updates every 3 hours
get the data from the server as a JSON string
*/
function populateWeatherWidget(widgetId,day){

  var
  weatherWidget = document.getElementById(widgetId);
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
-██████     ██    ██ ███████
*/
/*
create a default button with a click function/event, a parent element to be stored ina nd text to e displayed on the buttons
*/
function createButton(func,parent,text){
  var button = document.createElement('button');
  button.innerHTML = text;
  button.addEventListener('click',func);
  parent.append(button);
}
/*
create a default table with a parent (section) and list of headers
*/
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
/*
adds a new cell to the given table containin given text
format used to allow creation of data cells or headers
*/
function addToTable(table,text,format,position) {
  var
  newEl = document.createElement(format);

  if(format == 'th'){
    newEl.scope = position;
  }

  newEl.innerHTML = text;
  table.append(newEl);
}
/*
takes a data and returns the time shown as a 24 hours digital clock style
*/
function formatTime(date){
  var
  formattedTime,
  hours = date.getHours(),
  minutes = date.getMinutes();

  minutes = minutes < 10? minutes + "0": minutes;

  formattedTime = hours + ":" + minutes;

  return formattedTime;
}
/*
return text day of week when given numerical, must not exceed 13
*/
function dayOfWeekAsString(dayIndex) {
  dayIndex = dayIndex > 6 ? dayIndex -7:dayIndex;
  return ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"][dayIndex];
}

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
