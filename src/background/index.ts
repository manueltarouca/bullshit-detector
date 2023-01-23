import type { ApiResponse } from '~models/types';
import alertIcon from "data-base64:~assets/icon.png"

export { }

const toPercentage = (input: number) => input * 100;

function generateMessage(result: ApiResponse): string {
  console.log(result);
  const realProbality = toPercentage(result.real_probability);
  let message: string;
  if (realProbality > 90) {
    message = 'The selected text is most likely to be genuine';
  } else if (realProbality > 50) {
    message = 'The selected text seems genuine, but provide with more data for a compreensive analysis';
  } else if (realProbality > 10) {
    message = 'The selected text has a high chance of being computer generated';
  } else {
    message = 'The selected text is most likely of being computer generated';
  }
  return message;
}

async function genericOnClick(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
  const response = await fetch(`http://localhost:8080/?${encodeURI(info.selectionText)}`);
  const result: ApiResponse = await response.json();
  const message = generateMessage(result);
  chrome.notifications.create("toast", {
    type: "basic",
    iconUrl: alertIcon,
    title: "DETECT BULLSHIT Alert",
    message
  });
}

function main() {
  const id = chrome.contextMenus.create({
    id: 'cm-entry-1',
    title: 'Detect bullshit',
    contexts: 'selection'
  });
  chrome.contextMenus.onClicked.addListener(genericOnClick)
}

main();
