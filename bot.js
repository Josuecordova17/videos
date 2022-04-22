const colors=require('colors')
const express=require('express')
const app=express()
const morgan=require('morgan')
const { Telegraf } = require('telegraf')
const bot = new Telegraf('1670235152:AAGTclAZpJNwpXTxoHP_Hd8EWAOU5vo3ee8')
console.log('Ejecutando....');
const mysql = require('mysql');
var id=0;
const msjId = 1207906186;
const path = require('path')
const palabras = `<u><b>Palabras disponibles</b></u>:
Fisica - Manda los videos de Fisica disponibles
Logica - Manda los videos de Logica disponibles
Quimica - Manda los videos de Quimica disponibles
/help - Envia las palabras y los comandos disponibles
/ayuda - Manda un mensaje a Josue dicendo que usted necesita ayuda, utilice si tiene una duda deberia verse asi:
/ayuda Descripcion del problema
/videos - Manda la lista de los videos disponibles
/todo - Manda una lista de los videos disponibles con todo y links
`
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database:'videos'
});
const port = process.env.PORT || 80;
connection.connect((err)=>{
    if (!err) {
        console.log("Conexion existosa".green)
    }else {
        console.error("Conexion fallida /n Error"+JSON.stringify(err,undefined,2))
    }
});
const executeQuery=async(query)=>{
    return new Promise((resolve,rejects)=>{
        connection.query(query,(error,rows,fields)=>{
            if (!error) {
                resolve({rows})
            } else {
                rejects({message:"error en db",error:error})
            }
        })
    })
}
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
    app.put('/video',(req,res)=>{
        let txt = req.body.txt

let ctx={
            message:{
                text:txt
            },
            from:{
                id:'whatsapp',
                first_name:'whatsapp'
            }
        }
        const xl = async (txt,ctx)=>{
            let re = await videos(txt,ctx)
            while (re.indexOf('<b>')!=-1||re.indexOf('</b>')!=-1||re.indexOf('<u>')!=-1||re.indexOf('</u>')!=-1) {
                re=re.replace('<b>','*')
                re=re.replace('</b>','*')
                re=re.replace('<u>','_')
                re=re.replace('</u>','_')   
            }
             res.send({re:re})
          }
          xl(txt,ctx)   
    })
    app.put('/nclases',(req,res)=>{
        let txt = req.body.txt
        console.log(txt);
let ctx={
            message:{
                text:txt
            },
            from:{
                id:'whatsapp',
                first_name:'whatsapp'
            }
        }
        const xl = async (txt,ctx)=>{
            let re = await nclases(txt,ctx)
            re=re.replace('<b>','*')
                re=re.replace('</b>','*')
                re=re.replace('<u>','')
                re=re.replace('</u>','')
             res.send({re:re})
          }
          xl(txt,ctx)   
    })
app.use(express.static('public'))
bot.start((ctx) =>{ 
    ctx.reply(`Bienvenid@ ${ctx.from.first_name}`)
    ctx.reply('Mandame el nombre del video que deseas o utiliza /videos para ver que videos hay')
    ctx.reply('Si no sabe que palabra o comando hace algo utilice /help')
    ctx.reply('En el caso que te deje en visto es por que estoy dormida hablale a Josue por algun lado para que el me levante')
    alertar(ctx.from.first_name,ctx.message.text)
})
bot.command('/todo',(ctx)=>{
    todas(ctx)
})
bot.command('/ayuda',(ctx)=>{
    ctx.reply('Ok ya se le avisara a Josue que usted necesita ayuda')
    id=ctx.from.id
    alertar(ctx.from.first_name,ctx.message.text)
    bot.telegram.sendMessage(msjId,`Hola Josue, ${ctx.from.first_name} ${ctx.from.last_name} ocupa ayuda urgente
El texto fue : ${ctx.message.text}
id : ${ctx.from.id}
Usuario : ${ctx.from.username}`)
})
bot.help((ctx)=>{
    ctx.reply(palabras,{parse_mode:'HTML'})
    ctx.from.first_name,ctx.message.text
})
bot.command('/h',(ctx)=>{
    ctx.reply(palabras,{parse_mode:'HTML'})
    ctx.from.first_name,ctx.message.text
})
bot.command(['videos','Videos','v'],(ctx)=>{
    clases(ctx)
})
bot.hears(['/vídeos','/Vídeos','videos','Videos','/vídeos','/Vídeos','v'], (ctx)=>{
    clases(ctx)
})
bot.hears(['Todo',"Todas",'todo',"todas"],(ctx)=>{
    todas(ctx)
})
bot.hears(['gracias','Gracias'],(ctx)=>{ctx.reply(palabras,{parse_mode:'HTML'})
    alertar(ctx.from.first_name,ctx.message.text)
    ctx.reply('Denada')

})
bot.command('/a',(ctx)=>{
    if (ctx.from.id===msjId) {
        let txt = ctx.message.text,
        msj = txt.replace('/a','')
        let f = new Date();
        console.log(`Comando admin ejecutado a ${id} hecho por ${ctx.from.first_name} a las ${f}`);
        mensaje(id,msj)   
    } else {
        ctx.reply('ERROR No estas autorizado')
        er(ctx,"Intento de acceso no autorizado")
    }
})
bot.on('text', (ctx)=>{
    alertar(ctx.from.first_name,ctx.message.text)
    let txt = ctx.message.text
        txt= txt.toLowerCase()
        txt= txt.trim()
        txt=tildes(txt)
        const r1='"'
        const r2="'"
        const re1 = new RegExp(r1,'g');
        const re2 = new RegExp(r2,'g');
        txt=txt.replace(re1,'')
        txt=txt.replace(re2,'')
        txt=txt.replace(/`/g,'')
        if (txt==='biologia'||txt==="fisica"||txt==="ambiente"||txt==="proyectos") {
            const wl = async (txt,ctx)=>{
              let re = await nclases(txt)
                ctx.reply(re,{parse_mode:'HTML'})
            }
            wl(txt,ctx)
        } else {
            const rl = async (txt,ctx)=>{
                let re = await videos(txt,ctx)
                  ctx.reply(re,{parse_mode:'HTML'})
              }
              rl(txt,ctx)           
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
                if (nombre.indexOf('202')!=-1) {
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
        id=ctx.from.id
        if (err!=null) {
            ctx.reply('A ocurrido un error')    
        }
        bot.telegram.sendMessage(msjId,`Ocurrio un error a : ${ctx.from.first_name}
Mensaje : ${ctx.message.text}
Error : ${err}
Id:${ctx.from.id}`)
console.log(`Ocurrio un error a : ${ctx.from.first_name}
Mensaje : ${ctx.message.text}
Error : ${err}
Id:${ctx.from.id}`);

    }
    function mensaje(id,msj) {
     bot.telegram.sendMessage(id,msj)
     console.log(`Enviando mensaje`);   
    } 
async function todas(ctx) {
    alertar(ctx.from.first_name,ctx.message.text)
     resultado =await executeQuery("SELECT `video`, `linkVideo` FROM `videos` WHERE `linkVideo` NOT IN ('')")
     rows = resultado.rows
    let re='';
    for (let i = 0; i < rows.length; i++) {
        let n =rows[i].video,
    nombre=cap(n)
        re =re +`
`+
`<b>${nombre} : </b> 
${rows[i].linkVideo}`
    }
    ctx.reply(re,{parse_mode:'HTML'})
}
async function nclases(txt) {
    resultado =await executeQuery("SELECT * FROM `videos` WHERE `clase`='"+ txt + "'")
    let rows = resultado.rows
    let t = cap(txt)
                let re = `<b><u> Clase de ${t}</u></b>`
                for (let i = 0; i < rows.length; i++) {
                    let n =rows[i].video,
                nombre=cap(n)
                    re =re +`
`+
nombre
                }
return re
}
async function videos(txt,ctx) {
    let sql ="SELECT * FROM `videos` WHERE `video`='"+ txt + "'"
    resultado =await executeQuery(sql)
    let rows = resultado.rows
    var re=''
            if (rows=="") {
                er(ctx,null)
                re=(`Oh no el video solicitado no existe :
Comprueba la ortografia
${palabras}
Tambien puedes revisar la ortografia`)
            } else {
             re=(`El link es : ${rows[0].linkVideo}`)   
            }       
return re
}
async function nuevoDia(D) {
    let Di=new Date()
    let hoy= Di.toString()
    hoy =  hoy.slice(0,15).toUpperCase()
    let sql ="SELECT `video` FROM `videos` WHERE `video`='"+ hoy + "'"
    resultado =await executeQuery(sql)
    let pl = Di.getDay()
    if (resultado.rows==''&&!(pl==4||pl==6||pl==0)) {
        connection.query("INSERT INTO `videos`(`video`, `linkVideo`, `clase`) VALUES (?,' ',' ')",[hoy],(err)=>{
            if (!err) {
                console.log("Insert exitoso");      
            } else {
            console.log(err);    
            }
        })
    }
}
nuevoDia()
    //mensaje(1485910231,'Sin malas palabras puto att: cordova ')
    //Avisar sobre actualizacion
    //mensaje(-1001401909028,'Ahora ya no es soportado mas /palabras en su lugar usar /help')