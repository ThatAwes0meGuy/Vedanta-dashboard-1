const ObservationScreen = ({observation, analysis, remark}) => {
    return <div className="bg-white py-6 sm:py-8 lg:py-12">
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
  
      <div className="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
       
  
        {observation && <div className="flex divide-x rounded-lg border bg-gray-50">
          <div className="flex items-center p-2 text-indigo-500 md:p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
  
          <div className="p-4 md:p-6">
            <h3 className="mb-2 text-lg font-semibold md:text-xl">Observation</h3>
            <p className="text-gray-500">{observation}</p>
          </div>
        </div>}
  
        { analysis && <div className="flex divide-x rounded-lg border bg-gray-50">
          <div className="flex items-center p-2 text-indigo-500 md:p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
  
          <div className="p-4 md:p-6">
            <h3 className="mb-2 text-lg font-semibold md:text-xl">Analysis</h3>
            <p className="text-gray-500">{analysis}</p>
          </div>
        </div>}
  
       {remark &&  <div className="flex divide-x rounded-lg border bg-gray-50">
          <div className="flex items-center p-2 text-indigo-500 md:p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
  
          <div className="p-4 md:p-6">
            <h3 className="mb-2 text-lg font-semibold md:text-xl">Remark</h3>
            <p className="text-gray-500">{remark}</p>
          </div>
        </div>}
      </div>
    </div>
  </div>
}

export default ObservationScreen