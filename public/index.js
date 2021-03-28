var l = document.getElementById('link'),
n=document.getElementById('name')
function enviar() {
 let name = document.getElementById('name').value,
 link = document.getElementById('link').value
let fname = proccesar(name)
let clase = fname.indexOf(' ')
clase=fname.slice(0,clase)
const url='http://localhost:5656/'
    let data={
        name:fname,
        link:link,
        clase:clase
    }
         fetch(url, {
    method: 'PUT', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(()=>{
    l.value=""
    n.value=""
  });     
}
//manda el valor en miniscula sin espacios y tildes
function proccesar(value) {
value= value.toLowerCase()
value= value.trim()
//espacios
while (value.indexOf('  ')!=-1) {
  value=value.replace(' ','')   
}
let re;
    do {
        value = value.replace('á','a')
        value = value.replace('é','e')
        value = value.replace('í','i')
        value = value.replace('ó','o')
        value = value.replace('ú','u')
         re = value   
    } while (re.indexOf('á')!=-1 || re.indexOf('é')!=-1|| re.indexOf('í')!=-1|| re.indexOf('ó')!=-1|| re.indexOf('ú')!=-1);
return re    

}
function env(e) {
if (e.keyCode===13) {
  enviar()
}
}
function fecha() {
  const url='http://localhost:5656/'
  let fecha = new Date();
  fecha=fecha.toString()
  fecha=fecha.slice(0,15)
  fecha = fecha.toUpperCase()
  console.log(fecha);
    let data={
        name:fecha,
        link:'',
        clase:''
    }
         fetch(url, {
    method: 'PUT', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then((res)=>console.log('s'));
}
function texto() {
  let clase = document.getElementById('class').value
  let nameC = document.getElementById('name')
  nameC.value=clase
}
document.getElementById('ndia').addEventListener('click',fecha)
document.getElementById('enviar').addEventListener('click',enviar)