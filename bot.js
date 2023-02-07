const { Telegraf } = require('telegraf');
const axios = require('axios');
const { start } = require('repl');

const bot = new Telegraf('6096952099:AAHOMRZQ1J56V-pIrMxqpnWEUxLtc4cqYS4');
bot.start((ctx) => ctx.reply(`
    Привіт мене звати R2-D2, я астромеханічний дроїд і колега C-3PO у всесвіті «Зоряних воєн», створений незадовго до 32 ДБЯ(до Битви при Явині).
    Я можу допомогти тобі визначити погоду, це дуже легко, просто вишли мені свою геопозицію, або напиши місто де знаходишся!
`));
bot.on('message', async (ctx) => {
    try{
        const text = ctx.update.message.text
        encodeText = encodeURIComponent(text)
        // data.message = 'city not found'
        if (text) {
            
            // const er = ctx.response.data.message
            // console.log(er)

            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeText}&units=metric&appid=a0ffd491e459cd90a31940847c34fd62`);
            const loc = response.data.name
            const temp = Math.round(response.data.main.temp)
            const feel = Math.round(response.data.main.feels_like)
            const humidity = response.data.main.humidity
            let weatherType = response.data.weather[0].id; 
            let emojiIcon = ''

            if (weatherType >= 200 && weatherType <= 232)  emojiIcon = '⚡';
            else if (weatherType >= 300 && weatherType <= 321) emojiIcon = '☔';
            else if (weatherType >= 500 && weatherType <= 531) emojiIcon = '🌧';
            else if (weatherType >= 600 && weatherType <= 622)  emojiIcon = '❄';
            else if (weatherType >= 701 && weatherType <= 781)  emojiIcon = '🌪';
            else if (weatherType >= 801 && weatherType <= 804)  emojiIcon = '⛅';
            else if (weatherType == 800)  emojiIcon = '☀️';
        
            ctx.reply(`Локація: ${loc}\nТемпература: ${temp}C\nBідчувається як: ${feel}C\nВологість: ${humidity}%\n${emojiIcon}
            `)
        } else {
            const location = ctx.message.location;

            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=a0ffd491e459cd90a31940847c34fd62`);
            const loc = response.data.name
            const temp = Math.round(response.data.main.temp)
            const feel = Math.round(response.data.main.feels_like)
            const humidity = response.data.main.humidity
            let weatherType = response.data.weather[0].id; 
            let emojiIcon = ''

            if (weatherType >= 200 && weatherType <= 232)  emojiIcon = '⚡';
            else if (weatherType >= 300 && weatherType <= 321) emojiIcon = '☔';
            else if (weatherType >= 500 && weatherType <= 531) emojiIcon = '🌧';
            else if (weatherType >= 600 && weatherType <= 622)  emojiIcon = '❄';
            else if (weatherType >= 701 && weatherType <= 781)  emojiIcon = '🌪';
            else if (weatherType >= 801 && weatherType <= 804)  emojiIcon = '⛅';
            else if (weatherType == 800)  emojiIcon = '☀️';
        
            ctx.reply(`Локація: ${loc}\nТемпература: ${temp}C\nBідчувається як: ${feel}C\nВологість: ${humidity}%\n${emojiIcon}
            `)
        }
    } catch(e) {
        ctx.reply('Вказане не існуюче місто')
        console.log(e)
    }
});


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));






    

