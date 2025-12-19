import TableData from "@/app/components/table-data"
import PageTitle from "@/app/components/page-title";

export default function AdminView() {
    return (
        <div  
        className="flex flex-col justify-center items-center min-h-screen gap-5">
            <PageTitle>Dashboard</PageTitle>
            {/* Div to hold table of locations without cover */}
            <div className="
            bg-winchester-cool-grey
            dark:bg-winchester-cool-grey-dark
            p-5
            rounded-lg
            shadow-lg
            max-w-full
            overflow-x-auto">
            {/* Placeholder data for now */}
            <table className="table-auto border-collapse">
                <caption className="mb-4 font-bold text-lg">
                    Locations Without Cover
                </caption>
                <thead>
                    <tr className="border-b">
                        <th className="p-2 font-semibold">Location</th>
                        <th className="p-2 font-semibold">Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <TableData>Alwyn Hall</TableData>
                        <TableData>12:00:00</TableData>
                    </tr>
                    <tr className="border-b">
                        <TableData>King Alfred Centre</TableData>
                        <TableData>09:00:00</TableData>
                    </tr>
                </tbody>
            </table>
            </div>
            {/* div to hold current wardens locations */}
            <div className="
            bg-winchester-cool-grey
            dark:bg-winchester-cool-grey-dark
            p-5
            rounded-lg
            shadow-lg
            max-w-full
            overflow-x-auto
            mt-10">
            {/* Placeholder data for now */}
            <table className="table-auto border-collapse">
                <caption className="mb-4 font-bold text-lg">
                    Warden Whereabouts
                </caption>
                <thead>
                    <tr className="border-b">
                        <th className="p-2 font-semibold">Warden First Name</th>
                        <th className="p-2 font-semibold">Warden Last Name</th>
                        <th className="p-2 font-semibold">Location</th>
                        <th className="p-2 font-semibold">Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <TableData>Michael</TableData>
                        <TableData>Mouse</TableData>
                        <TableData>Alwyn Hall</TableData>
                        <TableData>12:00:00</TableData>
                    </tr>
                    <tr className="border-b">
                        <TableData>Scrooge</TableData>
                        <TableData>McDuck</TableData>
                        <TableData>King Alfred Centre</TableData>
                        <TableData>09:00:00</TableData>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
}