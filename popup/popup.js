function guidGenerator() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

const enableButton = document.getElementById("enableButton");
const borderColor = document.getElementById("borderColor");
const cellWidth = document.getElementById("cellWidth");

if (enableButton) {
  enableButton.onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        divId: `${guidGenerator()}`,
        gridProps: {
          cellWidth: cellWidth.value || "#ccc",
          borderColor: borderColor.value || 0,
        },
        tabId: tabs[0].id,
      });
    });
  };
}
