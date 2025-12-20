"use client";

import TableData from "@/app/components/table-data";
import TableButtons from "@/app/components/table-buttons";
import PageTitle from "@/app/components/page-title";
import { useEffect, useState } from "react";

export default function WardenManagement(){

    const [wardens, setWardens] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [form, setForm] = useState({
        staffNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [isSaving, setIsSaving] = useState(false);

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updateUserId, setUpdateUserId] = useState(null);

    const [updateForm, setUpdateForm] = useState({
        staffNumber: "",
        firstName: "",
        lastName: "",
        email: ""
    });

    function handleFormChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    function openUpdate(userId) {
        const w = wardens.find((x) => x.user_id === userId);

        if (!w) {
            alert("Error, can't find this warden in the database")
            return;
        }

        setUpdateUserId(userId);
        setUpdateForm({
            staffNumber: w.staff_number ?? "",
            firstName: w.first_name ?? "",
            lastName: w.last_name ?? "",
            email: w.email ?? ""
        });

        setIsUpdateOpen(true);
    }

    function closeUpdate() {
        setIsUpdateOpen(false);
        setUpdateUserId(null);
    }

    function handleUpdateChange(e) {
        const { name, value } = e.target;
        setUpdateForm((prev) => ({ ...prev, [name]: value}));
    }

    async function handleUpdateWarden(e) {
        e.preventDefault();

        if (!updateUserId) {
            alert("Error, User Id Missing!");
            return;
        }

        const { staffNumber, firstName, lastName, email } = updateForm;

        if(!staffNumber || !firstName || !lastName || !email) {
            alert("Missing field(s).");
            return;
        }

        try {
            setIsSaving(true);

            const res = await fetch(`/api/admin/users/${updateUserId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateForm)
            });

            const data = await res.json();

            if (!data.ok) {
                alert(data.error || "Update failure...");
                return;
            }

            setWardens((prev) => prev.map((w) => w.user_id === updateUserId ? {
                ...w,
                staff_number: staffNumber,
                first_name: firstName,
                last_name: lastName,
                email
            }
            : w
        ));
        closeUpdate();
        } catch (err) {
            console.error(err);
            alert("Update failure...")
        } finally {
            setIsSaving(false);
        }
    }

    async function handleCreateWarden(e) {
        e.preventDefault();

        if (!form.staffNumber || !form.firstName || !form.lastName || !form.email || !form.password) {
            alert("Missing field(s)!");
            return;
        }

        try {
            setIsSaving(true);

            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!data.ok) {
                alert(data.error || "Failed to create new warden.");
                return;
            }

            const refresh = await fetch("/api/admin/users");
            const refreshJson = await refresh.json();

            if (refreshJson.ok) {
                setWardens(refreshJson.data);
            } else {
                console.error(refreshJson.error);
            }

            setForm({ staffNumber: "", firstName: "", lastName: "", email: "", password: ""});

            closeForm();
        
        } catch (err) {
            console.error(err);
            alert("Failed to create new warden, server error!")
        } finally {
            setIsSaving(false);
        }
    }

    function openForm() {
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
    }

    useEffect(() => {
        async function loadWardens() {
            const res = await fetch("/api/admin/users");
            const dataJson = await res.json();

            if (dataJson.ok) {
                setWardens(dataJson.data);
            } else {
                console.error(dataJson.error);
            }
        }
        loadWardens();
    }, []);

    async function handleDelete(userId, firstName, lastName) {
        console.log("Deleting userId:", userId);
        const checkCorrect = confirm(
            `Are you sure you want to delete ${firstName} ${lastName}?\nThis cannot be undone.`
        )

        if (!checkCorrect) {
            return;
        }

        const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });

        const data = await res.json();

        if (!data.ok) {
            alert(data.error || "Delete command failed.")
            return;
        }
        
        setWardens((prev) => prev.filter((w) => w.user_id !== userId));
    }

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
                    <button 
                        className="bg-lime-500 p-1 rounded shadow-lg text-black hover:bg-lime-400"
                        onClick={openForm}
                    >
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
                        {wardens.map((w) => (
                            <tr key={w.user_id} className="border-b">
                                <TableData>{w.staff_number}</TableData>
                                <TableData>{w.first_name}</TableData>
                                <TableData>{w.last_name}</TableData>
                                <TableButtons 
                                    userId={w.user_id}
                                    firstName={w.first_name}
                                    lastName={w.last_name}
                                    onDelete={handleDelete}
                                    onUpdate={openUpdate}
                                ></TableButtons>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for update/edit warden form */}
            {isUpdateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="absolute inset-0 bg-black/50"
                        onClick={closeUpdate}
                    >
                    </div>
                    <div className="
                        relative
                        z-10
                        bg-winchester-cool-grey
                        dark:bg-winchester-cool-grey-dark
                        p-6
                        rounded-lg
                        shadow-lg
                        w-full
                        max-w-lg
                    ">
                        <h2 className="text-xl font-bold mb-4">
                            Update Warden
                        </h2>
                        <form onSubmit={handleUpdateWarden} className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">
                                    Staff Number
                                </label>
                                <input
                                    className="border p-2 rounded text-black focus:border-2 focus:border-emerald-300 dark:text-white"
                                    name="staffNumber"
                                    value={updateForm.staffNumber}
                                    onChange={handleUpdateChange}
                                >
                                </input>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">
                                    First Name
                                </label>
                                <input
                                    className="border p-2 rounded text-black focus:border-2 focus:border-emerald-300 dark:text-white"
                                    name="firstName"
                                    value={updateForm.firstName}
                                    onChange={handleUpdateChange}
                                >
                                </input>
                            </div><div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">
                                    Last Name
                                </label>
                                <input
                                    className="border p-2 rounded text-black focus:border-2 focus:border-emerald-300 dark:text-white"
                                    name="lastName"
                                    value={updateForm.lastName}
                                    onChange={handleUpdateChange}
                                >
                                </input>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    className="border p-2 rounded text-black focus:border-2 focus:border-emerald-300 dark:text-white"
                                    name="email"
                                    value={updateForm.email}
                                    onChange={handleUpdateChange}
                                >
                                </input>
                            </div>
                            <button
                                type="submit"
                                className="bg-lime-500 p-1 shadow rounded text-black hover:bg-lime-400"
                                disabled={isSaving}
                            >
                                {isSaving ? "Updating..." : "Save Changes"}
                            </button>
                            <button
                                type="button"
                                onClick={closeUpdate}
                                className="bg-gray-400 p-1 rounded shadow text-black hover:bg-gray-300"
                                disabled={isSaving}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            
            {/* "Modal", like a pop up, for new entry*/}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="absolute inset-0 bg-black/50"
                        onClick={closeForm}
                    >
                    </div>

                    <div className="
                        relative
                        z-10
                        bg-winchester-cool-grey
                        dark:bg-winchester-cool-grey-dark
                        p-6
                        rounded-lg
                        shadow-lg
                        w-full
                        max-w-lg
                    ">
                        <h2 className="text-xl font-bold mb-4">
                            Create New Warden
                        </h2>

                        <p className="mb-4 text-sm opacity-80">
                            Please enter the warden's details below.
                        </p>

                        <div className="flex justify-center gap-3">
                            <form onSubmit={handleCreateWarden} className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="staffNumber" className="text-sm font-medium">
                                        Warden Staff Number (W123XXX)
                                    </label>
                                    <input
                                        className="border p-2 rounded text-black w-md focus:border-2 focus:border-emerald-300 dark:text-white"
                                        name="staffNumber"
                                        placeholder="e.g W123123"
                                        value={form.staffNumber}
                                        onChange={handleFormChange}
                                    >
                                    </input>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="firstName" className="text-sm font-medium">
                                        Warden First Name
                                    </label>
                                    <input
                                        className="border p-2 rounded text-black w-md focus:border-2 focus:border-emerald-300 dark:text-white"
                                        name="firstName"
                                        placeholder="e.g. Mickey"
                                        value={form.firstName}
                                        onChange={handleFormChange}
                                    >
                                    </input>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="lastName" className="text-sm font-medium">
                                        Warden Last Name
                                    </label>
                                    <input
                                        className="border p-2 rounded text-black w-md focus:border-2 focus:border-emerald-300 dark:text-white"
                                        name="lastName"
                                        placeholder="e.g Mouse"
                                        value={form.lastName}
                                        onChange={handleFormChange}
                                    >
                                    </input>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Warden Email (firstname.lastname@winchesteruniversityemail.test)
                                    </label>
                                    <input
                                        className="border p-2 rounded text-black w-md focus:border-2 focus:border-emerald-300 dark:text-white"
                                        name="email"
                                        placeholder="e.g. mickey.mouse@winchesteruniversityemail.test"
                                        value={form.email}
                                        onChange={handleFormChange}
                                    >
                                    </input>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="password" className="text-sm font-medium">
                                        Temporary Password (Warden can update this later!)
                                    </label>
                                    <input
                                        className="border p-2 rounded text-black w-md focus:border-2 focus:border-emerald-300 dark:text-white"
                                        type="password"
                                        name="password"
                                        placeholder="e.g. WaltDisney1923"
                                        value={form.password}
                                        onChange={handleFormChange}
                                    >
                                    </input>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-lime-500 p-1 shadow rounded text-black hover:bg-lime-400"
                                    disabled={isSaving}
                                >
                                    {isSaving ? "In Progress...": "Submit"}
                                </button>
                                <button
                                    type="button" 
                                    onClick={closeForm}
                                    className="bg-gray-400 p-1 rounded shadow text-black hover:bg-gray-300"
                                    disabled={isSaving}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}