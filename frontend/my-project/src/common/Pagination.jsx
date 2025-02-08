const Pagination = (props) =>{

    const handlePreviousPage = props.handlePreviousPage
    const handlePressedPage  = props.handlePressedPage
    const handleNextPage = props.handleNextPage
    const page = props.page
    const totalPages= props.totalPages
    
    
    
    return(
        <section className="py-2 md:py-4 z-50">
            {/*  pagination  */}
            <nav className='flex justify-center'>
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                        {/* previous button */}
                        {page > 1 && (
                            <button type='button' 
                                // disabled={!links.previous} 
                                onClick={handlePreviousPage} 
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                                </svg>
                            </button>
                        )}
                    </li>

                    {/* Page numbers */}
                    {totalPages > 1 && (
                        Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button 
                                    type="button"
                                    onClick={() => handlePressedPage(index)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight ${page === index + 1 ? 'text-blue-600 border border-blue-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300'} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))
                    )}   
                    <li>
                        {/* Next button  */}
                        {page < totalPages && (
                            <button type='button' 
                                onClick={handleNextPage} 
                                // disabled={!links.next}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                            </button>
                        )}
                    </li>
                </ul>
            </nav>
        </section>)
}

export default Pagination