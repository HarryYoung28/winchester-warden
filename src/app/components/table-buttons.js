export default function TableButtons(){
    return(
        <td className="px-8 py-2">
            {/* Div container to provide flex for buttons */}
            <div className="flex gap-3">
                <button className="bg-orange-400 p-1 rounded shadow-lg text-black">
                    Update
                </button>
                <button className="bg-red-400 p-1 rounded shadow-lg text-black">
                    Delete
                </button>
            </div>
        </td>
    );
}