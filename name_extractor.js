let version = "v1";
const BASE_URL = `http://35.200.185.69:8000/${version}/autocomplete`;
const CHARACTERS = "abcdefghijklmnopq";
const DELAY = 10; 
const uniqueNames = new Set();
let requestCount = 0; 
let rateLimitHitCount = 0; 

// Timer begins 
console.time("Total Execution Time");

async function fetchNames(query) {
  try {
    const response = await fetch(`${BASE_URL}?query=${query}`);
    requestCount++; 
    if (response.ok) {
      const data = await response.json();
      data.results.forEach((item) => uniqueNames.add(item));
    //   console.log(`Request ${requestCount}: Success for query "${query}"`);
    } else if (response.status === 429) {
      rateLimitHitCount++; // Increment rate limit hit count
    //   console.log(`Request ${requestCount}: Rate limit hit for query "${query}". Retrying after delay...`);
      await new Promise((resolve) => setTimeout(resolve, DELAY * 2)); // Exponential backoff
      await fetchNames(query); 
    } else {
      console.error(`Request ${requestCount}: Error for query "${query}":`, response.statusText);
    }
  } catch (error) {
    console.error(`Request ${requestCount}: Exception for query "${query}":`, error.message);
  }
}

async function extractAllNames() {
  for (const char of CHARACTERS) {
    await fetchNames(char);
  }

  // Testing multi-character queries
  for (const char1 of CHARACTERS) {
    for (const char2 of CHARACTERS) {
      await fetchNames(`${char1}${char2}`);
    }
  }

  console.log(`Total unique names extracted: ${uniqueNames.size}`);
  console.log("Names:", Array.from(uniqueNames));
  console.log(`Total requests made: ${requestCount}`);
  console.log(`Number of Rate limit hits: ${rateLimitHitCount}`);
}

// Measuring the execution time of the code 
extractAllNames()
  .then(() => {
    console.timeEnd("Total Execution Time");
  })
  .catch((error) => {
    console.error("Script failed:", error);
  });
