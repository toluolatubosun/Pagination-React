import React from "react";

function App() {
	const [data, setData]  = React.useState(null)

    const [maxPerPage, setMaxPerPage] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [maxPage, setMaxPage] = React.useState(null);
     
    React.useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments`)
        .then(response => response.json())
        .then(data => {
            setData(data)
            setMaxPage(Math.ceil(data.length / maxPerPage))
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <h1 className="text-center text-3xl mb-4">Comments</h1>

            <div className="px-10">
                {data && data.map((comment, index) => (
                    (index >= (page - 1) * maxPerPage) && (index < page * maxPerPage) && 
                    (
                        <div key={comment.id} className="border-2 space-y-2 mb-10 p-6">
                            <p className="text-medium font-semibold"># {comment.id}</p>
                            <h1 className="text-3xl capitalize">{comment.name}</h1>
                            <p className="text-gray-700">{comment.body}</p>
                            <p className="font-semibold lowercase">{comment.email}</p>
                        </div>
                    )
                ))}
            </div>

            {/* Pagination */}
            {data && data.length > maxPerPage && (
                <>
                <div className="flex flex-row items-center justify-center space-x-3 mb-10">
                    <button
                        onClick={() => {
                            setPage((old) => Math.max(old - 1, 1));
                            window.scrollTo(0, 0);
                        }}
                        disabled={page === 1}
                        className="flex flex-row w-fit items-center py-2 px-4 text-sm font-medium text-white bg-black rounded-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                        </svg>
                        <span>Previous</span>
                    </button>

                    <div className="font-medium">{page} / {maxPage}</div>

                    <button
                        onClick={() => {
                            setPage((old) => Math.min(old + 1, maxPage));
                            window.scrollTo(0, 0);
                        }}
                        disabled={page === maxPage}
                        className="flex flex-row w-fit items-center py-2 px-4 text-sm font-medium text-white bg-black rounded-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <span>Next</span>
                        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                </>
            )}
        </div>
    )
}

export default App;
