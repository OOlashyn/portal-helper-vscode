import * as vscode from 'vscode';

export class Terminal {
    private static _terminal: vscode.Terminal;

    private static isCreated: boolean = false;

    private static createTerminal() {
        if (!this.isCreated) {
            this._terminal = vscode.window.createTerminal('Portal Helper');
            this.isCreated = true;
        }
        else {
            vscode.commands.executeCommand('workbench.action.terminal.clear');
        }
        
        this._terminal.show(false);
    }

    public static RunCommand(command: string) {
        this.createTerminal();
        
        this._terminal.sendText(command, true);
    }
}