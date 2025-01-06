const ObservationScreen = ({observation, analysis, remark}) => {
    return <div class="bg-white py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
  
      <div class="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
       
  
        {observation && <div class="flex divide-x rounded-lg border bg-gray-50">
          <div class="flex items-center p-2 text-indigo-500 md:p-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
  
          <div class="p-4 md:p-6">
            <h3 class="mb-2 text-lg font-semibold md:text-xl">Observation</h3>
            <p class="text-gray-500">{observation}</p>
          </div>
        </div>}
  
        { analysis && <div class="flex divide-x rounded-lg border bg-gray-50">
          <div class="flex items-center p-2 text-indigo-500 md:p-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
  
          <div class="p-4 md:p-6">
            <h3 class="mb-2 text-lg font-semibold md:text-xl">Analysis</h3>
            <p class="text-gray-500">{analysis}</p>
          </div>
        </div>}
  
       {remark &&  <div class="flex divide-x rounded-lg border bg-gray-50">
          <div class="flex items-center p-2 text-indigo-500 md:p-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
  
          <div class="p-4 md:p-6">
            <h3 class="mb-2 text-lg font-semibold md:text-xl">Remark</h3>
            <p class="text-gray-500">{remark}</p>
          </div>
        </div>}
      </div>
    </div>
  </div>
}

export default ObservationScreen