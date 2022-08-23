// If click is on an Anchor Element and is not an external link,
// prevents browser from following hyperlink --
window.addEventListener("click", (e) => {
    const anchor = e.target.tagName === "A";
    const newTab = e.target.target === "_blank";
    if (!anchor || newTab) return;

    e.preventDefault();

    const href = e.target.href;
    const path = e.target.pathname;

    fetchNext(href);
    addressBar(path);
});

// Gets HTML from Anchor Element --
const fetchNext = async (href) => {
    const r = await fetch(href);
    const newHTML = await r.text();
    replaceMain(newHTML);
}

// Replaces current Main Element HTML with newly fetched HTML --
const replaceMain = (newHTML) => {
    // Create and fill new node --
    const newRoot = document.createElement("html");
    newRoot.innerHTML = newHTML;

    // Grab and replace current Main Element with new node's inner HTML --
    const newMain = newRoot.getElementsByTagName("main")[0];
    document.getElementsByTagName("main")[0].innerHTML = newMain.innerHTML;
    mainAttributes(newMain);

    // Grab and replace page title --
    const newTitle = newRoot.getElementsByTagName("title")[0].innerHTML;
    document.title = newTitle;
}

// Updates address bar for URL sharing without navigating --
const addressBar = path => window.history.pushState({}, "", path);

// Clears and updates Main Element attributes --
const mainAttributes = (newMain) => {
    const newAttributes = Array.from(newMain.attributes);
    const main = document.getElementsByTagName("main")[0];
    const currentAttributes = Array.from(main.attributes);

    // Remove all attributes from Main Element --
    currentAttributes.forEach(currentAttribute => {
        main.removeAttribute(currentAttribute.nodeName);
    });

    // Set all new attributes for Main Element --
    newAttributes.forEach(newAttribute => {
        main.setAttribute(newAttribute.nodeName, newAttribute.nodeValue);
    });
}

// Import and render static Header Element --
const importHeader = async () => {
    const r = await fetch("/header.html");
    const headerText = await r.text();

    const headerNode = document.createElement("header");
    headerNode.innerHTML = headerText;

    const importedHeader = headerNode.firstChild;
    document.body.insertBefore(importedHeader, document.body.firstChild);
}

// Import and render static Footer Element --
const importFooter = async () => {
    const r = await fetch("/footer.html");
    const footerText = await r.text();

    const footerNode = document.createElement("footer");
    footerNode.innerHTML = footerText;

    const importedFooter = footerNode.firstChild;
    document.body.appendChild(importedFooter);
}

importHeader();
importFooter();