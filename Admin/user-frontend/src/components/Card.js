export default function Card({ item, onClick }) {
  // Detect if image is a base64 string (not a URL)
  let imgSrc = item.image;
  if (imgSrc && /^[A-Za-z0-9+/=]+$/.test(imgSrc) && imgSrc.length > 100) {
    imgSrc = `data:image/png;base64,${imgSrc}`;
  }

  // Fallback image - using a local SVG-based data URI instead of external placeholder service
  if (!imgSrc) {
    const itemName = encodeURIComponent(item.name || "Item");
    imgSrc = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23ddd' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23999'%3E${itemName}%3C/text%3E%3C/svg%3E`;
  }

  return (
    <div
      className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform duration-300"
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden bg-gray-200">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const itemName = encodeURIComponent(item.name || "Item");
            e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23ddd' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23999'%3E${itemName}%3C/text%3E%3C/svg%3E`;
          }}
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
        {item.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
