export default function ProfileSkeleton() {
  return (
    <section className="w-full">
      <div className="bg-gray-200 h-16 w-full max-w-96 mb-4 rounded"></div>
      <div className="bg-gray-200 h-10 w-full max-w-60 mb-4 rounded"></div>

      <div className="mt-16 prompt_layout">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div key={index} className={`bg-gray-200 ${index%3 === 0 ? "h-60" : "h-96"} w-full mb-4 rounded`}></div>
        ))}
      </div>
    </section>
  )
}
