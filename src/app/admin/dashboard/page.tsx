"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createRoot } from "react-dom/client";
import toast from "react-hot-toast";
import {
  Users, CalendarCheck, BookOpen, Search, Download, FileSpreadsheet,
  Pencil, Trash2, LogOut, X, Check, Ban, LoaderCircle, RefreshCw, CheckCircle2, Award,
} from "lucide-react";
import { Student } from "@/lib/types";
import { CertificateTemplate } from "@/components/CertificateTemplate";

export default function AdminDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editing, setEditing] = useState<Student | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Student | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [certModal, setCertModal] = useState<Student | null>(null);
  const [generatingCert, setGeneratingCert] = useState(false);

  async function loadStudents() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/students", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        setStudents([]);
      } else {
        setStudents(data.students || []);
      }
    } catch {
      toast.error("Could not load registrations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const courses = useMemo(() => ["All", ...Array.from(new Set(students.map((s) => s.course)))], [students]);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery =
        !query ||
        [s.name, s.email, s.phone, s.college, s.studentId].some((f) => f?.toLowerCase().includes(query.toLowerCase()));
      const matchesCourse = courseFilter === "All" || s.course === courseFilter;
      const matchesStatus = statusFilter === "All" || s.status === statusFilter;
      return matchesQuery && matchesCourse && matchesStatus;
    });
  }, [students, query, courseFilter, statusFilter]);

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return students.filter((s) => new Date(s.timestamp).toDateString() === today).length;
  }, [students]);

  const courseWise = useMemo(() => {
    const map = new Map<string, number>();
    students.forEach((s) => map.set(s.course, (map.get(s.course) || 0) + 1));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [students]);

  async function updateStatus(s: Student, status: Student["status"]) {
    setBusyId(s.studentId);
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateStatus", studentId: s.studentId, status }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStudents((prev) => prev.map((x) => (x.studentId === s.studentId ? { ...x, status } : x)));
      toast.success(`Marked ${status.toLowerCase()}`);
    } catch (e) {
      toast.error("Update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function saveEdit(updated: Student) {
    setBusyId(updated.studentId);
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "edit", studentId: updated.studentId, updates: updated }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStudents((prev) => prev.map((x) => (x.studentId === updated.studentId ? updated : x)));
      toast.success("Student updated");
      setEditing(null);
    } catch {
      toast.error("Save failed");
    } finally {
      setBusyId(null);
    }
  }

  async function deleteStudent(s: Student) {
    setBusyId(s.studentId);
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", studentId: s.studentId }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStudents((prev) => prev.filter((x) => x.studentId !== s.studentId));
      toast.success("Student deleted");
      setConfirmDelete(null);
    } catch {
      toast.error("Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  async function generateCertificatePdf(student: Student, name: string, domain: string, duration: string) {
    setGeneratingCert(true);
    try {
      let certificateId = student.certificateId;
      let issuedDateIso = student.certificateIssuedDate;

      // Only issue a new ID if this student doesn't already have one —
      // re-downloading later reuses the same ID rather than minting a new one.
      if (!certificateId) {
        const res = await fetch("/api/admin/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "issueCertificate", studentId: student.studentId }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        certificateId = data.certificateId;
        issuedDateIso = new Date().toISOString();
        setStudents((prev) =>
          prev.map((x) => (x.studentId === student.studentId ? { ...x, certificateId, certificateIssuedDate: issuedDateIso! } : x))
        );
      }

      const issuedDateLabel = new Date(issuedDateIso || Date.now()).toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric",
      });

      // Render the certificate off-screen at full resolution, capture it,
      // then drop it into a landscape PDF sized to match.
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-99999px";
      container.style.top = "0";
      document.body.appendChild(container);

      const root = createRoot(container);
      root.render(
        <CertificateTemplate
          name={name}
          domain={domain}
          duration={duration}
          certificateId={certificateId!}
          issuedDate={issuedDateLabel}
        />
      );

      // Let fonts finish loading, and explicitly wait for every image in the
      // template (the logo) before capturing — a fixed delay alone is a race
      // condition and can produce a certificate with a missing logo.
      await (document as any).fonts?.ready;
      const images = Array.from(container.querySelectorAll("img"));
      await Promise.all(
        images.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              })
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 150));

      const html2canvas = (await import("html2canvas")).default;
      const { default: jsPDF } = await import("jspdf");

      const target = container.querySelector("#certificate-template") as HTMLElement;
      const canvas = await html2canvas(target, { scale: 2, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [1492, 1054] });
      pdf.addImage(imgData, "PNG", 0, 0, 1492, 1054);
      pdf.save(`${name.replace(/\s+/g, "_")}_Certificate_${certificateId}.pdf`);

      root.unmount();
      document.body.removeChild(container);
      setCertModal(null);
      toast.success("Certificate downloaded");
    } catch (err) {
      toast.error("Could not generate certificate");
    } finally {
      setGeneratingCert(false);
    }
  }

  async function exportExcel() {
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");
    XLSX.writeFile(wb, `shrandha-labs-registrations-${Date.now()}.xlsx`);
  }

  async function exportPdf() {
    const { default: jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.text("Shrandha Labs — Registrations", 14, 14);
    autoTable(doc, {
      startY: 20,
      head: [["Student ID", "Name", "Email", "Phone", "Course", "College", "Status"]],
      body: filtered.map((s) => [s.studentId, s.name, s.email, s.phone, s.course, s.college, s.status]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [55, 211, 224] },
    });
    doc.save(`shrandha-labs-registrations-${Date.now()}.pdf`);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-semibold text-3xl">Admin Dashboard</h1>
          <p className="text-sm text-muted mt-1">Manage internship registrations</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard/curriculum" className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2.5 text-sm hover:border-cyan/40 focus-ring">
            <BookOpen className="w-4 h-4" /> Weekly Curriculum
          </Link>
          <button onClick={loadStudents} className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2.5 text-sm hover:border-cyan/40 focus-ring">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2.5 text-sm hover:border-coral/50 focus-ring">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid sm:grid-cols-3 gap-5">
        <div className="rounded-2xl glass p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-cyan/10 flex items-center justify-center"><Users className="w-5 h-5 text-cyan" /></div>
          <div><p className="text-2xl font-display font-semibold">{students.length}</p><p className="text-xs text-muted">Total Registrations</p></div>
        </div>
        <div className="rounded-2xl glass p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-amber/10 flex items-center justify-center"><CalendarCheck className="w-5 h-5 text-amber" /></div>
          <div><p className="text-2xl font-display font-semibold">{todayCount}</p><p className="text-xs text-muted">Today&apos;s Registrations</p></div>
        </div>
        <div className="rounded-2xl glass p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-coral/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-coral" /></div>
          <div><p className="text-2xl font-display font-semibold">{courses.length - 1}</p><p className="text-xs text-muted">Active Courses</p></div>
        </div>
      </div>

      {/* Course-wise breakdown */}
      {courseWise.length > 0 && (
        <div className="mt-6 rounded-2xl glass p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-slate mb-4">Course-wise Registrations</p>
          <div className="space-y-2.5">
            {courseWise.map(([course, count]) => (
              <div key={course} className="flex items-center gap-3">
                <span className="text-sm w-48 truncate">{course}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan to-amber" style={{ width: `${(count / students.length) * 100}%` }} />
                </div>
                <span className="text-xs text-muted w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-white/5 px-3.5 py-2.5 flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, phone, ID…"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
        <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none">
          {courses.map((c) => <option key={c} value={c} className="bg-surface">{c}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none">
          {["All", "Pending", "Approved", "Rejected"].map((s) => <option key={s} value={s} className="bg-surface">{s}</option>)}
        </select>
        <button onClick={exportExcel} className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2.5 text-sm hover:border-cyan/40 focus-ring">
          <FileSpreadsheet className="w-4 h-4" /> Export Excel
        </button>
        <button onClick={exportPdf} className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2.5 text-sm hover:border-cyan/40 focus-ring">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 rounded-2xl glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-widest text-slate font-mono">
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">College</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Resume</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Certificate</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-muted"><LoaderCircle className="w-5 h-5 animate-spin mx-auto" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-muted">No registrations found.</td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.studentId} className="border-b border-line/60 hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-muted">{s.email}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{s.course}</td>
                    <td className="px-4 py-3 text-muted">{s.college}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full ${
                        s.status === "Approved" ? "bg-cyan/10 text-cyan" :
                        s.status === "Rejected" ? "bg-coral/10 text-coral" : "bg-amber/10 text-amber"
                      }`}>{s.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      {s.resumeLink ? <a href={s.resumeLink} target="_blank" rel="noopener noreferrer" className="text-cyan text-xs hover:underline">View</a> : <span className="text-xs text-muted">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {s.paymentScreenshot ? <a href={s.paymentScreenshot} target="_blank" rel="noopener noreferrer" className="text-cyan text-xs hover:underline">View</a> : <span className="text-xs text-muted">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {s.certificateId ? (
                        <button
                          onClick={() => setCertModal(s)}
                          className="inline-flex items-center gap-1 text-xs text-cyan hover:underline font-mono"
                          title={s.certificateId}
                        >
                          <Award className="w-3.5 h-3.5 shrink-0" /> {s.certificateId}
                        </button>
                      ) : s.status === "Approved" ? (
                        <button
                          onClick={() => setCertModal(s)}
                          className="text-xs text-amber hover:underline"
                        >
                          Issue Certificate
                        </button>
                      ) : (
                        <span className="text-xs text-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button disabled={busyId === s.studentId} onClick={() => updateStatus(s, "Approved")} title="Approve" className="p-1.5 rounded-lg hover:bg-cyan/10 text-cyan focus-ring disabled:opacity-40"><Check className="w-4 h-4" /></button>
                        <button disabled={busyId === s.studentId} onClick={() => updateStatus(s, "Rejected")} title="Reject" className="p-1.5 rounded-lg hover:bg-coral/10 text-coral focus-ring disabled:opacity-40"><Ban className="w-4 h-4" /></button>
                        <button onClick={() => setEditing(s)} title="Edit" className="p-1.5 rounded-lg hover:bg-white/10 text-slate focus-ring"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => setConfirmDelete(s)} title="Delete" className="p-1.5 rounded-lg hover:bg-coral/10 text-coral focus-ring"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-md rounded-2xl glass p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-semibold text-lg">Edit Student</h3>
              <button onClick={() => setEditing(null)} className="p-1 rounded-lg hover:bg-white/10 focus-ring"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {(["name", "email", "phone", "course", "college", "remarks"] as const).map((field) => (
                <div key={field}>
                  <label className="text-xs text-muted font-mono uppercase tracking-widest">{field}</label>
                  <input
                    value={editing[field] || ""}
                    onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => editing && saveEdit(editing)}
              disabled={busyId === editing.studentId}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-base px-6 py-3 text-sm font-medium hover:bg-cyan transition-colors disabled:opacity-60"
            >
              {busyId === editing.studentId && <LoaderCircle className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setConfirmDelete(null)}>
          <div className="w-full max-w-sm rounded-2xl glass p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display font-semibold text-lg">Delete registration?</h3>
            <p className="text-sm text-muted mt-2">This will permanently remove <span className="text-ink">{confirmDelete.name}</span> from the sheet. This can&apos;t be undone.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 rounded-full glass px-4 py-2.5 text-sm">Cancel</button>
              <button
                onClick={() => deleteStudent(confirmDelete)}
                disabled={busyId === confirmDelete.studentId}
                className="flex-1 rounded-full bg-coral text-base px-4 py-2.5 text-sm font-medium disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate generation modal */}
      {certModal && (
        <CertificateModal
          student={certModal}
          generating={generatingCert}
          onClose={() => setCertModal(null)}
          onGenerate={generateCertificatePdf}
        />
      )}
    </div>
  );
}

function CertificateModal({
  student,
  generating,
  onClose,
  onGenerate,
}: {
  student: Student;
  generating: boolean;
  onClose: () => void;
  onGenerate: (student: Student, name: string, domain: string, duration: string) => void;
}) {
  const [name, setName] = useState(student.name);
  const [domain, setDomain] = useState(student.course);
  const [duration, setDuration] = useState("12 Weeks");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl glass p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display font-semibold text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-amber" />
            {student.certificateId ? "Download Certificate" : "Issue Certificate"}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 focus-ring"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-xs text-muted mb-5">
          {student.certificateId
            ? "Certificate ID and issue date are already fixed — everything else is filled in below."
            : "Certificate ID and issue date are generated automatically. Just confirm the details below."}
        </p>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted font-mono uppercase tracking-widest">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted font-mono uppercase tracking-widest">Internship Domain</label>
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted font-mono uppercase tracking-widest">Duration</label>
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50"
            />
          </div>
        </div>

        <button
          onClick={() => onGenerate(student, name, domain, duration)}
          disabled={generating || !name || !domain || !duration}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-base px-6 py-3 text-sm font-medium hover:bg-cyan transition-colors disabled:opacity-60"
        >
          {generating ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {generating ? "Generating…" : student.certificateId ? "Download PDF" : "Issue & Download PDF"}
        </button>
      </div>
    </div>
  );
}
