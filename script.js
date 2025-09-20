/**
 * script.js
 * ---------
 * Loads the 15 most recently updated public repositories for the GitHub user
 * `cornusandu` and creates a card for each one inside the
 * `<section id="recent-projects">` element.
 */

document.addEventListener('DOMContentLoaded', () => {
    const repoContainer = document.getElementById('recent-projects');

    // GitHub API: list user repos, sorted by last updated time
    fetch('https://api.github.com/users/cornusandu/repos?sort=updated&per_page=9')
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                // Create card element
                const card = document.createElement('div');
                card.className = 'card';

                // Repository name
                const title = document.createElement('h3');
                title.textContent = repo.name;
                title.style.color = 'var(--accent)';
                title.style.marginBottom = '0.5rem';
                card.appendChild(title);

                // Repository description
                const desc = document.createElement('p');
                desc.textContent = repo.description || 'No description';
                desc.style.fontSize = '1rem';
                desc.style.marginBottom = '0.5rem';
                card.appendChild(desc);

                // License information
                const license = document.createElement('p');
                license.textContent = repo.license ? repo.license.spdx_id : 'No license';
                license.style.fontSize = '0.9rem';
                license.style.color = '#a0a0a0';
                card.appendChild(license);

                // Button to open the repository
                const btn = document.createElement('a');
                btn.href = repo.html_url;
                btn.target = '_blank';
                btn.rel = 'noopener';
                btn.textContent = 'Open Repo';
                btn.style.display = 'inline-block';
                btn.style.padding = '0.5rem 1rem';
                btn.style.marginTop = '0.75rem';
                btn.style.backgroundColor = 'var(--accent)';
                btn.style.color = '#fff';
                btn.style.borderRadius = '4px';
                btn.style.textDecoration = 'none';
                btn.style.fontWeight = '600';
                btn.style.fontSize = '0.9rem';
                card.appendChild(btn);

                // Append the card to the container
                repoContainer.appendChild(card);
            });
        })
        .catch(err => {
            console.error('Failed to fetch GitHub repos:', err);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = 'Unable to load recent projects at this time.';
            errorMsg.style.color = '#ff6f61';
            repoContainer.appendChild(errorMsg);
        });
});