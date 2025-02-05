function extractUsernames() {
    return [...new Set([...document.querySelectorAll("a[href^='/@']")]
        .map(a => new URL(a.href, window.location.origin).pathname.replace("/@", "")))];
}

function generateOPML(usernames) {
    let opml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    opml += `<opml version="2.0">\n`;
    opml += `  <head>\n    <title>Medium Follows</title>\n  </head>\n`;
    opml += `  <body>\n    <outline text="Medium Follows">\n`;
    
    usernames.forEach(username => {
        let rssUrl = `https://medium.com/feed/@${username}`;
        opml += `      <outline type="rss" text="${username}" xmlUrl="${rssUrl}"/>\n`;
    });
    
    opml += `    </outline>\n  </body>\n</opml>`;
    
    return opml;
}

function downloadOPML(opmlContent, filename = "medium-follows.opml") {
    const blob = new Blob([opmlContent], { type: "text/xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Extract usernames and generate/download OPML
const usernames = extractUsernames();
const opmlContent = generateOPML(usernames);
downloadOPML(opmlContent);
