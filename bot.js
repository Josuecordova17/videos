const colors=require('colors')
const express=require('express')
const app=express()
const morgan=require('morgan')
const { Telegraf } = require('telegraf')
const bot = new Telegraf('1670235152:AAGTclAZpJNwpXTxoHP_Hd8EWAOU5vo3ee8')
console.log('Ejecutando....');
const mysql = require('mysql');
const { Router } = require('express')
const e = require('express')
const palabras = `<u><b>Palabras disponibles</b></u>:
Fisica
Biologia
Quimica
/help
/ayuda
/videos`
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database:'videos'
});
const port = process.env.PORT || 5656;
connection.connect((err)=>{
    if (!err) {
        console.log("Conexion existosa".green)
    }else {
        console.error("Conexion fallida /n Error"+JSON.stringify(err,undefined,2))
    }
});
app.use(morgan('dev'))
app.use(express.json())
app.listen(port,()=>{
//
console.log(`servidor en puerto ${port}`.yellow)
})
//
app.put('/',(req,res)=>{

    let name = req.body.name,
    link = req.body.link,
    clase = req.body.clase
        connection.query('INSERT INTO `videos`(`video`, `linkVideo`, `clase`) VALUES (?,?,?)',[name,link,clase],(err)=>{
            if (!err) {
                console.log("Insert exitoso");      
            } else {
            console.log(err);    
            }
        })
        res.sendStatus(200)
    })
app.use(express.static('public'))
bot.start((ctx) =>{ 
    ctx.reply(`Bienvenid@ ${ctx.from.first_name}`)
    ctx.reply('Mandame el nombre del video que deseas')
    ctx.reply('Si no se manda el video al instante o tiene alguna duda Hable con Josue o mande /ayuda y agregar su problema')
    alertar(ctx.from.first_name,ctx.message.text)
})
bot.command(['/ayuda','/a'],(ctx)=>{
    ctx.reply('Ok ya se le avisara a Josue que usted necesita ayuda')
    bot.telegram.sendMessage(1207906186,`Hola Josue, ${ctx.from.first_name} ${ctx.from.last_name} ocupa ayuda urgente
El texto fue : ${ctx.message.text}
id : ${ctx.from.id}
Usuario : ${ctx.from.username}`)
})
bot.help((ctx)=>{
    ctx.reply(palabras,{parse_mode:'HTML'})
})
bot.command('/h',(ctx)=>(clase()))
bot.command(['videos','Videos','v'],(ctx)=>{
    clases(ctx)
})
bot.hears(['/vídeos','/Vídeos','videos','Videos','/vídeos','/Vídeos','v'], (ctx)=>{
    clases(ctx)
})
bot.on('text', (ctx)=>{
    alertar(ctx.from.first_name,ctx.message.text)
    let txt = ctx.message.text
        txt= txt.toLowerCase()
        txt= txt.trim()
        txt=tildes(txt)
        if (txt==='biologia'||txt==="fisica"||txt==="quimica") {
            let sql = "SELECT * FROM `videos` WHERE `clase`='"+ txt + "'"
            connection.query(sql,(err,rows,fields)=>{
                let re = ""
                if (!err) {
                for (let i = 0; i < rows.length; i++) {
                    re =re +`
`+
rows[i].video
                }
                ctx.reply(re)
                    }else{
                        er(ctx,err)
               }
                })
        } else {
            let sql ="SELECT * FROM `videos` WHERE `video`='"+ txt + "'"
            connection.query(sql,(err,rows,fields)=>{
                if (!err) {
                    if (rows=="") {
                        er(ctx,err)
                        ctx.reply(`Oh no el video solicitado no existe :
Comprueba la ortografia
${palabras}
Tambien puedes revisar la ortografia`,{parse_mode:'HTML'})
                    } else {
                     ctx.reply(`El link es : ${rows[0].linkVideo}`)   
                    }  
                    }else{
                        er(ctx,err)
               }
                })   
        }    
})
bot.launch()
//Manda los nombres de las clases que tengo 
function clases(ctx) {
    alertar(ctx.from.first_name,ctx.message.text)
    var re='';
    connection.query("SELECT `video` FROM `videos`",(err,rows,fields)=>{
        if (!err) {
            var re = ''
            for (let i = 0; i < rows.length; i++) {
                let n =rows[i].video,
                nombre=cap(n)
                if (nombre.indexOf('2021')!=-1) {
                    re =re +`
`+`<u><b>${nombre}</b></u>`
                } else {
                    re =re +`
`+nombre
                }
            }
            ctx.reply(re,{parse_mode:'HTML'})
            }else{
        er(ctx,err)
       }
        })
    }
    function cap(n) {
        let nombre = n.charAt(0).toUpperCase() + n.slice(1);
        num = nombre.indexOf(' ')
        nombre =nombre.slice(0,num+1) + nombre.charAt(num+1).toUpperCase() + nombre.slice(num+2);
    return nombre
    }
    function alertar(nombre,accion) {
        let fecha = new Date();
        console.log(`Se respondio solicutud de ${accion} a ${nombre}              ${fecha}`.green);
    }
    function tildes(txt) {
        //espacios
        while (txt.indexOf('  ')!=-1) {
            txt=txt.replace(' ','')   
        }
    let re;
        do {
            txt = txt.replace('á','a')
            txt = txt.replace('é','e')
            txt = txt.replace('í','i')
            txt = txt.replace('ó','o')
            txt = txt.replace('ú','u')
             re = txt
        } while (re.indexOf('á')!=-1 || re.indexOf('é')!=-1|| re.indexOf('í')!=-1|| re.indexOf('ó')!=-1|| re.indexOf('ú')!=-1);
    return re    
    }
    function er(ctx,err) {
        console.log(err);
        if (err!=null) {
            ctx.reply('A ocurrido un error')    
        }
        bot.telegram.sendMessage(1207906186,`Ocurrio un error a : ${ctx.from.first_name}
Mensaje : ${ctx.message.text}
Error : ${err}`)
    }
    function mensaje(id,msj) {
     bot.telegram.sendMessage(id,msj)
     console.log(`Enviando mensaje`);   
    }
    //mensaje(-1001401909028,'Hola')
    //Avisar sobre actualizacion
    //mensaje(-1001401909028,'Ahora ya no es soportado mas /palabras en su lugar usar /help')