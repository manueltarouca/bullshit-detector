import type { ApiResponse } from '~src/models/types';

export { }
// A generic onclick callback function.
async function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  const response = await fetch(`http://localhost:8080/?${encodeURI(info.selectionText)}`);
  const result: ApiResponse = await response.json()

  console.log(result)
}

// Create one test item for each context type.
const contexts = ['selection']
//["page", "selection", "link", "editable", "image", "video", "audio"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = 'DETECT BULLSHIT'
  var id = chrome.contextMenus.create({
    id: title,
    title: title,
    contexts: [context as any]
  });
  chrome.contextMenus.onClicked.addListener(genericOnClick)
  console.log("'" + context + "' item:" + id);
}
