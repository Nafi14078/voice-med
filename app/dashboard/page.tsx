import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { usersTable, reportsTable } from "@/config/schema"; // Import reportsTable
import { eq, desc } from "drizzle-orm";
import { Mic, History, ShieldCheck, FileText, User, Plus, Download } from "lucide-react";
import Sidebar from "./_components/Sidebar";
import CheckUser from "./_components/CheckUser";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import DownloadReport from "./_components/DownloadReport";

export default async function DashboardPage() {
  const user = await currentUser();
  
  const userData = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, user?.id ?? ""))
    .then(res => res[0]);

  // Fetch all reports for this user
  const userReports = await db
    .select()
    .from(reportsTable)
    .where(eq(reportsTable.userId, user?.id ?? ""))
    .orderBy(desc(reportsTable.createdAt));

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <CheckUser />
      <Sidebar isPremium={userData?.isPremium ?? false} />

      <main className="flex-1 mt-10 pt-20 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back, {userData?.name?.split(' ')[0] || 'Patient'}!
            </h1>
            <p className="text-slate-500 mt-1">Here is your medical overview and AI insights.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="bg-white border border-slate-200 px-5 py-2 rounded-2xl shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Available Credits</p>
              <p className="text-lg font-bold text-blue-600">{userData?.credits ?? 0} <span className="text-sm font-medium text-slate-400">Tokens</span></p>
            </div>
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-11 h-11" } }} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Mic size={24} /></div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase">Consultations</p>
              <p className="text-2xl font-bold text-slate-800">{userData?.consultations ?? 0}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><ShieldCheck size={24} /></div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase">Security Status</p>
              <p className="text-2xl font-bold text-slate-800">Encrypted</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><FileText size={24} /></div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase">Reports</p>
              <p className="text-2xl font-bold text-slate-800">{userData?.reportCount ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <User size={20} className="text-blue-500" /> Personal Details
              </h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-slate-50">
                  <p className="text-xs text-slate-400 mb-1">Full Name</p>
                  <p className="font-semibold text-slate-700">{userData?.name}</p>
                </div>
                <div className="pb-4 border-b border-slate-50">
                  <p className="text-xs text-slate-400 mb-1">Email Address</p>
                  <p className="font-semibold text-slate-700">{userData?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Account ID</p>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-tighter">
                    {userData?.clerkId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <History size={20} className="text-blue-500" /> Medical History
                </h3>
              </div>

              {userReports.length > 0 ? (
                <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-hide">
                  {userReports.map((report) => (
                    <div key={report.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-slate-800">{report.title}</h4>
                          <p className="text-xs text-slate-400">{new Date(report.createdAt!).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          report.urgency === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {report.urgency}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-slate-600 line-clamp-2"><strong>Summary:</strong> {report.summary}</p>
                        <p className="text-sm text-slate-600"><strong>Medication:</strong> {report.medication}</p>
                      </div>
                      {/* NEW UPDATED LINE */}
                      <DownloadReport report={report} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-50 rounded-[2rem]">
                  <div className="bg-slate-50 p-5 rounded-full mb-4">
                    <FileText size={32} className="text-slate-200" />
                  </div>
                  <p className="text-slate-800 font-bold">No medical records found</p>
                  <p className="text-slate-400 text-sm max-w-[250px] mt-1">
                    Once you complete an AI Voice consultation, your reports will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}