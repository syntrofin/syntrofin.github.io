document.addEventListener("DOMContentLoaded", () => {
    console.log("--- TOC Script Started ---");

    // 1. Find all your topic divs
    const topics = document.querySelectorAll('.rlmtopic');
    console.log("Topics found:", topics.length);

    if (topics.length === 0) {
        console.warn("No elements with class 'rlmtopic' found. Script stopping.");
        return;
    }

    // 2. Create the TOC Section
    const tocSection = document.createElement('section');
    tocSection.id = 'table-of-contents';
    tocSection.innerHTML = '<h2>Table of Contents</h2>';
    const tocList = document.createElement('ul');

    // 3. Loop through topics to add IDs and TOC links
    topics.forEach((topic, index) => {
        const uniqueId = `topic${index + 1}`;
        topic.id = uniqueId; 

        const listItem = document.createElement('li');
        const linkText = topic.textContent.trim() || `Topic ${index + 1}`;
        listItem.innerHTML = `<a href="#${uniqueId}">${linkText}</a>`;
        tocList.appendChild(listItem);
    });

    tocSection.appendChild(tocList);

    // 4. SMART INSERTION: Where should the TOC go?
    const placeholder = document.getElementById('dynamic-toc-container');
    if (placeholder) {
        placeholder.appendChild(tocSection);
        console.log("TOC inserted into custom placeholder.");
    } else {
        // Fallback: Insert right before the first topic
        topics[0].parentNode.insertBefore(tocSection, topics[0]);
        console.log("TOC inserted before the first topic.");
    }

    // 5. Create the Floating Home Button
    const homeBtn = document.createElement('button');
    homeBtn.id = 'backToTop';
    homeBtn.title = "Back to Top";
    // Using a simple Home Icon SVG
    homeBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>`;
    document.body.appendChild(homeBtn);

    // 6. Scroll Logic: Show/Hide and Smooth Scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            homeBtn.style.display = "flex";
        } else {
            homeBtn.style.display = "none";
        }
    });

    homeBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    console.log("--- TOC Script Finished Successfully ---");
});
