import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";
import { t } from "logseq-l10n";

//https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [
    {
        key: "bulletsType",
        title: t("Bullets type"),
        type: "enum",
        enumChoices: ["default", "line", "vertical", "square", "rotate-square", "large-circle"],
        default: "default",
        description: "",
    },
    {
        key: "booleanBulletHighlight",
        title: t("Use highlight bullets of current path"),
        type: "boolean",
        default: true,
        description: "",
    },
    {
        key: "BulletHighlightColor",
        title: t("Highlight color of bullets"),
        type: "string",
        inputAs: "color",
        default: "#dd0707",
        description: "",
    },
    {
        key: "booleanClosedBullet",
        title: t("Use coloring closed bullets"),
        type: "boolean",
        default: true,
        description: "",
    },
    {
        key: "closedBulletColor",
        title: t("Color of closed bullet"),
        type: "string",
        inputAs: "color",
        default: "#0079fa",
        description: "",
    },
    {
        key: "booleanSelectedBlockHighlight",
        title: t("Use highlight selected block"),
        type: "boolean",
        default: false,
        description: "",
    },
    {
        key: "selectedBlockHighlightColor",
        title: t("Highlight color of selected block"),
        type: "string",
        inputAs: "color",
        default: "#0079fa",
        description: "",
    },
];
