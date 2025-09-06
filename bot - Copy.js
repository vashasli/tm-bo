import { Telegraf, Markup } from "telegraf";
import { message } from "telegraf/filters";
import axios from "axios";
import { SocksProxyAgent } from "socks-proxy-agent";


const startbot = () => {
  const proxyUrl = "socks5h://127.0.0.1:10808"; 
  const agent = new SocksProxyAgent(proxyUrl);

  const bot = new Telegraf("000", {
    telegram: { agent },
  });

  
  bot.start((ctx) => {
  
    let menu = Markup.keyboard([["pouria"], ["قیمت ارز"]]).resize();

    ctx.reply("برای ادامه از کیبورد زیر استفاده کنید", {
      ...menu,
      reply_to_message_id: ctx.message.message_id,
    });
      // دکمه باز کردن مینی اپ
    ctx.reply("برای ورود به مینی‌اپ:", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 باز کردن مینی اپ",
              web_app: { url: "https://emenkaran.com/telegram" },
            },
          ],
        ],
      },
    });
  });


  
  bot.command("ss", (ctx) => {
    let manuu = Markup.inlineKeyboard([
      [
        Markup.button.callback("سلام", "hi"),
        Markup.button.callback("سلام", "hi"),
      ],
    ]);

    ctx.reply("دکمه های شیشه ای", manuu);
  });


  bot.help((ctx) => {
    ctx.reply(
      `<a href='http://t.me/pouriaabbasi86'>به پشتیبانی پیام دهید </a>`,
      {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      }
    );
  });


  bot.command("po", (ctx) => {
    ctx.reply("<a href='https://t.me/pouriaabbasi86'>برای ورود کلیک کنید</a>", {
      parse_mode: "HTML",
      reply_to_message_id: ctx.message.message_id,
    });
  });

  
  bot.on([message("text")], async (ctx) => {
    switch (ctx.message.text) {
      case "سلام خوبی":
        ctx.reply("منم خوبم");
        break;
      case "pouria":
        ctx.reply(
          "<a href='https://t.me/pouriaabbasi86'>برای ورود کلیک کنید</a>",
          { parse_mode: "HTML" }
        );
        break;
      case "قیمت ارز":
        try {
          const response = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price",
            {
              params: {
                ids: "dogecoin,notcoin,tether",
                vs_currencies: "usd",
              },
            }
          );

          const price = response.data;
          const dogs = price.dogecoin.usd;
          const nat = price.notcoin?.usd || "N/A";
          const usd = price.tether.usd;

          ctx.reply(
            `قیمت لحظه‌ای ارزها : 
<b>🐶 دوج‌کوین: $${dogs}
🟡 نات‌کوین: $${nat}
💵 تتر: $${usd}</b>`,
            { parse_mode: "HTML" }
          );
        } catch (err) {
          console.error("خطا در دریافت قیمت:", err.message);
          ctx.reply("❌ خطا در دریافت قیمت. لطفاً بعداً امتحان کنید.");
        }
        break;
      default:
        ctx.reply("از منو استفاده کن ✅");
        break;
    }
  });

  bot
    .launch()
    .then(() => console.log("🚀 ربات با موفقیت لانچ شد"))
    .catch((err) => console.error("❌ خطا در لانچ:", err));
};

export { startbot };
