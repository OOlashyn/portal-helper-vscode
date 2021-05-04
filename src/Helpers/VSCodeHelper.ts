import * as vscode from 'vscode';

export class VSCodeHelper {
    public static CreateFile(filePath:vscode.Uri){
        const wsedit = new vscode.WorkspaceEdit();
        wsedit.createFile(filePath);
        vscode.workspace.applyEdit(wsedit);
    }

    public static GetFileAndFolderFromURI(uriPath:vscode.Uri){
        let filePathArr = uriPath.fsPath.split('\\');

        let fileNameWithExt = filePathArr[filePathArr.length-1];

        let fileName = fileNameWithExt.slice(0,-4);

        let folderPath = uriPath.fsPath.replace(`\\${fileNameWithExt}`,'');

        return {
            fileNameWithExt,
            fileName,
            folderPath
        };
    }
}