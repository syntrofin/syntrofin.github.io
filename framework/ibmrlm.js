document.addEventListener("DOMContentLoaded", () => {
    console.log("--- Multi-Section TOC Started ---");

    // 1. Define your sections and their corresponding headings
    const sectionConfig = [
        { class: 'rlmcore', title: 'RLM Core' },
        { class: 'aidatacloud', title: 'AI and Data Cloud' },
        { class: 'metadta', title: 'Meta Data' }, // Note: matches your "metadta" spelling
        { class: 'licenses', title: 'Licenses' }
    ];

    const tocSection = document.createElement('section');
    tocSection.id = 'table-of-contents';
    tocSection.innerHTML = '<h2>Table of Contents</h2>';

    let totalTopics = 0;

    // 2. Loop through each section configuration
    sectionConfig.forEach((config) => {
        const parentSection = document.querySelector(`.${config.class}`);
        
        if (parentSection) {
            const sectionTopics = parentSection.querySelectorAll('.rlmtopic');
            
            if (sectionTopics.length > 0) {
                // Add Section Heading
                const h3 = document.createElement('h3');
                h3.textContent = config.title;
                h3.style.marginTop = "20px";
                tocSection.appendChild(h3);

                // Create UL for this section
                const ul = document.createElement('ul');

                sectionTopics.forEach((topic) => {
                    totalTopics++;
                    const uniqueId = `topic${totalTopics}`;
                    topic.id = uniqueId;

                    const li = document.createElement('li');
                    const linkText = topic.textContent.trim() || `Topic ${totalTopics}`;
                    li.innerHTML = `<a href="#${uniqueId}">${linkText}</a>`;
                    ul.appendChild(li);
                });

                tocSection.appendChild(ul);
                
                // Add a break after the UL (optional, CSS margin is usually better)
                tocSection.appendChild(document.createElement('br'));
            }
        }
    });

    if (totalTopics === 0) {
        console.warn("No topics found in any section.");
        return;
    }

    // 3. SMART INSERTION
    const placeholder = document.getElementById('dynamic-toc-container');
    if (placeholder) {
        placeholder.appendChild(tocSection);
    } else {
        // Fallback: Put it before the very first section found
        const firstSection = document.querySelector('section');
        if (firstSection) firstSection.parentNode.insertBefore(tocSection, firstSection);
    }

    // 4. Floating Home Button (re-included for completeness)
    const homeBtn = document.createElement('button');
    homeBtn.id = 'backToTop';
    homeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
    document.body.appendChild(homeBtn);
    window.addEventListener('scroll', () => {
        homeBtn.style.display = window.pageYOffset > 300 ? "flex" : "none";
    });
    homeBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

    console.log(`--- TOC Finished with ${totalTopics} topics ---`);
});
