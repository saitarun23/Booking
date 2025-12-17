export default function VenueLocation({ venue }) {
  const mapUrl = `https://www.google.com/maps?q=${venue.latitude},${venue.longitude}&z=15&output=embed`;

  return (
    <div className="map-card">
      <iframe
        src={mapUrl}
        width="100%"
        height="250"
        style={{ border: 0, borderRadius: "8px" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="venue-map"
      />
    </div>
  );
}
