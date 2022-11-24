// eslint-disable-next-line no-undef
import schedule from 'node-schedule';
import { Telegraf } from 'telegraf'
import { quotes } from './text.js'
const BOT_KEY = process.env.BOT_KEY

let job = null
let day = 6
const stikersPacks = [
    'shelby_gang_by_fStikBot',
    'Patrick_Bateman',
    'GoslingLover_by_fStikBot',
    'peredastSunBoy',
    'MrDoomer',
    'GachiiiPack',
]
const rand = (max) => Math.floor(Math.random() * max)
const generateQuote = (d) =>
    `День ${d + 3}\n${quotes[d][0]}\n${quotes[d][1]}\n${quotes[d][2]}`

const arrStikers = []

async function run() {
    const bot = new Telegraf(BOT_KEY)
    bot.launch({
        webhook: {
            domain: 'https://telegram-bot-stoic.onrender.com',
            port: 5050,
        },
    })

    bot.start(async (ctx) => {
        if (job) {
            ctx.reply('Уже запущено')
            return
        }
        stikersPacks.forEach(async (packName) => {
            const pack = await ctx.getStickerSet(packName)
            pack.stickers.forEach((sticker) => arrStikers.push(sticker.file_id))
        })
        job = schedule.scheduleJob('0 3 8 * * *', function () {
            const qute = generateQuote(day)
            const sticker = arrStikers[rand(arrStikers.length)]
            ctx.reply(qute)
            ctx.sendSticker(sticker)
            day++
        })
    })

    bot.command('randomStick', async (ctx) => {
        if (!arrStikers.length) {
            await ctx.reply('Стрикеры не загружены')
            return
        }
        const skrInd = rand(arrStikers.length)
        ctx.sendSticker(arrStikers[skrInd])
    })

    bot.command('pastQuotes', async (ctx) => {
        if (!arrStikers.length) {
            await ctx.reply('Стрикеры не загружены')
            return
        }
        const numb = rand(day - 1)
        const qute = generateQuote(numb < 0 ? 0 : numb)
        const sticker = arrStikers[rand(arrStikers.length)]
        ctx.reply(qute)
        ctx.sendSticker(sticker)
    })
}

export { run }
