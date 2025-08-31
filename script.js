document.addEventListener('DOMContentLoaded', () => {
   
    const shortenForm = document.getElementById('shorten-form');
    const longUrlInput = document.getElementById('long-url-input');
    const customAliasInput = document.getElementById('custom-alias-input');
    const expiryDateInput = document.getElementById('expiry-date-input');
    const passwordInput = document.getElementById('password-input');
    const resultSection = document.getElementById('result-section');
    const shortUrlLink = document.getElementById('short-url-link');
    const copyButton = document.getElementById('copy-button');
    const linksList = document.getElementById('links-list');
    const chartCanvas = document.getElementById('click-chart');
    const qrCodeButton = document.getElementById('qr-code-button');
    const qrModal = document.getElementById('qr-modal');
    const qrModalClose = document.getElementById('qr-modal-close');
    const qrCodeContainer = document.getElementById('qrcode-container');
    const modalShortUrl = document.getElementById('modal-short-url');
    const passwordModal = document.getElementById('password-modal');
    const passwordPromptForm = document.getElementById('password-prompt-form');
    const passwordPromptInput = document.getElementById('password-prompt-input');
    const passwordErrorMsg = document.getElementById('password-error-msg');
    const statusPage = document.getElementById('status-page');
    const mainContainer = document.querySelector('.container');
    const notification = document.getElementById('notification');
    const statsModal = document.getElementById('stats-modal');
    const statsModalClose = document.getElementById('stats-modal-close');
    const statsList = document.getElementById('stats-list');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    let clickChart;
    let linkToUnlock = null;
    let notificationTimeout;

    
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeIcon.innerHTML = isDarkMode ? 
            `<path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />` :
            `<path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />`;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };

    themeToggle.addEventListener('click', toggleTheme);

    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.innerHTML = `<path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />`;
    }

    
    const getLinksFromStorage = () => JSON.parse(localStorage.getItem('shortenedLinks') || '[]');
    const saveLinksToStorage = (links) => localStorage.setItem('shortenedLinks', JSON.stringify(links));
    const showNotification = (message) => {
        notification.textContent = message;
        notification.classList.add('show');
        clearTimeout(notificationTimeout);
        notificationTimeout = setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    };
    
    const initApp = () => {
        mainContainer.classList.remove('hidden');
        const initChart = (labels, data) => {
            const ctx = chartCanvas.getContext('2d');
            if (clickChart) clickChart.destroy();
            clickChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Clicks',
                        data: data,
                        backgroundColor: 'rgba(90, 103, 216, 0.6)',
                        borderColor: '#5a67d8',
                        borderWidth: 1,
                        borderRadius: 5,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true } },
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Top 7 Most Clicked Links' }
                    }
                }
            });
        };
        const renderLinks = (links) => {
            linksList.innerHTML = '';
            if (links.length === 0) {
                linksList.innerHTML = '<p class="empty-state">You haven\'t created any links yet. Create one above!</p>';
                return;
            }
            links.forEach(link => {
                const linkElement = document.createElement('div');
                linkElement.classList.add('link-item');
                const expiryText = link.expiryDate ? new Date(link.expiryDate).toLocaleDateString() : 'Never';
                const displayUrl = link.shortUrl.replace(/^https?:\/\//, '');
                const passwordIcon = link.password ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style="width: 1rem; height: 1rem; margin-right: 0.5rem; display: inline-block; vertical-align: middle; color: var(--text-muted);"><path fill-rule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V6a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2V4.5A3.5 3.5 0 0 0 8 1Zm2 3.5V6H6V4.5a2 2 0 1 1 4 0Z" clip-rule="evenodd" /></svg>` : '';
                
                linkElement.innerHTML = `
                    <button class="stats-button" data-link-id="${link.id}" title="Show stats">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.035-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c-1.035 0-1.875.84-1.875 1.875v9.375c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V10.5c0-1.035-.84-1.875-1.875-1.875h-.75ZM3 13.5c-1.035 0-1.875.84-1.875 1.875v4.5c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875v-4.5c0-1.035-.84-1.875-1.875-1.875H3Z"/></svg>
                    </button>
                    <button class="delete-button" data-link-id="${link.id}" title="Delete link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" /></svg>
                    </button>
                    <div class="link-item-top">
                        <span class="link-item-short">${passwordIcon}<a href="${link.shortUrl}" target="_blank">${displayUrl}</a></span>
                        <span class="link-item-clicks">${link.clickCount} Clicks</span>
                    </div>
                    <div class="link-item-original">${link.originalUrl}</div>
                    <div class="link-item-meta">
                        <span>Created: ${new Date(link.createdAt).toLocaleDateString()}</span>
                        <span>Expires: ${expiryText}</span>
                    </div>`;
                linksList.appendChild(linkElement);
            });
        };
        
        const loadAndRenderAll = () => {
            const links = getLinksFromStorage();
            renderLinks(links);
            const sortedByClicks = [...links].sort((a, b) => b.clickCount - a.clickCount).slice(0, 7);
            initChart(sortedByClicks.map(l => l.shortCode), sortedByClicks.map(l => l.clickCount));
        };
        shortenForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const allLinks = getLinksFromStorage();
            const customAlias = customAliasInput.value.trim().replace(/\s+/g, '-');
            if (customAlias && allLinks.some(link => link.shortCode === customAlias)) {
                alert('This custom alias is already taken. Please choose another.');
                return;
            }
            const newLink = { 
                id: Date.now(),
                originalUrl: longUrlInput.value,
                shortCode: customAlias || Math.random().toString(36).substring(2, 8),
                createdAt: new Date().toISOString(),
                expiryDate: expiryDateInput.value ? new Date(expiryDateInput.value).toISOString() : null,
                clickCount: 0,
                password: passwordInput.value.trim() || null 
            };
            newLink.shortUrl = `${window.location.origin}${window.location.pathname}#${newLink.shortCode}`;
            allLinks.unshift(newLink);
            saveLinksToStorage(allLinks);
            shortUrlLink.href = newLink.shortUrl;
            shortUrlLink.textContent = newLink.shortUrl.replace(/^https?:\/\//, '');
            resultSection.classList.remove('hidden');
            qrCodeButton.classList.remove('hidden');
            shortenForm.reset();
            loadAndRenderAll();
        });
        linksList.addEventListener('click', (e) => {
            const deleteButton = e.target.closest('.delete-button');
            const statsButton = e.target.closest('.stats-button');
            if (deleteButton) {
                const linkId = Number(deleteButton.dataset.linkId);
                const updatedLinks = getLinksFromStorage().filter(link => link.id !== linkId);
                saveLinksToStorage(updatedLinks);
                loadAndRenderAll();
                showNotification("Link deleted successfully.");
            } else if (statsButton) {
                const linkId = Number(statsButton.dataset.linkId);
                const link = getLinksFromStorage().find(l => l.id === linkId);
                if (link) {
                    showStatsModal(link);
                }
            }
        });
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(shortUrlLink.href).then(() => {
                const originalHTML = copyButton.innerHTML;
                copyButton.innerHTML = 'Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = originalHTML;
                }, 2000);
            });
        });
        qrCodeButton.addEventListener('click', () => {
            qrCodeContainer.innerHTML = '';
            new QRCode(qrCodeContainer, {
                text: shortUrlLink.href,
                width: 200, height: 200,
                colorDark: "#5a67d8", colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            modalShortUrl.textContent = shortUrlLink.textContent;
            qrModal.classList.remove('hidden');
            document.body.classList.add('modal-open');
        });
        const closeModal = (modal) => {
            modal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        };
        
        qrModalClose.addEventListener('click', () => closeModal(qrModal));
        qrModal.addEventListener('click', (e) => { if (e.target === qrModal) closeModal(qrModal); });
        loadAndRenderAll();
    };
    const showStatsModal = (link) => {
        const creationDate = new Date(link.createdAt);
        const now = new Date();
        const daysActive = Math.max(0, (now - creationDate) / (1000 * 60 * 60 * 24));
        const avgClicks = daysActive > 0 ? (link.clickCount / daysActive).toFixed(2) : link.clickCount;
        statsList.innerHTML = `
            <li><span>Short URL</span><span>${link.shortUrl.replace(/^https?:\/\//, '')}</span></li>
            <li><span>Original URL</span><span>${link.originalUrl}</span></li>
            <li><span>Total Clicks</span><span class="positive">${link.clickCount}</span></li>
            <li><span>Password Protected</span><span>${link.password ? '<span class="negative">Yes</span>' : 'No'}</span></li>
            <li><span>Created Date</span><span>${creationDate.toLocaleString()}</span></li>
            <li><span>Expiry Date</span><span>${link.expiryDate ? new Date(link.expiryDate).toLocaleString() : 'Never'}</span></li>
            <li><span>Days Active</span><span>${daysActive.toFixed(1)}</span></li>
            <li><span>Avg. Clicks/Day</span><span class="positive">${avgClicks}</span></li>
        `;
        statsModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    };
    const closeStatsModal = () => {
        statsModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    };
    statsModalClose.addEventListener('click', closeStatsModal);
    statsModal.addEventListener('click', (e) => { if (e.target === statsModal) closeStatsModal(); });
    const handleRedirect = () => {
        const hash = window.location.hash.substring(1);
        const allLinks = getLinksFromStorage();
        const link = allLinks.find(l => l.shortCode === hash);
        
        mainContainer.classList.add('hidden');
        const showStatusPage = (title, message) => {
            statusPage.innerHTML = `<div><h1>${title}</h1><p>${message}</p></div>`;
            statusPage.classList.remove('hidden');
        };
        if (link) {
            const now = new Date().getTime();
            if (link.expiryDate && new Date(link.expiryDate).getTime() < now) {
                showStatusPage('Link Expired', 'This short link has expired and is no longer valid.');
                return;
            }
            if (link.password) {
                linkToUnlock = link;
                passwordModal.classList.remove('hidden');
                document.body.classList.add('modal-open');
            } else {
                link.clickCount++;
                saveLinksToStorage(allLinks);
                window.location.replace(link.originalUrl);
            }
        } else {
            showStatusPage('404 - Not Found', 'This short link does not exist.');
        }
    };
    passwordPromptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (linkToUnlock && passwordPromptInput.value === linkToUnlock.password) {
            passwordModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
            const allLinks = getLinksFromStorage();
            const linkInStorage = allLinks.find(l => l.id === linkToUnlock.id);
            if (linkInStorage) {
                linkInStorage.clickCount++;
                saveLinksToStorage(allLinks);
            }
            window.location.replace(linkToUnlock.originalUrl);
        } else {
            passwordErrorMsg.classList.remove('hidden');
            passwordPromptInput.value = '';
            passwordPromptInput.focus();
        }
    });
   
    if (window.location.hash.substring(1)) {
        handleRedirect();
    } else {
        initApp();
    }
});