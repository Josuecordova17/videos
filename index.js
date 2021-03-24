const express=require('express')
const app=express()
const colors = require('colors')
const { Telegraf } = require('telegraf')
const bot = new Telegraf('1670235152:AAGTclAZpJNwpXTxoHP_Hd8EWAOU5vo3ee8')
console.log('Ejecutando....');
bot.start((ctx) =>{ 
    ctx.reply(`Bienvenid@ ${ctx.from.first_name}`)
    ctx.reply('Mandame el nombre del video que deseas')
    alertar(ctx.from.first_name,ctx.message.text)
})
bot.help(ctx=>clases(ctx))
bot.command('como',(ctx)=>{
    ctx.reply('Podria tardar unos minutos por favor espere')
    ctx.replyWithVideo({source:'videos/demostracion.mkv'})
    alertar(ctx.from.first_name,ctx.message.text)
    })
    bot.on('text', (ctx)=>{
        let txt = ctx.message.text
        txt= txt.toLowerCase()
        txt= txt.trim()
        txt=tildes(txt)
        ctx.reply(`Ya enviaremos los archivos podrian tardar unos minutos`)
        ctx.reply('Si desea saber como descomprimir los archivos ponga /como')
        ctx.reply('Si no recibe ningun archivo en 2 minutos por favor contactar con Josue')
        responder(ctx,txt)
        alertar(ctx.from.first_name,ctx.message.text)
        })
bot.launch()
//Manda los nombres de las clases que tengo 
function clases(ctx) {
re=`1/3/21
fisica temario
lenguaje imagenes
quimica temario
math sen y cosen teorema de pitagoras
biologia temario
2/3/21
fisica repaso#1
lenguaje dibujos de verbos
quimica repaso#1
math ejercicios seno y coseno tema para examen
3/3/21
socio globalizacion
lenguaje sale
tecno si
español tecnicas de la compresion oral
quimica redox
4/3/21
fisica repaso#2
`
ctx.reply(re)
return re
}
function responder(ctx,txt) {
    for (let i = 1; i < 5.; i++) {
        try {
        ctx.replyWithDocument({source:`D:/rars/${txt}.part${i}.rar`})    
        } catch (err) {
            console.log(err);
        }
        
    }
}
function alertar(nombre,accion) {
    let fecha = new Date();
    console.log(`Se respondio solicutud de ${accion} a ${nombre}              ${fecha}`.green);
}
function tildes(txt) {
let re;
    do {
        txt = txt.replace('á','a')
        txt = txt.replace('é','e')
        txt = txt.replace('í','i')
        txt = txt.replace('ó','o')
        txt = txt.replace('ú','u')
         re = txt
        console.log(txt);    
    } while (re.indexOf('á')!=-1 || re.indexOf('é')!=-1|| re.indexOf('í')!=-1|| re.indexOf('ó')!=-1|| re.indexOf('ú')!=-1);
return re    
}
