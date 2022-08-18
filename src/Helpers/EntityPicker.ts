import { QuickPickItem, window } from "vscode";

interface EntityItem extends QuickPickItem {
  value: string;
}

const commonEntities: EntityItem[] = [
  {
    label: "Advance Forms",
    value: "adx_webform",
  },
  {
    label: "Basic Forms",
    value: "adx_entityform",
  },
  {
    label: "Content Snippets",
    value: "adx_contentsnippet",
  },
  {
    label: "Lists",
    value: "adx_entitylist",
  },
  {
    label: "Page Templates",
    value: "adx_pagetemplate",
  },
  {
    label: "Poll Placements",
    value: "adx_pollplacement",
  },
  {
    label: "Polls",
    value: "adx_poll",
  },
  {
    label: "Table Permissions",
    value: "adx_entitypermission",
  },
  {
    label: "Web Files",
    value: "adx_webfile",
  },
  {
    label: "Web Pages",
    value: "adx_webpage",
  },
  {
    label: "Web Templates",
    value: "adx_webtemplate",
  },
  {
    label: "Weblink Sets",
    value: "adx_weblinkset",
  },
];

export async function EntityPicker(placeHolder: string) {
  return new Promise<EntityItem[]>((resolve, reject) => {
    const input = window.createQuickPick<EntityItem>();
    input.placeholder = placeHolder;
    input.canSelectMany = true;
    input.items = commonEntities;
    input.onDidAccept(() => {
      const selection = [...input.selectedItems];
      resolve(selection);
      input.hide();
    });
    input.onDidHide(() => input.dispose());
    input.show();
  });
}
