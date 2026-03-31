import * as vscode from "vscode";
import { Terminal } from "../Helpers/Terminal";
import { Commands } from "../Helpers/Commands";
import { VSCodeHelper } from "../Helpers/VSCodeHelper";

import * as yaml from "js-yaml";
import { EntityPicker } from "../Helpers/EntityPicker";

interface IPortalConfig {
  portalId: string;
  portalPath: string;
}

interface IEntity {
  displayName: string;
  schemaName: string;
}

interface IPAWebsite {
  adx_name: string;
  adx_website_language: number;
  adx_websiteid: string;
  adx_headerwebtemplateid?: string;
  adx_footerwebtemplateid?: string;
  adx_defaultlanguage?: string;
  [x: string]: any;
}
export class PortalActions {
  private _context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  public async ListPortals() {
    vscode.window.showInformationMessage(
      "Portal Helper: List of Available Portals"
    );

    Terminal.RunCommand(Commands.PortalList());
  }

  public async DownloadPortal() {
    vscode.window.showInformationMessage(
      "Portal Helper: Download specific portal"
    );

    const localPortalPathOptions: vscode.InputBoxOptions = {
      prompt:
        "Enter local path where portal will be downloaded or c for current folder",
      placeHolder: "Local path C:\\Code\\Portals",
    };

    let localPortalPath = await vscode.window.showInputBox(
      localPortalPathOptions
    );

    if (!localPortalPath) {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide local path for Portal to be downloaded into"
      );
      return;
    }

    if (localPortalPath === "c" && vscode.workspace.workspaceFolders) {
      localPortalPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    }

    const websiteIdOptions: vscode.InputBoxOptions = {
      prompt: "Provide Id of the portal to download",
      placeHolder: "Id like 00000000-0000-0000-0000-000000000000",
    };

    const websiteId = await vscode.window.showInputBox(websiteIdOptions);

    if (!websiteId) {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide id of the website"
      );
      return;
    }

    const isSkipIncludedEntities = vscode.workspace
      .getConfiguration("portalHelper.downloadPortal")
      .get("skipIncludedEntities");

    let includedEntities: string = "";

    if (!isSkipIncludedEntities) {
      const entitiesToIncludeArr = await EntityPicker(
        "Select entities to include (optional)"
      );

      if (entitiesToIncludeArr.length !== 0) {
        includedEntities = entitiesToIncludeArr.map((el) => el.value).join(",");
      }
    }

    let excludedEntities: string = "";

    const isSkipExcludedEntities = vscode.workspace
      .getConfiguration("portalHelper.downloadPortal")
      .get("skipExcludedEntities");

    if (!isSkipExcludedEntities) {
      const entitiesToExcludeArr = await EntityPicker(
        "Select entities to exclude (optional)"
      );

      if (entitiesToExcludeArr.length !== 0) {
        excludedEntities = entitiesToExcludeArr.map((el) => el.value).join(",");
      }
    }

    const modelVersionItems: string[] = ["1", "2"];

    const modelVersionOptions: vscode.QuickPickOptions = {
      canPickMany: false,
      placeHolder:
        "Select version 2 if you are using Enhanced Data Model (optional)",
    };

    const modelVersionPortal = await vscode.window.showQuickPick(
      modelVersionItems,
      modelVersionOptions
    );

    const overwriteOptionsItems: string[] = ["Yes", "No"];

    const overwriteOptions: vscode.QuickPickOptions = {
      canPickMany: false,
      placeHolder: "Overwrite existing portal (optional)",
    };

    const overwritePortal = await vscode.window.showQuickPick(
      overwriteOptionsItems,
      overwriteOptions
    );

    Terminal.RunCommand(
      Commands.DownloadPortal(
        localPortalPath,
        websiteId,
        overwritePortal,
        includedEntities,
        excludedEntities,
        modelVersionPortal
      )
    );
  }

  public async DownloadLatestPortal() {
    vscode.window.showInformationMessage(
      "Portal Helper: Download Latest portal"
    );

    if (vscode.workspace.workspaceFolders) {
      const filePath = vscode.Uri.joinPath(
        vscode.workspace.workspaceFolders[0].uri,
        "website.yml"
      );

      let webSiteDocument;

      try {
        webSiteDocument = await vscode.workspace.openTextDocument(filePath);
      } catch (error) {
        vscode.window.showErrorMessage(
          `Portal Helper: website.yml wasn't found in the directory`
        );
        return;
      }

      if (webSiteDocument) {
        const webSiteInfoText = webSiteDocument.getText();

        const webSiteInfo = yaml.load(webSiteInfoText) as IPAWebsite;

        const { parentFolderPath } = VSCodeHelper.GetFileAndFolderFromURI(
          vscode.workspace.workspaceFolders[0].uri
        );

        Terminal.RunCommand(
          Commands.DownloadPortal(
            parentFolderPath,
            webSiteInfo.adx_websiteid,
            "Yes",
            vscode.workspace
              .getConfiguration("portalHelper.downloadLatest")
              .get("includeEntities"),
            vscode.workspace
              .getConfiguration("portalHelper.downloadLatest")
              .get("excludeEntities"),
            vscode.workspace
              .getConfiguration("portalHelper.downloadLatest")
              .get("modelVersion")
          )
        );
      } else {
        vscode.window.showErrorMessage(
          `Portal Helper: website.yml wasn't found in the directory`
        );
      }
    } else {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to have at least one folder open"
      );
    }
  }

  public async UploadPortal(currentPortal?: boolean) {
    vscode.window.showInformationMessage("Portal Helper: Upload portal");

    const localPortalPathOptions: vscode.InputBoxOptions = {
      prompt:
        "Enter local path from where portal will be uploaded or c for current folder",
      placeHolder: "Local path C:\\Code\\Portals\\starter-portal",
    };

    let localPortalPath = !currentPortal
      ? await vscode.window.showInputBox(localPortalPathOptions)
      : "c";

    if (!localPortalPath) {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide local path for Portal to be uploaded from"
      );
      return;
    }

    if (localPortalPath === "c" && vscode.workspace.workspaceFolders) {
      localPortalPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    } else {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide local path for Portal to be uploaded from"
      );
      return;
    }

    let deploymentProfile: string | undefined = undefined;

    if (!currentPortal) {
      let deploymentProfileOptionsItems: string[] = ["No Profile (default)"];

      const deploymentProfilQuickPickOptions: vscode.QuickPickOptions = {
        canPickMany: false,
        placeHolder: "Deployment profile (optional)",
      };

      if (vscode.workspace.workspaceFolders) {
        const deploymentProfilesUri = vscode.Uri.joinPath(
          vscode.workspace.workspaceFolders[0].uri,
          "deployment-profiles"
        );

        const deploymentProfilesFolderExists = await VSCodeHelper.Exists(
          deploymentProfilesUri
        );

        if (deploymentProfilesFolderExists) {
          const deploymentProfiles: [string, vscode.FileType][] =
            await vscode.workspace.fs.readDirectory(deploymentProfilesUri);
          if (deploymentProfiles.length > 0) {
            for (let index = 0; index < deploymentProfiles.length; index++) {
              const folderElement = deploymentProfiles[index];
              const extIndex = folderElement[0].indexOf(".deployment.yml");
              if (
                folderElement[1] === vscode.FileType.File &&
                extIndex !== -1
              ) {
                deploymentProfileOptionsItems.push(
                  folderElement[0].slice(0, extIndex)
                );
              }
            }
          }
        }
      }

      deploymentProfile =
        deploymentProfileOptionsItems.length > 1
          ? await vscode.window.showQuickPick(
              deploymentProfileOptionsItems,
              deploymentProfilQuickPickOptions
            )
          : undefined;

      if (deploymentProfile === "No Profile (default)") {
        deploymentProfile = undefined;
      }
    }

    Terminal.RunCommand(
      Commands.UploadPortal(localPortalPath, deploymentProfile)
    );
  }

  public async BootstrapMigrate() {
    vscode.window.showInformationMessage("Portal Helper: Bootstrap Migrate");

    const localPortalPathOptions: vscode.InputBoxOptions = {
      prompt:
        "Enter local path from where portal will be uploaded or c for current folder",
      placeHolder: "Local path C:\\Code\\Portals\\starter-portal",
    };

    let localPortalPath = await vscode.window.showInputBox(
      localPortalPathOptions
    );

    if (!localPortalPath) {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide local path for Portal to be migrated from"
      );
      return;
    }

    if (localPortalPath === "c" && vscode.workspace.workspaceFolders) {
      localPortalPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    } else {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide local path for Portal to be migrated from"
      );
      return;
    }

    Terminal.RunCommand(Commands.BootstrapMigrate(localPortalPath));
  }

  public async DownloadCodeSite() {
    vscode.window.showInformationMessage("Portal Helper: Download Code Site");

    const localPathOptions: vscode.InputBoxOptions = {
      prompt: "Enter local path where the code site will be downloaded or c for current folder",
      placeHolder: "Local path C:\\Code\\Sites",
    };

    let localPath = await vscode.window.showInputBox(localPathOptions);

    if (!localPath) {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide a local path for the code site to be downloaded into"
      );
      return;
    }

    if (localPath === "c" && vscode.workspace.workspaceFolders) {
      localPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    }

    const websiteIdOptions: vscode.InputBoxOptions = {
      prompt: "Provide Id of the code site to download",
      placeHolder: "Id like 00000000-0000-0000-0000-000000000000",
    };

    const websiteId = await vscode.window.showInputBox(websiteIdOptions);

    if (!websiteId) {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide the website ID"
      );
      return;
    }

    const overwriteItems: string[] = ["Yes", "No"];
    const overwriteOptions: vscode.QuickPickOptions = {
      canPickMany: false,
      placeHolder: "Overwrite existing content? (optional)",
    };

    const overwritePick = await vscode.window.showQuickPick(overwriteItems, overwriteOptions);
    const overwrite = overwritePick === "Yes";

    Terminal.RunCommand(Commands.DownloadCodeSite(localPath, websiteId, overwrite));
  }

  public async UploadCodeSite() {
    vscode.window.showInformationMessage("Portal Helper: Upload Code Site");

    const rootPathOptions: vscode.InputBoxOptions = {
      prompt: "Enter root source folder path or c for current folder",
      placeHolder: "Local path C:\\Code\\my-site",
    };

    let rootPath = await vscode.window.showInputBox(rootPathOptions);

    if (!rootPath) {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide the root path for the code site"
      );
      return;
    }

    if (rootPath === "c" && vscode.workspace.workspaceFolders) {
      rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    }

    const compiledPathOptions: vscode.InputBoxOptions = {
      prompt: "Enter path to compiled/build output (optional, press Enter to skip)",
      placeHolder: "C:\\Code\\my-site\\build",
    };

    const compiledPathInput = await vscode.window.showInputBox(compiledPathOptions);
    const compiledPath = compiledPathInput || undefined;

    const siteNameOptions: vscode.InputBoxOptions = {
      prompt: "Enter display name for the site (optional, press Enter to skip)",
      placeHolder: "My Power Pages Site",
    };

    const siteNameInput = await vscode.window.showInputBox(siteNameOptions);
    const siteName = siteNameInput || undefined;

    Terminal.RunCommand(Commands.UploadCodeSite(rootPath, compiledPath, siteName));
  }

  public async MigrateDatamodel() {
    vscode.window.showInformationMessage("Portal Helper: Migrate Data Model");

    const actionItems: string[] = ["Migrate", "Check Status", "Reset Migration", "Revert to Standard Data Model"];
    const actionOptions: vscode.QuickPickOptions = {
      canPickMany: false,
      placeHolder: "Select action to perform",
    };

    const action = await vscode.window.showQuickPick(actionItems, actionOptions);

    if (!action) {
      return;
    }

    const websiteIdOptions: vscode.InputBoxOptions = {
      prompt: "Provide the website ID",
      placeHolder: "Id like 00000000-0000-0000-0000-000000000000",
    };

    const websiteId = await vscode.window.showInputBox(websiteIdOptions);

    if (!websiteId) {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide the website ID"
      );
      return;
    }

    if (action === "Check Status") {
      Terminal.RunCommand(Commands.MigrateDatamodel(websiteId, true));
      return;
    }

    if (action === "Reset Migration") {
      Terminal.RunCommand(Commands.MigrateDatamodel(websiteId, false, undefined, false, true));
      return;
    }

    if (action === "Revert to Standard Data Model") {
      Terminal.RunCommand(Commands.MigrateDatamodel(websiteId, false, undefined, false, false, true));
      return;
    }

    // Migrate action
    const modeItems: string[] = ["all", "configurationData", "configurationDataReferences"];
    const modeOptions: vscode.QuickPickOptions = {
      canPickMany: false,
      placeHolder: "Select migration mode",
    };

    const mode = await vscode.window.showQuickPick(modeItems, modeOptions);

    if (!mode) {
      return;
    }

    const updateItems: string[] = ["Yes", "No"];
    const updateOptions: vscode.QuickPickOptions = {
      canPickMany: false,
      placeHolder: "Update data model version after successful migration?",
    };

    const updatePick = await vscode.window.showQuickPick(updateItems, updateOptions);
    const updateVersion = updatePick === "Yes";

    Terminal.RunCommand(Commands.MigrateDatamodel(websiteId, false, mode, updateVersion));
  }

  public async CreateCustomJS(selectedUri: vscode.Uri) {
    vscode.window.showInformationMessage("Portal Helper: Create Custom JS");

    VSCodeHelper.CreateCustomPage(selectedUri, "js");
  }

  public async CreateCustomCSS(selectedUri: vscode.Uri) {
    vscode.window.showInformationMessage("Portal Helper: Create Custom CSS");

    VSCodeHelper.CreateCustomPage(selectedUri, "css");
  }

  public async CreateDeploymentProfile() {
    vscode.window.showInformationMessage(
      "Portal Helper: Create Deployment Profile"
    );

    const deploymentProfileOptions: vscode.InputBoxOptions = {
      prompt: "Enter name of the profile",
      placeHolder: "dev | test | etc...",
    };

    let deploymentProfileName = await vscode.window.showInputBox(
      deploymentProfileOptions
    );

    if (!deploymentProfileName) {
      vscode.window.showErrorMessage(
        "Portal Helper: You need to provide a name for the profile"
      );
      return;
    }

    if (vscode.workspace.workspaceFolders) {
      const deploymentProfilesFolderUri = vscode.Uri.joinPath(
        vscode.workspace.workspaceFolders[0].uri,
        "deployment-profiles"
      );

      const deploymentProfilesFolderExists = await VSCodeHelper.Exists(
        deploymentProfilesFolderUri
      );

      if (!deploymentProfilesFolderExists) {
        const directory = await vscode.workspace.fs.createDirectory(
          deploymentProfilesFolderUri
        );
      }

      const newDeploymentProfile = vscode.Uri.joinPath(
        deploymentProfilesFolderUri,
        `${deploymentProfileName}.deployment.yml`
      );

      VSCodeHelper.CreateFile(newDeploymentProfile);
    }
  }
}
