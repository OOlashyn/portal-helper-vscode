# Portal Helper

Set of commands to simplify work with Power Apps CLI for Portals.

## Usage

You can view list of available commands via `Ctrl+Shift+P` and type **Portal Helper**.
See shortcuts for available commands below.

## Requirements

You need to have the following prerequisites on your machine:

1. [npm](https://nodejs.org/en/)
2. [PCF CLI](https://aka.ms/PowerAppsCLI)

## List of all available commands

| Command | Description |
| ------- | ----------------- |
| List Portals | Shows the list of available portals for current Dataverse organization |
| Download Portal | Download portal by id from current Dataverse org to specified local path |
| Upload Portal | Upload portal from local folder to current Dataverse org |
| Upload Current Portal | Upload portal from open workspace folder to current Dataverse org |
| Create New Auth Profile | Creates a new auth profile for specified Dataverse org |
| List Auth Profiles | Shows list of profiles that are authenticated with Dataverse orgs for current machine. |
| Delete Auth Profile | Deletes a specific profile from the current machine |
| Switch Auth Profile | Changes the default profile connected to Dataverse org |

### Keyboard Shortcuts

| Command | Keyboard Shortcut |
| ------- | ----------------- |
| Upload Portal | `Ctrl + U, Ctrl + P` |
| Upload Current Portal | `Ctrl + U, Ctrl + C` |
| List Portal | `Ctrl + L, Ctrl + P` |
| Download Portal| `Ctrl + D, Ctrl + P` |

## Features

1. List Portals

    ![List-Portals](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/list-portals.gif?raw=true)

2. Upload Portal

    ![Upload-Portal](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/upload-portal.gif?raw=true)

3. Upload Current Portal

    ![Upload-Current-Portal](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/upload-current-portal.gif?raw=true)

4. Download Portal

    ![Download-Portal](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/download-portal.gif?raw=true)

## Contributing

Found a bug? or have a feature request? - Create a pull request or an issue on [GitHub](https://github.com/OOlashyn/portal-helper-vscode)

## License

This software is released under [MIT License](http://www.opensource.org/licenses/mit-license.php)
Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

### 1.0.1

Initial release
