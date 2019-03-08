const vscode = require('vscode');
const superagent = require('superagent');
const cheerio = require('cheerio');

function activate(context) {
    let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    statusBar.text = '$(eye) GXC';
    statusBar.command = 'extension.GXC';
    statusBar.tooltip = 'Click to get GXC price';
    statusBar.show();
    let disposable = vscode.commands.registerCommand('extension.GXC', function () {
        const url = 'https://m.feixiaohao.com/currencies/gxshares/';
        superagent.get(url).end((err, res) => {
            let $ = cheerio.load(res.text);
            let price = $('.price').text();
            if (price) {
                vscode.window.showInformationMessage(`1 GXC ≈ ¥ ${price}`);
            } else {
                vscode.window.showWarningMessage('Sorry, I\'m lost.');
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;