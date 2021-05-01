import * as vscode from 'vscode';
import {Terminal} from '../Helpers/Terminal';
import {Commands} from '../Helpers/Commands';

export class PortalActions {
    private _context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext){
        this._context = context;
    }

    public async ListPortals(){
        vscode.window.showInformationMessage('Portal Helper: List of Available Portals');

        Terminal.RunCommand(Commands.PortalList());
    }

    public async DownloadPortal(){
        vscode.window.showInformationMessage('Portal Helper: Download specific portal');

        let localPortalPathOptions: vscode.InputBoxOptions = {
            prompt: 'Enter local path where portal will be downloaded',
            placeHolder: 'Local path C:\\Code\\Portals'
        };

        let localPortalPath = await vscode.window.showInputBox(localPortalPathOptions);

        if (!localPortalPath) {
            vscode.window.showErrorMessage('Portal Helper: You need to provide local path for Portal to be downloaded into');
            return;
        }

        let websiteIdOptions: vscode.InputBoxOptions = {
            prompt: 'Provide Id of the portal to download',
            placeHolder: 'Id like 00000000-0000-0000-0000-000000000000'
        };

        let websiteId = await vscode.window.showInputBox(websiteIdOptions);

        if (!websiteId) {
            vscode.window.showErrorMessage('Portal Helper: You need to provide id of the website');
            return;
        }

        let overwriteOptionsItems: string[] = ["Yes", "No"];

        let overwriteOptions: vscode.QuickPickOptions = {
            canPickMany: false,
            placeHolder: "Overwrite existing portal (optional)"
        };

        let overwritePortal = await vscode.window.showQuickPick(overwriteOptionsItems, overwriteOptions);

        Terminal.RunCommand(Commands.DownloadPortal(localPortalPath, websiteId, overwritePortal));
    }

    public async UploadPortal(currentPortal?:boolean){
        vscode.window.showInformationMessage('Portal Helper: Upload portal');

        let localPortalPathOptions: vscode.InputBoxOptions = {
            prompt: 'Enter local path from where portal will be uploaded or c for current folder',
            placeHolder: 'Local path C:\\Code\\Portals\\starter-portal'
        };

        let localPortalPath = !currentPortal ? await vscode.window.showInputBox(localPortalPathOptions) : 'c';

        if (!localPortalPath) {
            vscode.window.showErrorMessage('Portal Helper: You need to provide local path for Portal to be uploaded from');
            return;
        }

        if(localPortalPath === 'c' && vscode.workspace.workspaceFolders){
            localPortalPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        } else {
            vscode.window.showErrorMessage('Portal Helper: You need to provide local path for Portal to be uploaded from');
            return;
        }

        Terminal.RunCommand(Commands.UploadPortal(localPortalPath));
    }
}