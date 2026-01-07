"use client";

import TableData from "@/app/components/table-data";
import PageTitle from "@/app/components/page-title";
import { useEffect, useState } from "react";

export default function AdminView() {
    const [wardenRows, setWardenRows] = useState([]);

    useEffect(() => {
        async function loadWhereabouts() {
            const res = await fetch("/api/admin/warden-whereabouts");
            const data = await res.json();

            if (data.ok) {
                setWardenRows(data.data);
            } else {
                console.error(data.error);
            }
        }
        loadWhereabouts();
    }, []);

    const [locationsWithoutCover, setLocationsWithoutCover] = useState([]);

    useEffect(() => {
        async function loadLocationsWithoutCover() {
            const res = await fetch("/api/admin/locations-without-cover");
            const data = await res.json();

            if (data.ok) {
                setLocationsWithoutCover(data.data);
            } else {
                console.error(data.error);
            }
        }

        loadLocationsWithoutCover();
    }, []);

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
            <table className="table-auto border-collapse">
                <caption className="mb-4 font-bold text-lg">
                    Locations Without Cover
                </caption>
                <thead>
                    <tr className="border-b">
                        <th className="p-2 font-semibold">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {locationsWithoutCover.map((loc) => (
                        <tr key={loc.location_id} className="border-b">
                            <TableData>{loc.location_name}</TableData>
                        </tr>
                    ))}
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
                    {wardenRows.map((w, index) => (
                        <tr key={index} className="border-b">
                            <TableData>{w.first_name}</TableData>
                            <TableData>{w.last_name}</TableData>
                            <TableData>{w.location_name}</TableData>
                            <TableData>{new Date(w.started_at).toLocaleString()}</TableData>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}