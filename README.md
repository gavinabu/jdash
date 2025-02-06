# JDash

### How to configure
Create a file named `config.json` and inside write the following
```json
{
  "spotify": {
    "client": "<spotify client id>",
    "secret": "<spotify client secret>"
  },
  "host": "127.0.0.1",
  "dev": true
}
```

Replace spotify client and secret to the ones in your dashboard. Also replace the host to your server's IP address. DEV mode will allow you to skip past the splash screen.

If you want to change the splash screen you can do so by changing `src/media/Splash.png` and `src/media/LoadingSpinner.svg`

### How to start
Run `npm run start:server` on your PC and `npm run start` on either your head unit, or your PC.

If you run `npm run start` on your PC you will have to use your PC's IP address in the URL bar.

Use any browser in KIOSK Mode. It is also recommended to use a 4:3 touchscreen, as that is what it was built for. The one I personally use is from amazon and I will link it below.\
[UNITED STATES](https://www.amazon.com/SunFounder-Raspberry-Touchscreen-1024%C3%97600-Capacitive/dp/B07Y889J3X) |
[CANADA](https://www.amazon.ca/SunFounder-Raspberry-Touchscreen-1024%C3%97600-Capacitive/dp/B07Y889J3X) |
[UK](https://www.amazon.co.uk/SunFounder-Raspberry-Touchscreen-1024%C3%97600-Capacitive/dp/B07Y889J3X)
