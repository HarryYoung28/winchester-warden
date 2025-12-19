"use client";

import { useState, useEffect } from "react";
import PageTitle from "../components/page-title";

export default function WardenView() {

    const [selectedLocation, setSelectedLocation] = useState("1");
    const [wardenData, setWardenData] = useState(null);

    useEffect(() => {
        async function loadWardenData() {
            try {
                const res = await fetch("/api/warden-location");
                const data = await res.json();

                if (data.ok) {
                    setWardenData(data.data);
                } else {
                    console.error(data.error);
                }
            } catch (err) {
                console.error(err);
            }
        }
        loadWardenData();
    }, []);

    async function updateLocation() {
        if (!selectedLocation) {
            alert("Please select a location from the drop-down menu.")
            return;
        }

        try { 
            const response = await fetch("/api/update-location", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    locationId: Number(selectedLocation)
                })
            });

            const result = await response.json();

            if (!result.ok) {
                alert(result.error || "Location Update Failed");
                return;
            }

            const updatedResponse = await fetch("/api/warden-location")
            const updatedData = await updatedResponse.json();
            
            if (updatedData.ok) {
                setWardenData(updatedData.data)
            }
            alert("Location updated successfully");
        } catch (err) {
            console.error(err);
            alert("Whoops... not good! Something has broken.")
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-5">
            <PageTitle>Warden Home Page</PageTitle>
            <h1 className="text-2xl">
                Welcome {wardenData ? `${wardenData.first_name} ${wardenData.last_name}` : "updating.."}
            </h1>
            <p className="text-xl">
                Current Working Location: {wardenData ? wardenData.location_name : "updating.."}
            </p>
            <p className="text-xl pb-10">
                Last Updated: {wardenData ? new Date(wardenData.started_at).toLocaleString() : "updating.."}
            </p>
            <p>To update your location, choose your current working location from the list below. 
                Select "Update" when you are ready.
            </p>
            <p className="font-bold">If you are no longer on site or signing off for the day, 
                please select "Off-Site".
            </p>
            <div className="flex flex-col gap-4">
                <select className="border" 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <optgroup label="Off-Site">
                        <option value="1">
                            Off-Site
                        </option>
                    </optgroup>
                    <optgroup label="Student Villages">
                        <option value="2">
                            Burma Road Student Village
                        </option>
                        <option value="3">
                            Queen's Road Student Village
                        </option>
                        <option value="4">
                            West Downs Student Village
                        </option>
                    </optgroup>
                    <optgroup label="All Other Buildings">
                        <option value="5">
                            Alwyn Hall
                        </option>
                        <option value="6">
                            Beech Glade
                        </option>
                        <option value="7">
                            Bowers Building
                        </option>
                        <option value="8">
                            Business School
                        </option>
                        <option value="9">
                            Centre for Sport
                        </option>
                        <option value="10">
                            Chapel
                        </option>
                        <option value="11">
                            The Cottage
                        </option>
                        <option value="12">
                            Fred Wheeler Building
                        </option>
                        <option value="13">
                            Herbert Jarman Building
                        </option>
                        <option value="14">
                            Holm Lodge
                        </option>
                        <option value="15">
                            Kennet Kettle Building
                        </option>
                        <option value="16">
                            King Alfred Centre
                        </option>
                        <option value="17">
                            Martial Rose Library
                        </option>
                        <option value="18">
                            Masters Lodge
                        </option>
                        <option value="19">
                            Medecroft
                        </option>
                        <option value="20">
                            Medecroft Annexe
                        </option>
                        <option value="21">
                            Paul Chamberlain Building
                        </option>
                        <option value="22">
                            St Alphege
                        </option>
                        <option value="23">
                            St Edburga
                        </option>
                        <option value="24">
                            St Elizabeth's Hall
                        </option>
                        <option value="25">
                            St Grimbald's Court
                        </option>
                        <option value="26">
                            St James' Hall
                        </option>
                        <option value="27">
                            St Swithun's Lodge
                        </option>
                        <option value="28">
                            Students' Union
                        </option>
                        <option value="29">
                            The Stripe
                        </option>
                        <option value="30">
                            Tom Atkingson Building
                        </option>
                        <option value="31">
                            West Downs Centre
                        </option>
                        <option value="32">
                            Winton Building
                        </option>
                    </optgroup>
                </select>
                <button className="bg-lime-500 p-1 rounded shadow-lg text-black hover:bg-lime-400"
                onClick={updateLocation}
                >
                    Update
                </button>
            </div>  
        </div>
    );
}