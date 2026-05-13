# Telegram notifications

1. Open Telegram and find `@BotFather`.
2. Send `/newbot`.
3. Enter a bot name, for example `ZONA 6/9 Booking`.
4. Enter a bot username ending in `bot`, for example `zona69_booking_bot`.
5. Copy the token from BotFather.
6. Open your new bot in Telegram and send it any message, for example `start`.
7. Open this URL in a browser, replacing `TOKEN` with your token:

```text
https://api.telegram.org/botTOKEN/getUpdates
```

8. Find `"chat":{"id":...}` in the response and copy the number.
9. Create a file named `.env` in this folder:

```text
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
HOST=127.0.0.1
PORT=8000
```

10. Restart the site server:

```powershell
node server.js
```

After that, booking form submissions will be sent to Telegram.
