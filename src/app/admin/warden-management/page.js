import TableData from "@/app/table-data";
import TableButtons from "@/app/table-buttons";

export default function WardenManagement(){

    return (
        <div
        className="flex flex-col justify-center items-center gap-5 min-h-screen">
            <h1
            className="text-2xl font-semibold">
                Warden Management
            </h1>
            {/* Div for table, containing placeholder data in rows for now */}
            <button className="bg-green-500 p-1 rounded shadow-lg text-black">
                Create New Entry
            </button>
            <div className="
            bg-winchester-cool-grey 
            dark:bg-winchester-cool-grey-dark 
            p-5 
            rounded-lg
            shadow-lg
            max-w-full
            overflow-x-auto">
                <table className="table-auto border-collapse">  
                    <caption className="mb-4 font-bold text-lg">
                        
                    </caption>
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 font-semibold">Staff Number</th>
                            <th className="p-2 font-semibold">First Name</th>
                            <th className="p-2 font-semibold">Last Name</th>
                            <th className="p-2 font-semibold">Actions</th>
                        </tr>                      
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <TableData>12345</TableData>
                            <TableData>Mickey</TableData>
                            <TableData>Mouse</TableData>
                            <TableButtons></TableButtons>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}