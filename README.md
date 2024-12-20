# Power Pages Helper

Set of commands to simplify work with Power Platform CLI for Power Pages.

## Usage

You can view list of available commands via `Ctrl+Shift+P` and type **Portal Helper**. There are context menu commands as well. See the full list of available commands and shortcuts below.

## Requirements

You need to have the following prerequisites on your machine:

1. [npm](https://nodejs.org/en/)
2. [PCF CLI](https://aka.ms/PowerAppsCLI)

## List of all available commands

| Command | Description |
| ------- | ----------------- |
| List Portals | Shows the list of available portals for current Dataverse organization |
| Download Portal | Download portal by id from current Dataverse org to specified local path |
| Download Latest | Download latest version of the portal by id specified in website.yml from current folder |
| Update Download Latest Settings | Allows to update setting for Download Latest command and download portal based on the new settings |
| Upload Portal | Upload portal from local folder to current Dataverse org |
| Upload Current Portal | Upload portal from open workspace folder to current Dataverse org |
| Migrate to Bootstrap 5 | Convert existing Portal to Bootstrap 5 (will generate a new folder with updated portal) |
| Create New Auth Profile | Creates a new auth profile for specified Dataverse org |
| List Auth Profiles | Shows list of profiles that are authenticated with Dataverse orgs for current machine. |
| Delete Auth Profile | Deletes a specific profile from the current machine |
| Switch Auth Profile | Changes the default profile connected to Dataverse org |
| Create Deployment Profile | Allows to create new deployment profile |

### Context menu commands

| Context Menu Command | Description |
| ------- | ----------------- |
| Create Custom JS | Creates Custom Javascript file (code that will be present in Custom Javascript section of Web Page, Basic Form or Advance Form Step) |
| Create Custom CSS | Creates Custom CSS file (code that will be present in Custom CSS section of Web Page, Basic Form or Advance Form Step) |

### Keyboard Shortcuts

| Command | Keyboard Shortcut |
| ------- | ----------------- |
| Upload Portal | `Ctrl + U, Ctrl + P` |
| Upload Current Portal | `Ctrl + U, Ctrl + C` |
| List Portal | `Ctrl + L, Ctrl + P` |
| Download Portal | `Ctrl + D, Ctrl + P` |
| Download Latest | `Ctrl + D, Ctrl + L` |

### Available Settings

| Setting | Description |
| ------- | ----------------- |
| Download Latest Include Entities | Comma separated list of entities to use as includeEntities parameter in Download Latest command |
| Download Latest Exclude Entities | Comma separated list of entities to use as excludeEntities parameter in Download Latest command |
| Download Latest Model Version | Allows to specify version of the model to download (1 or 2). If not specified, the version 1 will be downloaded |
| Download Portal Skip Included Entities | Allows you to skip Included Entities option in the Download Portal command |
| Download Portal Skip Excluded Entities | Allows you to skip Excluded Entities option in the Download Portal command |


## Features

1. List Portals

    ![List-Portals](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/list-portals.gif?raw=true)

2. Upload Portal

    ![Upload-Portal](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/upload-portal.gif?raw=true)

3. Upload Current Portal

    ![Upload-Current-Portal](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/upload-current-portal.gif?raw=true)

4. Download Portal

    ![Download-Portal](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/download-portal.gif?raw=true)

5. Download Latest

    ![Download-Latest](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/download-latest.gif?raw=true)

6. Create Custom JS and Create Custom CSS

    ![Download-Latest](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/custom-css.gif?raw=true)

## Contributing

Found a bug? or have a feature request? - Create a pull request or an issue on [GitHub](https://github.com/OOlashyn/portal-helper-vscode)

## License

This software is released under [MIT License](http://www.opensource.org/licenses/mit-license.php)
Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

### 1.4.1

#### Changed

- Switch powerpages to pages in CLI commands

### 1.4.0

#### Changed

- Renamed extension to Power Pages Helper
- Switch paportal to powerpages in CLI commands
- Now "Download Portal" supports modedVersion parameter

#### Added

- New command Migrate to Bootstrap 5 - converts existing portal to Bootstrap 5 (creates new folder with updated portal)
- New setting Download Latest Model Version - Allows to specify version of the model to download (1 or 2) to support Enhanced Data Model
- New setting Download Portal Skip Included Entities - Allows you to skip Included Entities option in the Download Portal command
- New setting Download Portal Skip Excluded Entities - Allows you to skip Excluded Entities option in the Download Portal command
### 1.3.0

#### Changed

- Now "Download Portal" supports includeEntities and excludeEntities parameters

#### Added

- New settings for Download Latest command - Include Entities and Exclude Entities
### 1.2.0

#### Changed

- Now "Upload Portal" supports deploymentProfile parameter

#### Added

- New command - "Create Deployment Profile" - allows to create new deployment profile

### 1.1.0

#### Changed

- Now "Download Latest" will use current parent folder and website id from website.yml so you don't need to type folder path and portal id

### 1.0.3

#### Added

- New command - "Download Latest" - allows to download latest changes to the portal + save portal id and folder path to reuse later
- New keybinding for Download Latest command - CTRL+D, CTRL+L
- New Explorer context menu command - "Create Custom JS" - allows to create custom js file for webpages, basic forms and advance form steps
- New Explorer context menu command - "Create Custom CSS" - allows to create custom js file for webpages, basic forms and advance form steps

#### Changed

- Commands now support local folder path that contain white spaces
- Uploaded bigger icon

### 1.0.2

Main icon update

### 1.0.1

Initial release
