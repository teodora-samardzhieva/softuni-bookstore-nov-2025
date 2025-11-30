import { useState } from "react";

export default function Search({onSearch}) {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const text = e.target.value;
        setValue(text);
        onSearch(text);      // send to parent
    };

    return (
        <div className="w-full flex justify-center mt-6">
            <div className="mb-3 md:w-96">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-50 flex-auto rounded-l border border-neutral-300 bg-transparent px-3 py-[0.25rem] text-base text-neutral-700 outline-none transition duration-200 focus:z-[3] focus:border-primary dark:border-neutral-600 dark:text-neutral-200"
                        placeholder="Search"
                        value={value}
                        onChange={handleChange}
                    />

                    <button
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="relative z-[2] flex items-center rounded-r bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase text-white shadow-md transition duration-150 hover:bg-blue-700"
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
