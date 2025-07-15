import Sidebar from "./Sidebar";
import Topbar from "./TopBar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 p-4 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
