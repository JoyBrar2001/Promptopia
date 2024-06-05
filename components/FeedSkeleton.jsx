export default function FeedSkeleton() {
  return (
    <div className="mt-16 prompt_layout w-full">
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <div key={index} className={`bg-gray-200 ${index % 3 === 0 ? "h-60" : "h-96"} w-full mb-4 rounded`}></div>
      ))}
    </div>
  )
}