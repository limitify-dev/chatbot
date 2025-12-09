import axios from "axios";

// Configure your API endpoint here
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://ai-itetero.onrender.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Send a message to the chatbot API and get a response
 * @param {string} message - The user message to send
 * @returns {Promise<string>} The chatbot's response
 */
export const sendMessage = async (message) => {
  try {
    const response = await apiClient.get("/chat", {
      params: {
        query: message.trim(),
      },
    });

    // Adjust the response path based on your API structure
    return response.data.response || response.data.message || response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error(
      error.response?.data?.message || "Failed to get response from chatbot"
    );
  }
};

/**
 * Optional: Get chat history
 * @returns {Promise<Array>} Array of message objects
 */
export const getChatHistory = async () => {
  try {
    const response = await apiClient.get("/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw new Error("Failed to fetch chat history");
  }
};

/**
 * Optional: Clear chat history
 * @returns {Promise<void>}
 */
export const clearHistory = async () => {
  try {
    await apiClient.post("/history/clear");
  } catch (error) {
    console.error("Error clearing history:", error);
    throw new Error("Failed to clear chat history");
  }
};

export default apiClient;
