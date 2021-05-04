import * as vscode from 'vscode';
import { Terminal } from '../Helpers/Terminal';
import { Commands } from '../Helpers/Commands';
import { VSCodeHelper } from '../Helpers/VSCodeHelper';

interface IPortalConfig {
    portalId: string,
    portalPath: string
}
export class PortalActions {
    private _context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this._context = context;
    }

    public async ListPortals() {
        vscode.window.showInformationMessage('Portal Helper: List of Available Portals');

        Terminal.RunCommand(Commands.PortalList());
    }

    public async DownloadPortal() {
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

    public async DownloadLatestPortal() {
        vscode.window.showInformationMessage('Portal Helper: Download Latest portal');

        const savedPortalConfig = this._context.workspaceState.get('CurrentPortalConfig');

        let portalConfig:IPortalConfig;

        if(savedPortalConfig) {
            portalConfig = savedPortalConfig as IPortalConfig;
        } else {

            let localPortalPathOptions: vscode.InputBoxOptions = {
                prompt: 'Enter local path where portal will be downloaded',
                placeHolder: 'Local path C:\\Code\\Portals or c for current parent folder'
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
    
            portalConfig = {
                portalId: websiteId,
                portalPath: localPortalPath
            };

            this._context.workspaceState.update('CurrentPortalConfig', portalConfig);
        }
        Terminal.RunCommand(Commands.DownloadPortal(portalConfig.portalPath, portalConfig.portalId, 'Yes'));
    }

    public async UploadPortal(currentPortal?: boolean) {
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

        if (localPortalPath === 'c' && vscode.workspace.workspaceFolders) {
            localPortalPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        } else {
            vscode.window.showErrorMessage('Portal Helper: You need to provide local path for Portal to be uploaded from');
            return;
        }

        Terminal.RunCommand(Commands.UploadPortal(localPortalPath));
    }

    public async CreateCustomJS(selectedUri: vscode.Uri) {
        vscode.window.showInformationMessage('Portal Helper: Create Custom JS');

        this.CreateCustomPage(selectedUri, 'js');
    }

    public async CreateCustomCSS(selectedUri: vscode.Uri) {
        vscode.window.showInformationMessage('Portal Helper: Create Custom CSS');

        this.CreateCustomPage(selectedUri, 'css');
    }

    private async CreateCustomPage(selectedUri: vscode.Uri, pageType: string) {
        const { folderPath, fileName, fileNameWithExt } = VSCodeHelper.GetFileAndFolderFromURI(selectedUri);

        if (fileNameWithExt.indexOf('.webpage.yml') === -1 && fileNameWithExt.indexOf('.basicform.yml') === -1
            && fileNameWithExt.indexOf('.advancedformstep.yml') === -1) { return; }

        const newFileName = pageType === 'css' ? `${fileName}.custom_css.css` : `${fileName}.custom_javascript.js`;

        const newFilePath = vscode.Uri.file(folderPath + '/' + newFileName);

        VSCodeHelper.CreateFile(newFilePath);
    }
}