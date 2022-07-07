const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const commands = require('./const')
const imgs = require('./const')
const texts = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
  ctx.reply(
    `Здорова ${
      ctx.message.from.first_name === 'Сергей'
        ? 'Серега-фидер'
        : ctx.message.from.first_name
    }`,
  )
  setInterval(() => {
    ctx.replyWithHTML(`Ну шо обсудим, мб кто покатать хочет?`, {
      disable_web_page_preview: true,
    })
  }, 1800000)

  setInterval(() => {
    ctx.replyWithHTML(`Паладины долбяться в попку азазаза`, {
      disable_web_page_preview: true,
    })
  }, 5600000)

  setInterval(() => {
    ctx.replyWithHTML(`Всем здоровки, Серега перестал фидить?`, {
      disable_web_page_preview: true,
    })
  }, 86400000)

  setInterval(() => {
    ctx.replyWithHTML(`Мб кого надо покарать? я это умею кста`, {
      disable_web_page_preview: true,
    })
  }, 3600000)
})
bot.help((ctx) => ctx.reply(`${commands.commands}`))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('лол', (ctx) => {
  ctx.reply(`Бля орнул тоже`)
})
bot.hears('буду', (ctx) => {
  ctx.reply(`идем бухать? или что? я тут`)
})
bot.hears('хах', (ctx) => {
  ctx.reply(`посмотрим кто посмееться последним`)
})
bot.hears('ору', (ctx) => {
  ctx.reply(`тоже кекнул бро`)
})
bot.hears('ору)', (ctx) => {
  ctx.reply(`люди такие тупые хах`)
})
bot.hears('ахах', (ctx) => {
  ctx.reply(`посмотрим кто посмееться последним`)
})
bot.hears('ахаха', (ctx) => {
  ctx.reply(`посмотрим кто посмееться последним`)
})
bot.hears('эт да', (ctx) => {
  ctx.reply(`хуй на`)
})
bot.hears('это да', (ctx) => {
  ctx.reply(`хуй на`)
})
bot.hears('кек', (ctx) => {
  ctx.reply(`ахаха втф XD`)
})
bot.hears('рофл', (ctx) => {
  ctx.reply(`пырснул когда проорался`)
})
bot.hears('пздц', (ctx) => {
  ctx.reply(`ай впизду эту хуйню соглы`)
})
bot.hears('горит жопа', (ctx) => {
  ctx.reply(`ровняй руки прост пффф`)
})
bot.hears('как же горит жопа', (ctx) => {
  ctx.reply(`похоже причина в тебе мой друг`)
})
bot.hears('я знаю', (ctx) => {
  ctx.reply(`ой не пизди, знает он...`)
})
bot.hears('захожу', (ctx) => {
  ctx.reply(`я уже вошел в твою мамку как-то раз`)
})
bot.hears('я в войсе', (ctx) => {
  ctx.reply(`а я в твоей мамке ахахах`)
})
bot.hears('да', (ctx) => {
  ctx.reply(`хуй на`)
})
bot.hears('держи два', (ctx) => {
  ctx.reply(`держи три`)
})
bot.hears('300', (ctx) => {
  ctx.reply(`остоси у тракториста`)
})
bot.hears('триста', (ctx) => {
  ctx.reply(`остоси у тракториста`)
})
bot.hears('тристо', (ctx) => {
  ctx.reply(`остоси у тракториста`)
})
bot.hears('нет', (ctx) => {
  ctx.reply(`пидора ответ`)
})
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
        let firstName = ''
        if (name === 'btn_2') {
          firstName = 'Сережа'
        }
        if (name === 'btn_3') {
          firstName = 'Игорь'
        }
        if (name === 'btn_4') {
          firstName = 'Вован'
        }
        await ctx.replyWithPhoto({
          source: src,
        })
        if (src === './img/falos.jpg') {
          await ctx.replyWithHTML(`${firstName} ${texts.text[1]}`, {
            disable_web_page_preview: true,
          })
        } else if (src === './img/Pinok.jpg') {
          await ctx.replyWithHTML(`${firstName} ${texts.text[2]}`, {
            disable_web_page_preview: true,
          })
        } else if (src === './img/podzatilnik.jpg') {
          await ctx.replyWithHTML(`${firstName} ${texts.text[3]}`, {
            disable_web_page_preview: true,
          })
        } else if (src === './img/rasstrel.jpg') {
          await ctx.replyWithHTML(`${firstName} ${texts.text[4]}`, {
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
