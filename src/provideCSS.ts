import { keyHighlightBullets, keyClosedBullets, keySelectedBlockHighlight, keyBulletsType } from '.';

//option: (:hover) to (:focus-whithin)
export const provideHighlightBullets = (color: string) => logseq.provideStyle({
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
  `
});


export const provideClosedBullets = (color: string) => logseq.provideStyle({
    key: keyClosedBullets,
    style: `
  div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list).bullet-closed span.bullet {
    background-color: ${color || "#0079fa"};
    outline: 3px solid ${color || "#dd0707"};
  }
  `
});

export const selectedBlockHighlight = () => logseq.provideStyle({
    key: keySelectedBlockHighlight,
    style: `
  div:is(#main-content-container,#right-sidebar) div.editor-wrapper:focus-within {
    outline: 2px double ${logseq.settings!.selectedBlockHighlightColor || "#0079fa"};
    outline-offset: 0.1em;
    border-radius: 0.3em;
    z-index: 1;
  }
  `
});

export const provideBulletsType = (type: string) => {
    let style = "";
    switch (type) {
        case "default":
            //None
            break;
        case "line": //水平線
            style = `
      div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list) span.bullet {
        width: inherit;
        height: 2px;
      }
      `;
            break;
        case "vertical": //縦線
            style = `
      div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list) span.bullet {
        width: 3px;
        height: inherit;
      }
      `;
            break;
        case "square": //四角
            style = `
      div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list) span.bullet {
        border-radius: unset;
        width: 55%;
        height: 55%;
      }
      `;
            break;
        case "rotate-square": //斜め四角
            style = `
        div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list) span.bullet {
          border-radius: unset;
          width: 55%;
          height: 55%;
          transform: rotate(45deg);
        }
        `;
            break;
        case "large-circle": //大きい丸
            style = `
      div:is(#main-content-container,#right-sidebar) span.bullet-container:not(.as-order-list) span.bullet {
        width: 55%;
        height: 55%;
      }
      `;
            break;
    }

    logseq.provideStyle({ key: keyBulletsType, style });

}; //end provideBulletsType

