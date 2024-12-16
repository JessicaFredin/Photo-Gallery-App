import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import SearchBar from "./SearchBar";

function Grid() {
	const [apiData, setApiData] = useState([]); // Holds the fetched data
	const [isFetched, setIsFetched] = useState(false); // Indicates if data has been fetched
	const [searchQuery, setSearchQuery] = useState(""); // User-entered search term
	const [currentPage, setCurrentPage] = useState(1); // Controls fetching new results once it changes
	const [totalPages, setTotalPages] = useState(1);
	const [inputPage, setInputPage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	// Function to fetch data
	const fetchData = async (query, page = 1) => {
		try {
			const cacheKey = `${query}_${page}`;

			// Check if data exists in sessionStorage
			const cachedData = sessionStorage.getItem(cacheKey);
			let data;
			// Get cached results and totalPages
			if (cachedData) {
				data = JSON.parse(cachedData);
			}
			// Fetch results and totalPages and cache them
			else {
				const response = await axios.get(
					`https://api.unsplash.com/search/photos/?client_id=${
						import.meta.env.VITE_API_CLIENT_ID
					}&page=${page}&per_page=12&query=${query}`
				);
				data = response.data;

				sessionStorage.setItem(cacheKey, JSON.stringify(data)); // Cache the results as a string in sessionStorage
			}

			setApiData(data.results); // Store fetched results

			// The unsplash API doesn't allow fetching with a page number higher than 200 for some reason
			const totalPages = Math.min(200, data.total_pages);

			setIsFetched(true);
			setTotalPages(totalPages);
			setErrorMessage("");
		} catch (error) {
			console.error(error);
			setErrorMessage("Something went wrong, cannot fetch the data");
		}
	};

	// Fetch default data on component mount
	useEffect(() => {
		fetchData(searchQuery || "santa", currentPage); // Default to "santa" if there is no user query
	}, [currentPage]);

	// Handle search button click
	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim() == "") {
			return;
		}
		if (currentPage == 1) {
			fetchData(searchQuery); // If currentPage is already 1, just setting it to 1 again will not trigger a new fetch
		} else {
			setCurrentPage(1); // Setting current page to 1 will trigger a new request with the new search query
		}
	};

	// Go to next page
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			const nextPage = currentPage + 1;
			setCurrentPage(nextPage); // Changing this triggers a new fetch
		}
	};

	// Go to previous page
	const handlePrevPage = () => {
		if (currentPage > 1) {
			const prevPage = currentPage - 1;
			setCurrentPage(prevPage); // Changing this triggers a new fetch
		}
	};

	// Go to a specific page if it is a valid one
	const handleJumpToPage = (e) => {
		e.preventDefault();
		const page = parseInt(inputPage);
		if (isNaN(page) || page < 1 || page > totalPages) {
			setErrorMessage(
				`Please enter a valid page number between 1 and ${totalPages}.`
			);
		} else {
			setCurrentPage(page);
			setErrorMessage("");
		}
	};

	return (
		<div>
			{/* Search Bar Component */}
			<SearchBar
				handleSearch={handleSearch}
				handleInputChange={(e) => setSearchQuery(e.target.value)} // Update query on typing
				searchQuery={searchQuery}
			/>

			{/* Show empty results */}
			{isFetched && apiData.length === 0 && (
				<div className="text-center mt-4">
					No results found. Try another search.
				</div>
			)}

			{/* Grid to Display Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
				{isFetched &&
					apiData.map((data) => (
						<Card
							key={data.id}
							image={data.urls.thumb}
							altDescription={data.alt_description}
							name={data.user.name}
							description={data.description}
						/>
					))}
			</div>

			{/* Show error message */}
			{errorMessage && (
				<div className="text-center text-red-500 mt-4">
					{errorMessage}
				</div>
			)}

			{/* Pagination */}
			<div className="flex items-center justify-center space-x-4 mt-6">
				{/* Previous button*/}
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 1}
					className="px-4 py-2 bg-gray-300 rounded-full disabled:opacity-50 "
				>
					Previous
				</button>

				{/* Input for the page number */}
				<form
					onSubmit={handleJumpToPage}
					className="flex items-center space-x-2"
				>
					<input
						type="text"
						value={inputPage}
						onChange={(e) => setInputPage(e.target.value)}
						placeholder="1"
						className="border px-2 py-1 w-20 text-center rounded-full"
					/>
				</form>

				{/* Next button */}
				<button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					className="px-4 py-2 bg-gray-300 rounded-full disabled:opacity-50"
				>
					Next
				</button>
			</div>

			{/* Show current page */}
			<div className="text-center mt-4">
				Page {currentPage} of {totalPages}
			</div>
		</div>
	);
}

export default Grid;
