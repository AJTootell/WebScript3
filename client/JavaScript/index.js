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

function populate(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/', true);
  xhr.send();
}
