export default function TableButtons(){
    return(
        <td className="px-8 py-2">
            {/* Div container to provide flex for buttons */}
            <div className="flex gap-3">
                <button className="bg-amber-400 p-1 rounded shadow-lg text-black hover:bg-amber-300">
                    Update
                </button>
                <button className="bg-red-500 p-1 rounded shadow-lg text-black hover:bg-red-400">
                    Delete
                </button>
            </div>
        </td>
    );
}