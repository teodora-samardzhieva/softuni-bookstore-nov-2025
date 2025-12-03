export const styles = {
    catalog: {
        h1: "text-3xl sm:text-4xl font-serif font-extrabold text-indigo-800 tracking-wide text-center py-8 border-b-2 border-indigo-200 mb-6 mt-30",
    },

    book: {
        container: "bg-violet-300 rounded-lg p-4 text-center shadow-lg transform transition duration-300 hover:scale-105 flex flex-col w-70 sm:w-70 h-95 sm:h-100",
        img: "w-full h-60 sm:h-60 object-cover rounded-md mb-4 border border-gray-700",
        h3: "text-sm font-semibold italic text-black mb-auto pb-6 flex-grow line-clamp-2",
        btnContainer: "flex flex-wrap justify-center gap-2 mt-auto transform transition duration-300",
        btnDetails: "flex items-center justify-center bg-indigo-600 text-white px-1.5 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition duration-200 flex-1 min-w-min",
        btnFavorite: "flex items-center justify-center bg-indigo-900 text-white px-1.5 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition duration-200 flex-1 min-w-min",
    },

    bookGrid: {
        container: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 [@media(min-width:2000px)]:grid-cols-6 [@media(min-width:2500px)]:grid-cols-7 gap-7 p-4 md:px-10 justify-items-center",
    },

    search: {
        input: "relative m-0 -mr-0.5 block w-[1px] min-w-50 flex-auto rounded-l border border-neutral-300 bg-transparent px-3 py-[0.25rem] text-base text-neutral-700 outline-none transition duration-200 focus:z-[3] focus:border-primary dark:border-neutral-600 dark:text-neutral-200",
        btn: "relative z-[2] flex items-center rounded-r bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase text-white shadow-md transition duration-150 hover:bg-blue-700",
    },

    comments: {
        textarea: "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700",
        btn: "w-full bg-indigo-600 text-white font-medium py-2 rounded-md shadow hover:bg-indigo-700 transition"
    },
    detailsForm: {
        container: "flex justify-center p-8 mt-30",
        div: "flex flex-col md:flex-row max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl",
        h1: "mb-2 text-3xl font-extrabold tracking-tight text-gray-900 border-b pb-3 border-indigo-100",
        p: "text-lg font-semibold",
        span: "font-normal text-gray-600",
        btn: "inline-flex items-center w-full md:w-auto justify-center text-white bg-indigo-600 border border-transparent rounded-lg shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium text-base px-6 py-3 transition duration-150",
        commentSection: "w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10",

        formItem: "mb-6",
        formLabel: "block text-sm font-medium text-gray-700 mb-2",
        formInput: "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
        formTextarea: "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
        ratingContainer: "flex items-center gap-3",
        starsContainer: "flex",
        starFilled: "text-amber-400 fill-amber-400",
        starHalf: "text-amber-400/50 fill-amber-400/50",
        starEmpty: "text-gray-300",
    },
    // Create and Edit form styles
    createForm: {
        container: "w-full max-w-[320px] sm:max-w-xl mx-auto p-6 rounded-lg shadow-xl mt-30 bg-stone-100 border-solid",
        h2: "text-3xl font-serif text-gray-900 mb-6 text-center",
        label: "block text-sm font-medium text-gray-700",
        input: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
        btn: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out",
        fileBtn: "px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition font-medium",
        img: "max-h-48 rounded-md shadow-md object-cover",
    },
    favoriteBooks: {
        h2: "text-3xl sm:text-4xl font-serif font-extrabold text-rose-400 tracking-wide text-center py-8 border-b-2 border-rose-200 mb-6 mt-30",
        //id
        div: "bg-rose-200 rounded-lg p-4 text-center shadow-lg transform transition duration-300 hover:scale-105 flex flex-col w-70 sm:w-70 h-95 sm:h-100",
        btn: "mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200",
    },
    homePage: {
        navLink: "text-sm/6 font-semibold text-gray-900 hover:text-indigo-500 hover:font-bold hover:text-lg",
        p: "-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50",
        //Dialog Panel
        div: "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10",
        //Mobile Menu
        divMenu: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",
        logoText: "text-xl font-bold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent",
        logoUnderline: "h-0.5 w-0 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] group-hover:w-full transition-all duration-500",
    },
    // Register and login styles
    registerForm: {
        container: "flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-20",
        h2: "mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900",
        p: "mt-10 text-center text-sm/6 text-gray-500",
        link: "font-semibold text-indigo-600 hover:text-indigo-500",
        label: "block text-sm/6 font-medium text-gray-900",
        input: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
        btn: "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
    }

};