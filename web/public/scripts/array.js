var select = document.getElementById("assunto"); 
var options = ["Lorem ipsum dolor", "consectetur adipisicing", "voluptatibus asperiores"]; 

for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    
    select.appendChild(el);
}