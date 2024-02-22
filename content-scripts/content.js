chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const gridProps = request.gridProps || {};
  const cellWidth = gridProps.cellWidth || 0;
  const borderColor = gridProps.borderColor || 0;

  const docH = $(document).outerHeight();
  const docW = $(document).outerWidth();

  console.log(docH, docW);

  let verticalDivs = "";
  let horizontalDivs = "";
  for (let i = 0; i < docW / cellWidth; i++) {
    verticalDivs = verticalDivs + `<div class="verticalDiv"></div>`;
  }
  for (let j = 0; j < docH / cellWidth; j++) {
    horizontalDivs = horizontalDivs + `<div class="horizontalDiv"></div>`;
  }
  $("body").prepend(
    `<div id="wrap" style="width:${docW}px;height:${docH}px;">
      <div class="container-div-vertical" id="win-col">${verticalDivs}</div>
      <div class="container-div-horizontal" id="win-row">${horizontalDivs}</div>
    </div>`
  );
  $("head").prepend(
    `<style>
      #wrap{
        width: 100%;
        height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        overflow: hidden;
        position: absolute;
        z-index: 9999999;
      }
      .container-div-vertical {
        height: 100%;
        width: 100%;
        display: grid;
        position: absolute;
        grid-auto-flow: column;
      }
      .container-div-horizontal {
        height: 100%;
        width: 100%;
        display: grid;
        position: absolute;
        grid-auto-flow: row;
      }
      .verticalDiv {
        width: ${cellWidth}px;
        border-right: 1px solid  ${borderColor};
      }
      .horizontalDiv {
        height: ${cellWidth}px;
        border-bottom: 1px solid ${borderColor};
      }
    </style>`
  );
  $(document).ready(function () {
    $(`#${request.divId}`).click(function () {
      $(`#${request.divId}`).remove(`#${request.divId}`);
    });
  });
});
