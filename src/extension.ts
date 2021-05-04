// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { AuthActions } from './Actions/AuthActions';

import {PortalActions} from './Actions/PortalActions';
 
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let portalActions = new PortalActions(context);
	let authActions = new AuthActions(context);

	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.list', () => {
			portalActions.ListPortals();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.download', () => {
			portalActions.DownloadPortal();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.upload', () => {
			portalActions.UploadPortal();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.uploadCurrent', () => {
			portalActions.UploadPortal(true);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.createProfile', () => {
			authActions.CreateProfile();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.switchProfile', () => {
			authActions.SwitchProfile();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.deleteProfile', () => {
			authActions.DeleteProfile();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.listProfiles', () => {
			authActions.ListProfiles();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.createCustomJS', (selectedUri: vscode.Uri) => {
			portalActions.CreateCustomJS(selectedUri);
		})
	);

	
	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.createCustomCSS', (selectedUri: vscode.Uri) => {
			portalActions.CreateCustomCSS(selectedUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('portal-helper-vscode.downloadLatestPortal', () => {
			portalActions.DownloadLatestPortal();
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
