// eslint-disable-next-line react/prop-types
function Card({ image, altDescription, name, description }) {
	return (
		<div className="max-w-sm p-4 bg-white border rounded-lg shadow-md border-gray-200 w-full mx-auto">
			{/* Image Section */}
			<div className="mb-4">
				<img
					src={image}
					alt={altDescription}
					className="rounded-md w-full h-48 object-cover"
				/>
			</div>

			{/* Card Content */}
			<div>
				<h2 className="text-lg font-semibold mb-2">By: {name}</h2>

				<p className="text-gray-600 text-sm">{description}</p>
			</div>
		</div>
	);
}

export default Card;
