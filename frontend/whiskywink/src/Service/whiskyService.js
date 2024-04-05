// services/whiskyService.js

const createWhisky = async (whiskyData) => {
  const apiUrl = "http://localhost:8000/whisky/create/";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include other headers as necessary, such as Authorization if using token authentication
      },
      body: JSON.stringify(whiskyData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Returning the data on success
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throwing the error to be handled where the function is called
  }
};

export { createWhisky };
