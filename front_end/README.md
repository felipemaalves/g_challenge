# single-page-app-vanilla-js

Taken from the YouTube Tutorial:
https://www.youtube.com/watch?v=6BozpmSjk-Y

### A Quick Test-Drive

To give the completed code a quick test-drive:

1. Install Node.js
2. Navigate to the project folder and run the following from a terminal:
   - `npm init -y` (to create a Node.js project)
   - `npm i express` (to install Express)
   - `node server.js` (to run the server)
3. Open `localhost` in a web browser, using the port specified in `server.js` e.g. http://localhost:3001/

### CORS situation

Locally, is possible to run into CORS problems. To ignore this problem during tests and development 
you can follow this steps:

### Linux - Chrome
`google-chrome --disable-web-security --user-data-dir=~` to run Google Chrome without CORS.

### MacOS - Chrome
`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`

### Windows - Chrome
1. In a shortcut to start Chrome, you can change the target to:
`"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp`
or add: 
`--disable-web-security --disable-gpu --user-data-dir=~/chromeTemp`
to the target string.
2. Create the `~/chromeTemp` directory
3. Start Chrome through your shortcut with `run as administrator`

[Reference](https://alfilatov.com/posts/run-chrome-without-cors/) to another OS.
