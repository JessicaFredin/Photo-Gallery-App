/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchQuery, handleInputChange, handleSearch }) {
	return (
		<form onClick={handleSearch}>
			<div className="relative px-4 mt-10">
				<input
					type="text"
					value={searchQuery}
					onChange={handleInputChange}
					placeholder="Search..."
					className="block w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white shadow-lg border border-gray-200 rounded-full p-2 pr-10 mx-auto focus:outline-none px-4"
				/>
				<button
					type="submit"
					className="absolute right-[14%] sm:right-[18%] md:right-[26%] lg:right-[35%] top-1/2 -translate-y-1/2 text-black"
				>
					<FontAwesomeIcon
						icon={faSearch}
						className="text-gray-500"
					/>
				</button>
			</div>
		</form>
	);
}

export default SearchBar;
