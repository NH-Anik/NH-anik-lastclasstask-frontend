
const CategoryFrom = ({handelSubmit, value, setValue}) => {
    return (
        <div className=" max-w-xs">
            <form action="" onSubmit={handelSubmit} >
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Enter new category"
                    className="w-full pl-12 pr-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg mt-2">
                    Add category
                </button>
            </form>
        </div>
    );
};

export default CategoryFrom;