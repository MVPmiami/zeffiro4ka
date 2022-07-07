const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const commands = require('./const')
const imgs = require('./const')
const texts = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) =>
  ctx.reply(
    `Здорова ${
      ctx.message.from.first_name === 'Сергей'
        ? 'Серега-фидер'
        : ctx.message.from.first_name
    }`,
  ),
)
bot.help((ctx) => ctx.reply(`${commands.commands}`))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('здоров', (ctx) =>
  ctx.reply(
    `Здорова ${
      ctx.message.from.first_name === 'Сергей'
        ? 'Серега-фидер'
        : ctx.message.from.first_name
    }`,
  ),
)
bot.command('punish', (ctx) => {
  ctx.replyWithHTML(
    '<b>Надо выбрать кого покарать сук!</b>',
    Markup.inlineKeyboard([
      [Markup.button.callback('Леху', 'btn_1')],
      [Markup.button.callback('Сережу', 'btn_2')],
      [Markup.button.callback('Игоря', 'btn_3')],
      [Markup.button.callback('Вована', 'btn_4')],
    ]),
  )
})

const randomImg = (imgs) => {
  const arr = imgs.imgs
  const rand = Math.floor(Math.random() * arr.length)
  const rValue = arr[rand]
  console.log(rValue)
  return rValue
}

const punishFunc = (name, imgs) => {
  bot.action(name, async (ctx) => {
    try {
      await ctx.answerCbQuery()
      if (name === 'btn_1') {
        await ctx.replyWithPhoto({
          source: './img/Lexa.jpg',
        })
        await ctx.replyWithHTML(texts.text[0], {
          disable_web_page_preview: true,
        })
      } else {
        let src = randomImg(imgs)
        await ctx.replyWithPhoto({
          source: src,
        })
        if (src === './img/falos.jpg') {
          await ctx.replyWithHTML(`${texts.text[1]}`, {
            disable_web_page_preview: true,
          })
        } else if (src === './img/Pinok.jpg') {
          await ctx.replyWithHTML(`${texts.text[2]}`, {
            disable_web_page_preview: true,
          })
        } else if (src === './img/podzatilnik.jpg') {
          await ctx.replyWithHTML(`${texts.text[3]}`, {
            disable_web_page_preview: true,
          })
        } else if (src === './img/rasstrel.jpg') {
          await ctx.replyWithHTML(`${texts.text[4]}`, {
            disable_web_page_preview: true,
          })
        }
      }
    } catch (error) {
      console.log(error)
      await ctx.replyWithHTML('Блять я сломался', {
        disable_web_page_preview: true,
      })
    }
  })
}

punishFunc('btn_1', imgs)
punishFunc('btn_2', imgs)
punishFunc('btn_3', imgs)
punishFunc('btn_4', imgs)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
