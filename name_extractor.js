let version="v1";
const BASE_URL = `http://35.200.185.69:8000/${version}/autocomplete`;
const CHARACTERS = "adbs";
const DELAY = 0; 
const uniqueNames = new Set();


async function fetchNames(query) {
  try {
    const response = await fetch(`${BASE_URL}?query=${query}`);
    if (response.ok) {
      const data = await response.json();
      data.results.forEach((item) => uniqueNames.add(item)); 
    } else if (response.status === 429) {
      console.log(`Rate limit hit for query: ${query}. Retrying after delay...`);
      await new Promise((resolve) => setTimeout(resolve, DELAY * 2)); // Exponential backoff
      await fetchNames(query); // Retrying the request
    } else {
      console.error(`Error for query ${query}:`, response.statusText);
    }
  } catch (error) {
    console.error(`Exception for query ${query}:`, error.message);
  }
}


async function extractAllNames() {
  for (const char of CHARACTERS) {
    await fetchNames(char);
    // await new Promise((resolve) => setTimeout(resolve, DELAY)); // For Delay Creation
  }

  // Testing multi-character queries
  for (const char1 of CHARACTERS) {
    for (const char2 of CHARACTERS) {
      await fetchNames(`${char1}${char2}`);
    //   await new Promise((resolve) => setTimeout(resolve, DELAY)); // Delay Creation Code
    }
  }

  console.log(`Total unique names extracted: ${uniqueNames.size}`);
  console.log("Names:", Array.from(uniqueNames));
}

extractAllNames();