submit.addEventListener("click",submit)

function submit(){
  console.log("Getting a new on in there");
  var
  title = getElementById(newTitle).innerHTML,
  desc = getElementById(newDesc).innerHTML;

  $.post('/insert', {title: title, description: desc});
}
