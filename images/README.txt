CODE WITH ANMOL
================

Files:
- index.html
- style.css
- script.js
- images/ (optional)

HOW TO RUN:
1. Open the folder in VS Code.
2. For the Arduino USB feature, do NOT simply double-click index.html.
3. Use VS Code Live Server, or another localhost server.
4. Open the localhost URL in Google Chrome or Microsoft Edge on desktop.
5. Enter:
   CODE WITH ANMOL
6. Click "Connect Arduino".
7. Plug in your Arduino with a USB data cable.
8. Select the serial device in the browser permission window.
9. The site will show "Connected" and a notification.

IMPORTANT:
- A normal website cannot silently scan every USB port.
- Web Serial requires user permission to select a device.
- Some Arduino clones use CH340/CP210x/FTDI USB chips.
- A charge-only USB cable will not work.
- Chrome/Edge desktop are the safest choices for Web Serial.
- Web Serial is generally not available in ordinary iPhone/Android browsers.

PUBLIC WEBSITE:
To let other people open the website from any device, upload these files
to a web host with HTTPS, such as GitHub Pages or another static host.
The Arduino USB connection is made locally on each person's own computer;
the website does not remotely access their USB ports.

CODE WITH ANMOL access phrase:
CODE WITH ANMOL

The phrase is only a front-end gate, not real security. Anyone who can inspect
the site source can see it.
