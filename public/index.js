function enviar() {
 let name = document.getElementById('name').value,
 link = document.getElementById('link').value,
 clase = document.getElementById('class').value
let fname = proccesar(name),
fclase = proccesar(clase)
const url='http://localhost:5000/'
    let data={
        name:fname,
        link:link,
        clase:fclase
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
//manda el valor en miniscula sin espacios y tildes
function proccesar(value) {
value= value.toLowerCase()
value= value.trim()
let re;
    do {
        value = value.replace('á','a')
        value = value.replace('é','e')
        value = value.replace('í','i')
        value = value.replace('ó','o')
        value = value.replace('ú','u')
         re = value
        console.log(value);    
    } while (re.indexOf('á')!=-1 || re.indexOf('é')!=-1|| re.indexOf('í')!=-1|| re.indexOf('ó')!=-1|| re.indexOf('ú')!=-1);
return re    

}
function fecha() {
  const url='http://localhost:5000/'
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