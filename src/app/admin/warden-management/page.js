import TableData from "@/app/components/table-data";
import TableButtons from "@/app/components/table-buttons";
import PageTitle from "@/app/components/page-title";

export default function WardenManagement(){

    return ( 
        <div
        className="flex flex-col justify-center items-center gap-5 min-h-screen">
            <PageTitle>Warden Management</PageTitle>
            <div className="
            bg-winchester-cool-grey 
            dark:bg-winchester-cool-grey-dark 
            p-5 
            rounded-lg
            shadow-lg
            max-w-full
            overflow-x-auto">
                {/* mini div to put the button in a flex box to keep it to the right */}
                <div className="flex justify-end">
                    <button className="bg-lime-500 p-1 rounded shadow-lg text-black hover:bg-lime-400">
                        Create New Entry
                    </button>
                </div>
                <table className="table-auto border-collapse">  
                    <caption className="mb-4 font-bold text-lg">
                        Warden Details
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