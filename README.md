# JDash
*head unit*

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