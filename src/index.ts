import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
import ja from "./translations/ja.json";
import { settingsTemplate } from './settings';
import { onSettingsChanged } from './onSettingsChanged';
import { provideHighlightBullets, provideClosedBullets, selectedBlockHighlight, provideBulletsType } from './provideCSS';
export const keyHighlightBullets = "highlightBullets";
export const keyClosedBullets = "closedBullet";
export const keyBulletsType = "bulletsType";
export const keySelectedBlockHighlight = "selectedBlockHighlight";

const main = () => {
  (async () => {
    try {
      await l10nSetup({ builtinTranslations: { ja } });
    } finally {
      /* user settings */
      logseq.useSettingsSchema(settingsTemplate());
      if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);
    }
  })();

  if (logseq.settings!.booleanBulletHighlight === true) provideHighlightBullets(logseq.settings!.BulletHighlightColor);
  if (logseq.settings!.booleanClosedBullet === true) provideClosedBullets(logseq.settings!.closedBulletColor);
  if (logseq.settings!.booleanSelectedBlockHighlight === true) selectedBlockHighlight();
  provideBulletsType(logseq.settings!.bulletsType || "default");
  onSettingsChanged();

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
};/* end_main */


logseq.ready(main).catch(console.error);