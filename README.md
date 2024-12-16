# Unsplash Gallery Application

## Overview

This project is a React-based web application that allows users to search and view images from the Unsplash API in a clean and responsive image gallery. The app includes the following features:

- **Search Query Functionality:** Users can input search terms to dynamically fetch and display related images.
- **Pagination:** Users can navigate through multiple pages of results with "Next," "Previous," and "Jump to Page" options.
- **Caching:** API responses are cached using `sessionStorage` to optimize performance and reduce redundant API requests.
- **Error Handling:** The app gracefully handles errors (e.g., API errors, invalid pages) and provides feedback to the user.

---

## Features

### 1. **Search Query**
Users can type a search term into the search bar to retrieve images based on the input query. If no query is provided, the app defaults to fetching images of "santa."

### 2. **Pagination**
The application supports paginated results:
- Navigate to the next or previous page using "Next" and "Previous" buttons.
- Jump to a specific page using a text input field and press enter.
- Ensures the user cannot navigate beyond valid page ranges.

### 3. **Caching with `sessionStorage`**
To reduce redundant API calls, the app caches API responses:
- Each search query and page combination is stored as a unique key in `sessionStorage`.
- Before making an API call, the app checks for cached data. If found, the cached data is used instead of fetching from the API.


### 4. **Error Handling**
The app handles common issues gracefully:
- Displays a message if no results are found or if the API fails to fetch data.
- Provides feedback for invalid page numbers (e.g., "Please enter a valid page number between 1 and 200").

---

## Project Structure

- **`Grid.jsx`**: Manages fetching and displaying the image grid, pagination, and state handling.
- **`SearchBar.jsx`**: A reusable component for the search bar with input and a search button.
- **`Card.jsx`**: Displays individual image details in a card layout.

---

## Installation and Running the Application

### Step 1: Clone the Repository
```bash
git clone <repository-url>
```
```bash
cd <Photo-Gallery-App>
```

### Step 2: Install Dependencies
Run the following command to install all necessary packages:
```bash
npm install
```

### Step 3: Set Up API Key
Create a `.env` file in the project root and add your Unsplash API key:
```env
VITE_API_CLIENT_ID=your_unsplash_api_client_id
```
Replace `your_unsplash_api_client_id` with your actual Unsplash API key.

You can get an Unsplash API key by signing up and creating a new application on the [Unsplash API Documentation](https://unsplash.com/documentation) page.

### Step 4: Run the Application
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or a similar port).

---

## How It Works

### Fetching Data
- Data is fetched from the Unsplash API based on the search query and page number.
- Each result contains image thumbnails, descriptions, and photographer names.

### Caching Logic
- Before making an API request, the app checks if the combination of search query and page number exists in `sessionStorage`.
- If cached data is found, it is used directly without making a new API call.
- If not, a new API call is made, and the result is stored in `sessionStorage`.

### Error Handling
- Invalid search queries, network errors, and API limits are caught and displayed as error messages to the user.

---


## Technologies Used
- **React**: Frontend framework for building the user interface.
- **Axios**: For making HTTP requests to the Unsplash API.
- **Tailwind CSS**: For styling the application.
- **Unsplash API**: For fetching images dynamically.

---

## Time Constraints and Future Improvements

Due to time constraints, I focused on implementing the core functionality of the project, including search queries, pagination, caching with `sessionStorage`, and error handling. The project fulfills the main requirements, but given more time, I would have added the following enhancements:

1. **Infinite Scrolling for Pagination**  
   Instead of the current pagination setup, I would implement infinite scrolling for a smoother and more elegant user experience. This would replace the need for manual navigation, making the app more user-friendly.

2. **UI Enhancements**  
   I would improve the overall design to make the user interface more visually appealing, with better styling and layout adjustments for various screen sizes.

3. **Additional Information on Cards**  
   I would display more details on each card, such as:
   - Number of likes the image has received.  
   - A link to the photographer's profile for better user engagement.  

These changes would enhance both the functionality and the visual appeal of the application.

---
