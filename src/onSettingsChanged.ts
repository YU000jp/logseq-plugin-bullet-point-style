import { LSPluginBaseInfo } from "@logseq/libs/dist/LSPlugin.user";
import { removeProvideStyle } from './lib';
import { keyHighlightBullets, keyClosedBullets, keySelectedBlockHighlight, keyBulletsType } from '.';
import { provideHighlightBullets, provideClosedBullets, selectedBlockHighlight, provideBulletsType } from './provideCSS';

export const onSettingsChanged = () => logseq.onSettingsChanged((newSet: LSPluginBaseInfo['settings'], oldSet: LSPluginBaseInfo['settings']) => {
    if (oldSet.booleanBulletHighlight !== true && newSet.booleanBulletHighlight === true) {
        provideHighlightBullets(newSet.BulletHighlightColor);
    }
    else if (oldSet.booleanBulletHighlight === true && newSet.booleanBulletHighlight !== true) {
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
    }
    else if (oldSet.booleanClosedBullet === true && newSet.booleanClosedBullet !== true) {
        removeProvideStyle(keyClosedBullets);
    }
    if (oldSet.booleanSelectedBlockHighlight !== true && newSet.booleanSelectedBlockHighlight === true) {
        selectedBlockHighlight();
    }
    else if (oldSet.booleanSelectedBlockHighlight === true && newSet.booleanSelectedBlockHighlight !== true) {
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
