// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const topics = document.querySelectorAll('.rlmtopic');
    
    // 1. Create the TOC container and heading
    const tocSection = document.createElement('section');
    tocSection.id = 'table-of-contents';
    const tocTitle = document.createElement('h2');
    tocTitle.textContent = 'Table of Contents';
    tocSection.appendChild(tocTitle);
    
    const tocList = document.createElement('ul');

    // 2. Loop through each topic to assign IDs and build the list
    topics.forEach((topic, index) => {
        // Assign dynamic ID (e.g., topic1, topic2, ...)
        const uniqueId = `topic${index + 1}`;
        topic.id = uniqueId;

        // Create a list item and link for the TOC
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${uniqueId}`;
        
        // Use the text content of the div as the link text
        link.textContent = topic.textContent || `Topic ${index + 1}`;
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    tocSection.appendChild(tocList);

    // 3. Insert the TOC before the first topic or at the top of the body
    if (topics.length > 0) {
        topics[0].before(tocSection);
    } else {
        document.body.prepend(tocSection);
    }
});
