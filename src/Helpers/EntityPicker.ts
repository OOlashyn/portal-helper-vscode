import { QuickPickItem, window } from "vscode";

interface EntityItem extends QuickPickItem {
  value: string;
}

const commonEntities: EntityItem[] = [
  {
    label: "Web Page",
    value: "adx_webpage",
  },
  {
    label: "Web Template",
    value: "adx_webtemplate",
  },
  {
    label: "Page Template",
    value: "adx_pagetemplate",
  },
  {
    label: "Web File",
    value: "adx_webfile",
  },
  {
    label: "Content Snippet",
    value: "adx_contentsnippet",
  },
  {
    label: "Table Permission",
    value: "adx_entitypermission",
  },
  {
    label: "Basic Form",
    value: "adx_entityform",
  },
  {
    label: "Advance Form",
    value: "adx_webform",
  },
  {
    label: "List",
    value: "adx_entitylist",
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
    input.onDidChangeValue(() => {
      // add a new code to the pick list as the first item
      if (input.value !== "" && input.items.findIndex((el) => el.value === input.value) === -1) {
        const newItems = [
          { label: input.value, value: input.value },
          ...input.items,
        ];
        input.items = newItems;
      }
    });
    input.onDidHide(() => input.dispose());
    input.show();
  });
}
