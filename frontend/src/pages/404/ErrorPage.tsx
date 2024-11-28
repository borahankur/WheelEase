const ErrorPage = () => {
  return (
    <main className="w-full min-h-screen bg-customGreen flex flex-col items-center justify-center">
      <div className="flex justify-center text-center">
        <p className="font-bold font-mono text-2xl w-[70%]">
          404 Page: Make sure that are on the right page!!
        </p>
      </div>
      <div className="pt-4">
        <button
          onClick={() => window.history.back()}
          className="bg-customGreen2 px-4 py-4 rounded-lg text-xl hover:border border-black hover:text-white transition duration-300"
        >
          Go Back
        </button>
      </div>
    </main>
  )
}

export default ErrorPage
