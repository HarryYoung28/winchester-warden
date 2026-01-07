export default function TableButtons({ userId, firstName, lastName, onUpdate, onDelete }) {
    return(
        <td className="px-8 py-2">
            {/* Div container to provide flex for buttons */}
            <div className="flex gap-3">
                <button 
                    className="bg-amber-400 p-1 rounded shadow-lg text-black hover:bg-amber-300"
                    onClick={() => onUpdate?.(userId)}
                >
                    Update
                </button>
                <button 
                    className="bg-red-500 p-1 rounded shadow-lg text-black hover:bg-red-400"
                    onClick={() => onDelete?.(userId, firstName, lastName)}
                >
                    Delete
                </button>
            </div>
        </td>
    );
}