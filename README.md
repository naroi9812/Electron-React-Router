# Electron + React Router step by step  
## Demo  
![demo](https://github.com/naroi9812/Electron-React-Router/blob/main/demo.gif)

1. Create React App

```
yarn create react-app appname
cd appname
```

2. Install dependencies

```
yarn add electron
yarn add react-router-dom
```

3. Edit package.json

```
// add this 2 line
"main": "main.js",
"homepage": ".",
// edit "scripts"
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "electron": "electron ."
},
```

4. Delete all the file in src folder except index.js and App.js
5. Edit src/index.js

```
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <ul>
        <li>
          <Link to="/a">a</Link>
        </li>
        <li>
          <Link to="/b">b</Link>
        </li>
        <li>
          <Link to="/c">c</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/a" element={<h1>Page a</h1>} />
        <Route path="/b" element={<h1>Page b</h1>} />
        <Route path="/c" element={<h1>Page c</h1>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

```

7. Create main.js  
   Edit the template from [Electron quick start](https://www.electronjs.org/docs/latest/tutorial/quick-start#access-nodejs-from-the-renderer-with-a-preload-script)

```
// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index page of the app.
  mainWindow.loadURL("http://localhost:3000");
  // mainWindow.loadURL(`file:/${__dirname}/build/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

You can change the URL after react build(yarn build)

```
mainWindow.loadURL("http://localhost:3000");

mainWindow.loadURL(`file:/${__dirname}/build/index.html`);
```

8. Create preload.js  
   Just copy it from the electron quick start link.

```
// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

9. Run the app

```
yarn start
// wait for the development server
yarn electron
```
