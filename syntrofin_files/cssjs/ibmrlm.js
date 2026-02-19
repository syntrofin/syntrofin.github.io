document.addEventListener("DOMContentLoaded", () => {
    // 1. Find all your topic divs (however many there are)
    const topics = document.querySelectorAll('.rlmtopic');
    if (topics.length === 0) return;

    // 2. Create the TOC Section dynamically
    const tocSection = document.createElement('section');
    tocSection.id = 'table-of-contents';
    tocSection.innerHTML = '<h2>Table of Contents</h2>';
    const tocList = document.createElement('ul');

    // 3. Loop through topics to add IDs and TOC links
    topics.forEach((topic, index) => {
        const uniqueId = `topic${index + 1}`;
        topic.id = uniqueId; // Dynamically assigns id="topic1", etc.

        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#${uniqueId}">${topic.textContent}</a>`;
        tocList.appendChild(listItem);
    });

    tocSection.appendChild(tocList);
    document.body.prepend(tocSection); // Injects TOC at the top of the page

    // 4. Create the Floating Home Button dynamically
    const homeBtn = document.createElement('button');
    homeBtn.id = 'backToTop';
    homeBtn.setAttribute('aria-label', 'Back to top');
    homeBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>`;
    document.body.appendChild(homeBtn); // Injects button at the end of body

    // 5. Logic: Show button on scroll & Scroll to top on click
    window.onscroll = () => {
        homeBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    };
    homeBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
});
