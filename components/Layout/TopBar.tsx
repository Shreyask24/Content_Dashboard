"use client";


export default function Topbar() {

    return (
        <header className="w-full p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <input
                type="text"
                placeholder="Search..."
                className="w-1/2 px-3 py-2 rounded bg-white dark:bg-gray-700 text-sm"
            />
            <button
                // onClick={() => dispatch(toggleDarkMode())}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded"
            >
                Light Mode
            </button>
        </header>
    );
}
