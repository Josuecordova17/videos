const express=require('express')
const app=express()
const colors = require('colors')
const Telegraf = require('telegraf')
const bot = new Telegraf('1418775488:AAFQPPL2tzlHo0Ba7ZynGbBNs3fiqCVXhOs');
var hacer=true
console.log('Ejecutando....')
//Comando Start
bot.start((ctx)=>{
    ctx.reply(`Hola ${ctx.from.first_name} yo te estare diciendo cuando entrar a tus clases`);
    console.log(`Comando /star contestado a usuario ${ctx.from.first_name}                        ${D}`.green)
})
//Manda el horario de clase 
bot.command(['Clase','clase','Clases','clases','misclases','MisClases'],(ctx)=>{
    console.log(`Solicitud de ${ctx.message.text} contestado a usuario ${ctx.from.first_name}                          ${D}`.green)
    ctx.replyWithPhoto({source: '1.jpeg'});
    ctx.reply("Esas son tus clases")
})
bot.hears(['Clase','clase','Clases','clases','misclase','MisClases'],(ctx)=>{
    ctx.replyWithPhoto({source: '1.jpeg'});
    ctx.reply("Esas son tus clases")
    console.log(`Solicitud de ${ctx.message.text} contestado a usuario ${ctx.from.first_name}                          ${D}`.green)
})
//Dice cuando va ser la proxima clase
bot.command(['siguienteClase','SiguienteClase','siguienteclase','Siguienteclase','ProximaClase','proximaclase','Proximaclase','PróximaClase','próximaclase','Próximaclase'],(ctx)=>{
    let c= clase()
ctx.reply(c)
console.log(`Solicitud de ${ctx.message.text} contestado a usuario ${ctx.from.first_name}                          ${D}`.green)
})
bot.hears(['Siguiente clase','Siguiente Clase','siguiente clase','Proxima Clase','proxima clase','Proxima clase','Próxima Clase','próxima clase','Próxima clase'],(ctx)=>{
    let c= clase()
ctx.reply(c)
console.log(`Solicitud de ${ctx.message.text} contestado a usuario ${ctx.from.first_name}                          ${D}`.green)
})
//Manda el link
bot.command(['Link','link'],(ctx)=>{
    console.log(`Solicitud de ${ctx.message.text} contestado a usuario ${ctx.from.first_name}                          ${D}`.green)
    ctx.reply("http://jc17.ga")
    console.log(`Solicitud de ${ctx.message.text} contestado a usuario ${ctx.from.first_name}`)            
})
bot.hears(['Link','link'],(ctx)=>{
    ctx.replyWithPhoto({source: 'qr.png'});
    ctx.reply("http://bit.ly/2MIeUxj")
    console.log(`Solicitud de ${ctx.message.text} contestado a usuario ${ctx.from.first_name}                        ${D}`.green)
})
//Examenes 
//Que examen voy mañana
bot.hears(['Examen','examen'],(ctx)=>{
    let exa = exam(false)
    ctx.reply(`Mañana vas a ${exa}`)
    console.log(`Solicitud de ${ctx.message.text} contestado a usuario ${ctx.from.first_name}`)  
})
//Que examen voy x dia
bot.hears(['Martes','Miercoles','Jueves','Viernes'],(ctx)=>{
    console.log(`Solicitud de ${ctx.message.text} contestado a usuario ${ctx.from.first_name}`)
    let n = nu(ctx.message.text)
    let exa = exam(n)
    ctx.reply(`Ese dia vas a ${exa}`)
})

bot.launch()
