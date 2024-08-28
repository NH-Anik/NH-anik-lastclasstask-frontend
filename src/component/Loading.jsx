
const Loading = () => {
    return (
        <> 
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col bg-black max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
              <div className="rounded-md shadow-lg px-4 py-6">
                <div className="flex flex-col justify-center items-center align-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>   
              </div>
            </div>
          </div>
        </>
    );
};

export default Loading;