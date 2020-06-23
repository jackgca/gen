const { app, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
	console.log(process.argv);
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		useContentSize: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			enableRemoteModule: true,
			nodeIntegration: true
		}
	});

	function openDevTools() {
		let devtools = new BrowserWindow();

		mainWindow.webContents.setDevToolsWebContents(devtools.webContents);
		mainWindow.webContents.openDevTools({ mode: 'detach' });

	    mainWindow.webContents.on('did-finish-load', function () {
	        var windowBounds = mainWindow.getBounds();
	        devtools.setPosition(windowBounds.x + windowBounds.width, windowBounds.y);
	        devtools.setSize(windowBounds.width/2, windowBounds.height);
	    });
	    
	    mainWindow.on('move', function () {
	        var windowBounds = mainWindow.getBounds();
	        devtools.setPosition(windowBounds.x + windowBounds.width, windowBounds.y);
	    });
	}

	openDevTools();

	mainWindow.webContents.on('dom-ready', function() {
		mainWindow.webContents.send('project-name', process.argv[2] || "default");
	});

	let indexPath = url.format({
		pathname: path.join(__dirname, 'public', 'index.html'),
		protocol: 'file:',
		slashes: true
	});

	mainWindow.loadURL(indexPath);

	mainWindow.on('closed', function() {
		mainWindow = null
	});
}



app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});