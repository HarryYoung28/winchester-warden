import PageTitle from "../components/page-title";

export default function WardenView() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-5">
            <PageTitle>Warden Home Page</PageTitle>
            <h1 className="text-2xl">
                Welcome [NAME]
            </h1>
            <p className="text-xl">
                Current Working Location: XXXX-XXXX
            </p>
            <p className="text-xl pb-10">
                Last Updated: XX:XX:XX
            </p>
            <p>To update your location, choose your current working location from the list below. 
                Select "Update" when you are ready.
            </p>
            <p className="font-bold">If you are no longer on site or signing off for the day, 
                please select "Off-Site".
            </p>
            <div className="flex flex-col gap-4">
                <select className="border">
                    <optgroup label="Off-Site">
                        <option value="Off-Site">
                            Off-Site
                        </option>
                    </optgroup>
                    <optgroup label="Student Villages">
                        <option value="Burma Road Student Village">
                            Burma Road Student Village
                        </option>
                        <option value="Queen's Road Student Village">
                            Queen's Road Student Village
                        </option>
                        <option value="West Downs Student Village">
                            West Downs Student Village
                        </option>
                    </optgroup>
                    <optgroup label="All Other Buildings">
                        <option value="Alwyn Hall">
                            Alwyn Hall
                        </option>
                        <option value="Beech Glade">
                            Beech Glade
                        </option>
                        <option value="Bowers Building">
                            Bowers Building
                        </option>
                        <option value="Business School">
                            Business School
                        </option>
                        <option value="Centre for Sport">
                            Centre for Sport
                        </option>
                        <option value="Chapel">
                            Chapel
                        </option>
                        <option value="The Cottage">
                            The Cottage
                        </option>
                        <option value="Fred Wheeler Building">
                            Fred Wheeler Building
                        </option>
                        <option value="Herbert Jarman Building">
                            Herbert Jarman Building
                        </option>
                        <option value="Holm Lodge">
                            Holm Lodge
                        </option>
                        <option value="Kenneth Kettle Building">
                            Kennet Kettle Building
                        </option>
                        <option value="King Alfred Centre">
                            King Alfred Centre
                        </option>
                        <option value="Martial Rose Library">
                            Martial Rose Library
                        </option>
                        <option value="Masters Lodge">
                            Masters Lodge
                        </option>
                        <option value="Medecroft">
                            Medecroft
                        </option>
                        <option value="Medecroft Annexe">
                            Medecroft Annexe
                        </option>
                        <option value="Paul Chamberlain Building">
                            Paul Chamberlain Building
                        </option>
                        <option value="St Alphege">
                            St Alphege
                        </option>
                        <option value="St Edburga">
                            St Edburga
                        </option>
                        <option value="St Elizabeth's Hall">
                            St Elizabeth's Hall
                        </option>
                        <option value="St Grimbald's Court">
                            St Grimbald's Court
                        </option>
                        <option value="St James' Hall">
                            St James' Hall
                        </option>
                        <option value="St Swithun's Lodge">
                            St Swithun's Lodge
                        </option>
                        <option value="Students' Union">
                            Students' Union
                        </option>
                        <option value="The Stripe">
                            The Stripe
                        </option>
                        <option value="Tom Atkinson Building">
                            Tom Atkingson Building
                        </option>
                        <option value="West Downs Centre">
                            West Downs Centre
                        </option>
                        <option value="Winton Building">
                            Winton Building
                        </option>
                    </optgroup>
                </select>
                <button className="bg-lime-500 p-1 rounded shadow-lg text-black hover:bg-lime-400">
                    Update
                </button>
            </div>  
        </div>
    );
}