function enviar() {
    let homework = document.getElementById('homework').value,
    date = document.getElementById('date').value,
    clase = homework.indexOf(' ')
    clase=homework.slice(0,clase)
   const url='http://192.168.0.8:80/tarea'
       let data={
           tarea:homework,
           clase:clase,
           date:date
       }
            fetch(url, {
       method: 'POST', // or 'PUT'
       mode:'cors',
       body: JSON.stringify(data), // data can be `string` or {object}!
       headers:{
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin':'*'
       }
     }).then(res => res.json())
     .catch(error => console.error('Error:', error))
     .then(()=>{
       console.log('salio bien');
     });     
   }
   document.getElementById('btn').addEventListener('click',enviar)