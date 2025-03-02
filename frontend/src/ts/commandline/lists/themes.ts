import Config, * as UpdateConfig from "../../config";
import { capitalizeFirstLetterOfEachWord } from "../../utils/misc";
import * as ThemeController from "../../controllers/theme-controller";

const subgroup: MonkeyTypes.CommandsSubgroup = {
  title: "Theme...",
  configKey: "theme",
  list: [],
};

const commands: MonkeyTypes.Command[] = [
  {
    id: "changeTheme",
    display: "Theme...",
    icon: "fa-palette",
    subgroup,
  },
];

function update(themes: MonkeyTypes.Theme[]): void {
  subgroup.list = [];
  const favs: MonkeyTypes.Command[] = [];
  themes.forEach((theme) => {
    if ((Config.favThemes as string[]).includes(theme.name)) {
      favs.push({
        id: "changeTheme" + capitalizeFirstLetterOfEachWord(theme.name),
        display: theme.name.replace(/_/g, " "),
        configValue: theme.name,
        // customStyle: `color:${theme.mainColor};background:${theme.bgColor};`,
        customData: {
          mainColor: theme.mainColor,
          bgColor: theme.bgColor,
          subColor: theme.subColor,
          textColor: theme.textColor,
        },
        hover: (): void => {
          // previewTheme(theme.name);
          ThemeController.preview(theme.name, false);
        },
        exec: (): void => {
          UpdateConfig.setTheme(theme.name);
        },
      });
    } else {
      subgroup.list.push({
        id: "changeTheme" + capitalizeFirstLetterOfEachWord(theme.name),
        display: theme.name.replace(/_/g, " "),
        configValue: theme.name,
        // customStyle: `color:${theme.mainColor};background:${theme.bgColor}`,
        customData: {
          mainColor: theme.mainColor,
          bgColor: theme.bgColor,
          subColor: theme.subColor,
          textColor: theme.textColor,
        },
        hover: (): void => {
          // previewTheme(theme.name);
          ThemeController.preview(theme.name, false);
        },
        exec: (): void => {
          UpdateConfig.setTheme(theme.name);
        },
      });
    }
  });
  subgroup.list = [...favs, ...subgroup.list];
}

export default commands;
export { update };
