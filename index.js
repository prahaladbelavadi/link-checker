import fetch from 'node-fetch';

async function searchWebPage(url, searchTerm) {
  try {
    // Make the HTTP request
    const response = await fetch(url);
    const content = await response.text();

    // Convert content to lowercase for case-insensitive search
    const lowerContent = content.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();

    // Search for the term
    const found = lowerContent.includes(lowerSearchTerm);
    const count = (lowerContent.match(new RegExp(lowerSearchTerm, 'g')) || []).length;

    // Print results
    console.log(`Search Results for "${searchTerm}":`);
    console.log(`URL: ${url}`);
    console.log(`Found: ${found}`);
    console.log(`Occurrences: ${count}`);

    // Show some context if found
    if (found) {
      const words = content.split(/\s+/);
      const contextSize = 5; // words before and after
      
      words.forEach((word, index) => {
        if (word.toLowerCase().includes(lowerSearchTerm)) {
          const start = Math.max(0, index - contextSize);
          const end = Math.min(words.length, index + contextSize + 1);
          const context = words.slice(start, end).join(' ');
          // console.log('\nContext:', context);
        }
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
const url = 'https://beacons.ai/cryptobaddie';
const searchTerm = 'beacon';

searchWebPage(url, searchTerm);