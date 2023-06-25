import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { LSPluginBaseInfo, SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";
const keyHighlightBullets = "highlightBullets";
const keyClosedBullets = "closedBullet";
const keyBulletsType = "bulletsType";
const keySelectedBlockHighlight = "selectedBlockHighlight";

const main = () => {
  logseq.useSettingsSchema(settingsTemplate);
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);

 provideBulletsType(logseq.settings!.bulletsType || "default");
  if (logseq.settings!.booleanBulletHighlight === true) provideHighlightBullets(logseq.settings!.BulletHighlightColor);
  if (logseq.settings!.booleanClosedBullet === true) provideClosedBullets(logseq.settings!.closedBulletColor);
  if (logseq.settings!.booleanSelectedBlockHighlight === true) selectedBlockHighlight();


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
  div:is(#main-content-container,#right-sidebar) div.ls-block:hover span:not(.bullet-closed) span.bullet {
      background-color: ${color || "#dd0707"};
      outline: 2px solid ${color || "#dd0707"};
  }
  div:is(#main-content-container,#right-sidebar) div.ls-block:not(:hover):not(:focus-within) span:not(.bullet-closed) span.bullet {
      background-color: var(--ls-block-bullet-color);
      outline: unset;
  }
  `});


const provideClosedBullets = (color: string) => logseq.provideStyle({
  key: keyClosedBullets,
  style: `
  div#app-container span.bullet-container.bullet-closed span.bullet {
    background-color: ${color || "#0079fa"};
  }
  div#app-container span.bullet-container:not(.typed-list).bullet-closed {
    background-color: unset;
  }
  ` });

const selectedBlockHighlight = () => logseq.provideStyle({
  key: keySelectedBlockHighlight,
  style: `
  div#app-container div.editor-wrapper:focus-within {
    outline: 3px double ${logseq.settings!.selectedBlockHighlightColor || "#0079fa"};
    outline-offset: 1px;
    border-radius: 4px;
  }
  `
})

const provideBulletsType = (type: string) => {
  let style = "";
  if (type === "default") {
    style = `
      div#app-container span.bullet-container.bullet-closed span.bullet{
        width:10px;
        height:10px;
    }
    `;
  } else //水平線
    if (type === "line") {
      style = `
      div#app-container span.bullet-container span.bullet{
        width: inherit;
        height: 2px;
        margin: 3px;
      }     
      div#app-container span.bullet-container.bullet-closed span.bullet{
        height: inherit;
        border-radius: unset;
    }
      `;
    } else //縦線
      if (type === "vertical") {
        style = `
      div#app-container span.bullet-container span.bullet{
        width: 3px;
        height: inherit;
        margin: 2px;
      }
      div#app-container span.bullet-container.bullet-closed span.bullet{
        width: inherit;
        border-radius: unset;
      }
      `;
      } else //四角
        if (type === "square") {
          style = `
      div#app-container span.bullet-container span.bullet{
        border-radius: unset;
        width: 55%;
        height: 55%;
      }
      div#app-container span.bullet-container.bullet-closed span.bullet{
        border-radius: unset;
      }
      `;
        } else //四角回転
          if (type === "rotate-square") {
            style = `
        div#app-container span.bullet-container span.bullet{
          border-radius: unset;
          width: 55%;
          height: 55%;
          transform: rotate(45deg);
        }
        div#app-container span.bullet-container.bullet-closed span.bullet{
          border-radius: unset;
          transform: rotate(45deg);
          width:12px;
          height:12px;
        }
        `;
          } else //丸
            if (type === "large-circle") {
              style = `
      div#app-container span.bullet-container span.bullet{
        width: 55%;
        height: 55%;
      }
      div#app-container span.bullet-container.bullet-closed span.bullet{
        width:12px;
        height:12px;
      }
      `;
            }

  logseq.provideStyle({ key: keyBulletsType, style });

  logseq.App.registerUIItem('toolbar', {
    key: logseq.baseInfo.id,
    template: `<div id="openPARAbutton" data-rect><a class="button icon" data-on-click="openBulletOpenSettingsUI" title="Open the plugin settings" style="font-size:20px">🔷</a></div>`,
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