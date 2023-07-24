import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { LSPluginBaseInfo, SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";
const keyHighlightBullets = "highlightBullets";
const keyClosedBullets = "closedBullet";
const keyBulletsType = "bulletsType";
const keySelectedBlockHighlight = "selectedBlockHighlight";

const main = () => {
  logseq.useSettingsSchema(settingsTemplate);
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);

  if (logseq.settings!.booleanBulletHighlight === true) provideHighlightBullets(logseq.settings!.BulletHighlightColor);
  if (logseq.settings!.booleanClosedBullet === true) provideClosedBullets(logseq.settings!.closedBulletColor);
  if (logseq.settings!.booleanSelectedBlockHighlight === true) selectedBlockHighlight();
  provideBulletsType(logseq.settings!.bulletsType || "default");

  logseq.onSettingsChanged((newSet: LSPluginBaseInfo['settings'], oldSet: LSPluginBaseInfo['settings']) => {
    if (oldSet.booleanBulletHighlight !== true && newSet.booleanBulletHighlight === true) {
      provideHighlightBullets(newSet.BulletHighlightColor);
    } else
      if (oldSet.booleanBulletHighlight === true && newSet.booleanBulletHighlight !== true) {
        removeProvideStyle(keyHighlightBullets);
      }
    if (oldSet.BulletHighlightColor !== newSet.BulletHighlightColor) {
      try {
        removeProvideStyle(keyHighlightBullets);
      } finally {
        provideHighlightBullets(newSet.BulletHighlightColor);
      }
    }
    if (oldSet.booleanClosedBullet !== true && newSet.booleanClosedBullet === true) {
      provideClosedBullets(newSet.closedBulletColor);
    } else
      if (oldSet.booleanClosedBullet === true && newSet.booleanClosedBullet !== true) {
        removeProvideStyle(keyClosedBullets);
      }
    if (oldSet.booleanSelectedBlockHighlight !== true && newSet.booleanSelectedBlockHighlight === true) {
      selectedBlockHighlight();
    } else
      if (oldSet.booleanSelectedBlockHighlight === true && newSet.booleanSelectedBlockHighlight !== true) {
        removeProvideStyle(keySelectedBlockHighlight);
      }
    if (oldSet.selectedBlockHighlightColor !== newSet.selectedBlockHighlightColor) {
      try {
        removeProvideStyle(keySelectedBlockHighlight);
      } finally {
        selectedBlockHighlight();
      }
    }
    if (oldSet.closedBulletColor !== newSet.closedBulletColor) {
      try {
        removeProvideStyle(keyClosedBullets);
      } finally {
        provideClosedBullets(newSet.closedBulletColor);
      }
    }
    if (oldSet.bulletsType !== newSet.bulletsType) {
      try {
        removeProvideStyle(keyBulletsType);
        removeProvideStyle(keyClosedBullets);
      } finally {
        provideClosedBullets(newSet.closedBulletColor);
        provideBulletsType(newSet.bulletsType);
      }
    }
  });

};/* end_main */


//option: (:hover) to (:focus-whithin)
const provideHighlightBullets = (color: string) => logseq.provideStyle({
  key: keyHighlightBullets,
  style: `
  /*= highlight current path by cannnibalox v20210220 =*/
  /* https://github.com/cannibalox/logseq-dark-hpx#logseq-highlight-current-pathcss */
  div:is(#main-content-container,#right-sidebar) div.ls-block:hover span:not(.bullet-closed,.as-order-list) span.bullet {
      background-color: ${color || "#dd0707"};
      outline: 2px solid ${color || "#dd0707"};
  }
  div:is(#main-content-container,#right-sidebar) div.ls-block:not(:hover):not(:focus-within) span:not(.bullet-closed,.as-order-list) span.bullet {
      background-color: var(--ls-block-bullet-color);
      outline: unset;
  }
  `});


const provideClosedBullets = (color: string) => logseq.provideStyle({
  key: keyClosedBullets,
  style: `
  div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list).bullet-closed span.bullet {
    background-color: ${color || "#0079fa"};
    outline: 3px solid ${color || "#dd0707"};
  }
  ` });

const selectedBlockHighlight = () => logseq.provideStyle({
  key: keySelectedBlockHighlight,
  style: `
  div:is(#main-content-container,#right-sidebar) div.editor-wrapper:focus-within {
    outline: 2px double ${logseq.settings!.selectedBlockHighlightColor || "#0079fa"};
    outline-offset: 0.1em;
    border-radius: 0.3em;
    z-index: 1;
  }
  `
})

const provideBulletsType = (type: string) => {
  let style = "";
  switch (type) {
    case "default":
      //None
      break;
    case "line"://水平線
      style = `
      div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list) span.bullet {
        width: inherit;
        height: 2px;
      }
      `;
      break;
    case "vertical"://縦線
      style = `
      div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list) span.bullet {
        width: 3px;
        height: inherit;
      }
      `;
      break;
    case "square"://四角
      style = `
      div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list) span.bullet {
        border-radius: unset;
        width: 55%;
        height: 55%;
      }
      `;
      break;
    case "rotate-square"://斜め四角
      style = `
        div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list) span.bullet {
          border-radius: unset;
          width: 55%;
          height: 55%;
          transform: rotate(45deg);
        }
        `;
      break;
    case "large-circle"://大きい丸
      style = `
      div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list) span.bullet {
        width: 55%;
        height: 55%;
      }
      `;
      break;
  }

  logseq.provideStyle({ key: keyBulletsType, style });

  logseq.provideStyle(`
  div:is(#main-content-container,#right-sidebar) div.ls-block:is(:hover,:focus-within) span:not(.bullet-closed):hover span.bullet {
    outline: 1em;
  }
  `);

  logseq.App.registerUIItem('toolbar', {
    key: logseq.baseInfo.id,
    template: `<div id="toolbarBulletPoint" data-rect><a class="button icon" data-on-click="openBulletOpenSettingsUI" title="Open the plugin settings" style="font-size:20px">🔷</a></div>`,
  });
  logseq.provideModel({
    openBulletOpenSettingsUI() {
      logseq.showSettingsUI();
    },
  });

}//main();


const removeProvideStyle = (className: string) => {
  const doc = parent.document.head.querySelector(`style[data-injected-style^="${className}"]`) as HTMLStyleElement;
  if (doc) doc.remove();
};


//https://logseq.github.io/plugins/types/SettingSchemaDesc.html
const settingsTemplate: SettingSchemaDesc[] = [
  {
    key: "bulletsType",
    title: "Bullets type",
    type: "enum",
    enumChoices: ["default", "line", "vertical", "square", "rotate-square", "large-circle"],
    default: "default",
    description: "",
  },
  {
    key: "booleanBulletHighlight",
    title: "Use highlight bullets of current path",
    type: "boolean",
    default: true,
    description: "",
  },
  {
    key: "BulletHighlightColor",
    title: "Highlight color of bullets",
    type: "string",
    inputAs: "color",
    default: "#dd0707",
    description: "",
  },
  {
    key: "booleanClosedBullet",
    title: "Use coloring closed bullets",
    type: "boolean",
    default: true,
    description: "",
  },
  {
    key: "closedBulletColor",
    title: "Color of closed bullet",
    type: "string",
    inputAs: "color",
    default: "#0079fa",
    description: "",
  },
  {
    key: "booleanSelectedBlockHighlight",
    title: "Use highlight selected block",
    type: "boolean",
    default: false,
    description: "",
  },
  {
    key: "selectedBlockHighlightColor",
    title: "Highlight color of selected block",
    type: "string",
    inputAs: "color",
    default: "#0079fa",
    description: "",
  },
];

logseq.ready(main).catch(console.error);