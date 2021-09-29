import * as vscode from 'vscode';

export class VSCodeHelper {
    public static CreateFile(filePath: vscode.Uri) {
        const wsedit = new vscode.WorkspaceEdit();
        wsedit.createFile(filePath);
        vscode.workspace.applyEdit(wsedit);
    }

    public static GetFileAndFolderFromURI(uriPath: vscode.Uri) {
        let filePathArr = uriPath.fsPath.split('\\');

        let fileNameWithExt = filePathArr[filePathArr.length - 1];

        let fileName = fileNameWithExt.slice(0, -4);

        let folderPath = uriPath.fsPath.replace(`\\${fileNameWithExt}`, '');

        filePathArr.splice(-1,1);

        let parentFolderPath = filePathArr.join('\\');

        return {
            fileNameWithExt,
            fileName,
            folderPath,
            parentFolderPath
        };
    }

    public static async CreateCustomPage(selectedUri: vscode.Uri, pageType: string) {
        const { folderPath, fileName, fileNameWithExt } = VSCodeHelper.GetFileAndFolderFromURI(selectedUri);

        if (fileNameWithExt.indexOf('.webpage.yml') === -1 && fileNameWithExt.indexOf('.basicform.yml') === -1
            && fileNameWithExt.indexOf('.advancedformstep.yml') === -1) { return; }

        const newFileName = pageType === 'css' ? `${fileName}.custom_css.css` : `${fileName}.custom_javascript.js`;

        const newFilePath = vscode.Uri.file(folderPath + '/' + newFileName);

        VSCodeHelper.CreateFile(newFilePath);
    }

    public static async Exists(uri: vscode.Uri): Promise<boolean>{
        let result = false;

        try {
            let stats = await vscode.workspace.fs.stat(uri);
            if(stats) {
                result = true;
            }
        } catch (error) {
            if ((error as vscode.FileSystemError).code !== "FileNotFound") {
                throw error;
            }
        }

        return result;
    }
}