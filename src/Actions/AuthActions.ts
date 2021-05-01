import * as vscode from 'vscode';

import { Commands } from '../Helpers/Commands';
import { Terminal } from '../Helpers/Terminal';


export class AuthActions {
    private _context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this._context = context;
    }

    public ListProfiles() {
        vscode.window.showInformationMessage('Portal Helper: List of all authentication profiles');

        Terminal.RunCommand(Commands.AuthList());
    }

    public async CreateProfile() {
        vscode.window.showInformationMessage('Portal Helper: Create Authentication Profile');

        let urlOptions: vscode.InputBoxOptions = {
            prompt: 'Enter URL for Dataverse instance',
            placeHolder: 'URL (e.g.: https://yourdomain.crm4.dynamics.com)'
        };

        let dataverseUrl: string | undefined = await vscode.window.showInputBox(urlOptions);

        if (!dataverseUrl) {
            vscode.window.showErrorMessage("Dataverse URL is required parameter!");
            return;
        }

        Terminal.RunCommand(Commands.AuthCreateProfile(dataverseUrl));
    }

    public async DeleteProfile() {
        vscode.window.showInformationMessage('Portal Helper: Delete Authentication Profile');

        let profileIndexOptions: vscode.InputBoxOptions = {
            prompt: 'Enter profile index to delete',
            placeHolder: 'Profile index (e.g.: 1)'
        };

        let profileIndex: string | undefined = await vscode.window.showInputBox(profileIndexOptions);

        if (!profileIndex) {
            vscode.window.showErrorMessage('Profile index is required parameter!');
            return;
        }

        Terminal.RunCommand(Commands.AuthDeleteProfile(profileIndex));
    }

    public async SwitchProfile() {
        vscode.window.showInformationMessage('Portal Helper: Switch authentication profile');

        let profileIndexOptions: vscode.InputBoxOptions = {
            prompt: 'Enter index of the profile you want to switch to',
            placeHolder: 'Profile index (e.g.: 1)'
        };

        let switchProfileIndex: string | undefined = await vscode.window.showInputBox(profileIndexOptions);

        if (!switchProfileIndex) {
            vscode.window.showErrorMessage('Profile index is required parameter!');
            return;
        }

        Terminal.RunCommand(Commands.AuthSwitchProfile(switchProfileIndex));
    }
}