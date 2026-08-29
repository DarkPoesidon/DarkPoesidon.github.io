document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    const username = 'DarkPoesidon';
    const reposContainer = document.getElementById('repos-container');

    // Fetch repositories from GitHub API
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(repos => {
            reposContainer.innerHTML = ''; // Clear loading text

            // Filter out forks if you only want original projects
            // const originalRepos = repos.filter(repo => !repo.fork);
            const displayRepos = repos;

            if (displayRepos.length === 0) {
                reposContainer.innerHTML = '<p>No repositories found.</p>';
                return;
            }

            displayRepos.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.className = 'repo-card';

                // Handle missing descriptions
                const description = repo.description || 'No description provided.';
                
                // Handle language color/display
                const language = repo.language ? `
                    <span>
                        <i class="fas fa-circle" style="color: ${getLanguageColor(repo.language)}; font-size: 10px;"></i>
                        ${repo.language}
                    </span>
                ` : '';

                repoCard.innerHTML = `
                    <div class="repo-title">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                    </div>
                    <div class="repo-desc">${description}</div>
                    <div class="repo-stats">
                        ${language}
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </div>
                `;

                reposContainer.appendChild(repoCard);
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            reposContainer.innerHTML = '<p>Failed to load repositories. Please try again later.</p>';
        });
});

// Helper function to assign colors to common languages
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'C++': '#f34b7d',
        'C#': '#178600',
        'Java': '#b07219',
        'PHP': '#4F5D95',
        'TypeScript': '#3178c6',
        'Go': '#00ADD8',
        'Rust': '#dea584'
    };
    return colors[language] || '#8b949e';
}
