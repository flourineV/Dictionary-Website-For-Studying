export const fetchSuggestions = async (prefix) => {
  if (!prefix.trim()) return [];

  try {
    const response = await fetch(`http://localhost:3005/search/${prefix}`);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    return data.slice(0, 4); // Giới hạn 4 từ gợi ý
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};
