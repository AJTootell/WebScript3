function submitted(){
  console.log("Getting a new one in there");
  var
  name = document.getElementById('newName').textContent,
  desc = document.getElementById('newDesc').textContent,
  url = '/insert?name='+name+'&desc='+desc;


  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.onload = function() {
    if (xhr.status === 200){
      console.log('gud connection made');
      xhr.send();
      console.log('widget sent');
    } else{
      console.log('error inserting new widget');
    }
  }


}

function populate(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/', true);
  xhr.send();
}
