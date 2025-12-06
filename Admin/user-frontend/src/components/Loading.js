export default function Loading({ message = "Loading..." }) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}
