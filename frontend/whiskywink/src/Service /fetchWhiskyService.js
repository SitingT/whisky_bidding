export const fetchActiveWhisky = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/whisky/active/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch active whisky list:", error);
    return [];
  }
};
