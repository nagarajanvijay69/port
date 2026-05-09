"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Tabs() {
    const [tab, setTab] = useState<"tab1" | "tab2">("tab1");
    
    const noti = [
        { id: 1, text: "You have 2 unread messages" },
        { id: 2, text: "Your profile was updated" }
    ];

    const router = useRouter();

    const callHistory = [
        { id: 1, name: "John", type: "Incoming", time: "10:30 AM" },
        { id: 2, name: "Anna", type: "Missed", time: "11:15 AM" },
        { id: 3, name: "David", type: "Outgoing", time: "1:45 PM" }
    ];

    return (
        <div className="w-[95%] xl:pl-20 mx-auto mt-5">

            <div className="flex gap-2 font-semibold cursor-pointer justify-center items-center" onClick={()=> router.back()}>
                <div className="notifications text-xl">Notifications</div>
            </div>

            {/* Tab Buttons */}
            <div className="flex justify-start pb-2 mt-5 text-lg">
                <button
                    onClick={() => setTab("tab1")}
                    className={`px-4 py-2 font-semibold transison-all duration-200
                        ${tab === "tab1" ? "text-black" : "text-gray-500"
                        }`}
                >
                    All
                </button>

                <button
                    onClick={() => setTab("tab2")}
                    className={`px-4 py-2 font-semibold transison-all duration-200
                         ${tab === "tab2" ? "text-black" : "text-gray-500"
                        }`}
                >
                    Call History
                </button>

            </div>

            {/* Tab Content */}
            <div className="mt-6">

                {/* tab 1 content */}

                {tab === "tab1" && (
                    <div>
                        <h2 className="text-xl font-bold ml-3 lg:ml-0">New</h2>
                        <div className="p-4">

                            {noti.map((n) => (
                                <p key={n.id} className="mb-2 p-2 rounded border-b">
                                    {n.text}
                                </p>
                            ))}

                        </div>
                    </div>
                )}

                {/* tab 2 content */}

                {tab === "tab2" && (
                    <div>
                        <h2 className="text-xl font-bold ml-3 lg:ml-0">Call History</h2>
                        <div className="p-4">

                            {callHistory.map((call) => (
                                <div
                                    key={call.id}
                                    className="p-3 mb-2 rounded flex justify-between border-b"
                                >
                                    <div>
                                        <p className="font-semibold">{call.name}</p>
                                        <p className="text-sm text-gray-500">{call.type}</p>
                                    </div>

                                    <span className="text-sm text-gray-400">{call.time}</span>
                                </div>
                            ))}

                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}