/**
 * Shrandha Labs — Google Apps Script Backend
 * ---------------------------------------------------------------
 * Acts as the entire backend API for the site. Deploy this as a
 * Web App (Execute as: Me, Who has access: Anyone). The deployed
 * /exec URL is what you put into:
 *   - NEXT_PUBLIC_APPS_SCRIPT_URL   (used by the public register page)
 *   - APPS_SCRIPT_URL               (used by the admin API proxy)
 *
 * See README.md / DEPLOYMENT.md in the project root for full setup steps.
 * ---------------------------------------------------------------
 */

// ====================== CONFIG ======================
const SHEET_NAME = "Registrations";
const DRIVE_FOLDER_NAME = "Shrandha Labs — Registrations";

// Set this in Project Settings > Script Properties as API_SECRET.
// The Next.js admin API sends this on every list/update/delete call,
// so random people can't hit your admin endpoints even though the
// web app URL itself is public.
function getApiSecret() {
  return PropertiesService.getScriptProperties().getProperty("API_SECRET");
}

// Set these in Script Properties too: ADMIN_NOTIFY_EMAIL
function getAdminNotifyEmail() {
  return PropertiesService.getScriptProperties().getProperty("ADMIN_NOTIFY_EMAIL") || Session.getEffectiveUser().getEmail();
}

const COLUMNS = [
  "Timestamp", "Student ID", "Name", "Email", "Phone", "Course", "College",
  "Degree", "Department", "Year", "City", "State", "LinkedIn", "GitHub",
  "Resume Link", "Payment Screenshot", "Status", "Remarks",
  "Certificate ID", "Certificate Issued Date", "Batch",
];

const BATCH_SHEET_NAME = "Batches";
const BATCH_COLUMNS = ["Batch ID", "Batch Name", "Domain", "Created Date"];

function getBatchSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(BATCH_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(BATCH_SHEET_NAME);
    sheet.appendRow(BATCH_COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Admin action — creates a new batch for a domain. Batch ID is just a
// readable slug + running count, e.g. BATCH-DEVOPS-01.
function createBatch(name, domain) {
  if (!name || !domain) throw new Error("Batch name and domain are required.");
  const sheet = getBatchSheet();
  const existingForDomain = listBatches().filter(
    (b) => b.domain.trim().toLowerCase() === domain.trim().toLowerCase()
  );
  const slug = domain.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const batchId = "BATCH-" + slug + "-" + String(existingForDomain.length + 1).padStart(2, "0");

  sheet.appendRow([batchId, name, domain, new Date()]);
  return { batchId: batchId, name: name, domain: domain };
}

function listBatches() {
  const sheet = getBatchSheet();
  const data = sheet.getDataRange().getValues();
  return data
    .slice(1)
    .filter((r) => r[0])
    .map((r) => ({
      batchId: r[0],
      name: r[1],
      domain: r[2],
      createdDate: r[3] instanceof Date ? r[3].toISOString() : String(r[3]),
    }))
    .reverse(); // newest first
}

// Used at registration time — a domain's "current" batch is simply the most
// recently created one for that domain. If none exists yet, new
// registrations for that domain are left unassigned rather than blocked.
function findCurrentBatchForDomain(domain) {
  if (!domain) return null;
  const matches = listBatches().filter(
    (b) => b.domain.trim().toLowerCase() === domain.trim().toLowerCase()
  );
  return matches.length > 0 ? matches[0] : null; // listBatches() is already newest-first
}

// ====================== ENTRY POINTS ======================

function doGet(e) {
  try {
    const action = e.parameter.action;
    if (action === "list") {
      requireSecret(e.parameter.secret);
      return jsonResponse({ students: listStudents() });
    }
    if (action === "curriculum") {
      requireSecret(e.parameter.secret);
      return jsonResponse({ domains: listCurriculumFiles() });
    }
    if (action === "verifyCertificate") {
      // Public — no secret required, same as a physical certificate anyone can check.
      return jsonResponse(verifyCertificate(e.parameter.certificateId));
    }
    if (action === "listBatches") {
      requireSecret(e.parameter.secret);
      return jsonResponse({ batches: listBatches() });
    }
    return jsonResponse({ error: "Unknown or missing action." });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

// ====================== WEEKLY CURRICULUM LIBRARY ======================
// Admin uploads weekly PDFs directly into Drive, organized as:
//   "Shrandha Labs — Weekly Curriculum" (root, auto-created)
//     └── "<Domain Name>" (one subfolder per track, e.g. "DevOps")
//           └── "Week 1.pdf", "Week 2.pdf", ... "Week 12.pdf"
// This scans that structure and returns file URLs keyed by domain name and
// week number, so nothing needs to be hardcoded in the website itself —
// upload a file, it shows up in the admin panel automatically.

const CURRICULUM_ROOT_FOLDER_NAME = "Shrandha Labs — Weekly Curriculum";

function getOrCreateCurriculumRootFolder() {
  const props = PropertiesService.getScriptProperties();
  const cachedId = props.getProperty("CURRICULUM_ROOT_FOLDER_ID");
  if (cachedId) {
    try {
      return DriveApp.getFolderById(cachedId);
    } catch (e) {
      // Fall through and recreate.
    }
  }
  const folders = DriveApp.getFoldersByName(CURRICULUM_ROOT_FOLDER_NAME);
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(CURRICULUM_ROOT_FOLDER_NAME);
  props.setProperty("CURRICULUM_ROOT_FOLDER_ID", folder.getId());
  return folder;
}

function listCurriculumFiles() {
  const root = getOrCreateCurriculumRootFolder();
  const domains = {};

  const domainFolders = root.getFolders();
  while (domainFolders.hasNext()) {
    const domainFolder = domainFolders.next();
    const domainName = domainFolder.getName();
    const weeks = {};

    const files = domainFolder.getFilesByType(MimeType.PDF);
    while (files.hasNext()) {
      const file = files.next();
      const match = file.getName().match(/week\s*(\d+)/i);
      if (match) {
        const weekNum = parseInt(match[1], 10);
        weeks[weekNum] = {
          url: file.getUrl(),
          fileName: file.getName(),
        };
      }
    }

    domains[domainName] = weeks;
  }

  return domains;
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;

    if (action === "register") {
      // Public endpoint — no secret required, this is the registration form.
      const studentId = registerStudent(body);
      return jsonResponse({ ok: true, studentId: studentId });
    }

    // Everything else is an admin action and requires the shared secret.
    requireSecret(body.secret);

    if (action === "updateStatus") {
      updateStudentField(body.studentId, "Status", body.status);
      return jsonResponse({ ok: true });
    }
    if (action === "edit") {
      applyEdits(body.studentId, body.updates);
      return jsonResponse({ ok: true });
    }
    if (action === "delete") {
      deleteStudent(body.studentId);
      return jsonResponse({ ok: true });
    }
    if (action === "issueCertificate") {
      const certificateId = issueCertificate(body.studentId);
      return jsonResponse({ ok: true, certificateId: certificateId });
    }
    if (action === "createBatch") {
      const batch = createBatch(body.name, body.domain);
      return jsonResponse({ ok: true, batch: batch });
    }

    return jsonResponse({ error: "Unknown action." });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function requireSecret(secret) {
  const expected = getApiSecret();
  if (!expected || secret !== expected) {
    throw new Error("Unauthorized: invalid or missing API secret.");
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ====================== SHEET HELPERS ======================

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function listStudents() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1); // drop header
  return rows
    .filter((r) => r[1]) // has a Student ID
    .map((r) => ({
      timestamp: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
      studentId: r[1],
      name: r[2],
      email: r[3],
      phone: r[4],
      course: r[5],
      college: r[6],
      degree: r[7],
      department: r[8],
      year: r[9],
      city: r[10],
      state: r[11],
      linkedin: r[12],
      github: r[13],
      resumeLink: r[14],
      paymentScreenshot: r[15],
      status: r[16] || "Pending",
      remarks: r[17] || "",
      certificateId: r[18] || "",
      certificateIssuedDate: r[19] instanceof Date ? r[19].toISOString() : (r[19] || ""),
      batch: r[20] || "",
    }))
    .reverse(); // newest first
}

function findRowByStudentId(sheet, studentId) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === studentId) return i + 1; // 1-indexed sheet row
  }
  return -1;
}

function updateStudentField(studentId, columnName, value) {
  const sheet = getSheet();
  const row = findRowByStudentId(sheet, studentId);
  if (row === -1) throw new Error("Student not found.");
  const col = COLUMNS.indexOf(columnName) + 1;
  sheet.getRange(row, col).setValue(value);
}

function applyEdits(studentId, updates) {
  const sheet = getSheet();
  const row = findRowByStudentId(sheet, studentId);
  if (row === -1) throw new Error("Student not found.");

  const fieldToColumn = {
    name: "Name", email: "Email", phone: "Phone", course: "Course",
    college: "College", degree: "Degree", department: "Department", year: "Year",
    city: "City", state: "State", linkedin: "LinkedIn", github: "GitHub",
    status: "Status", remarks: "Remarks", batch: "Batch",
  };
  Object.keys(updates || {}).forEach((key) => {
    const colName = fieldToColumn[key];
    if (colName) {
      const col = COLUMNS.indexOf(colName) + 1;
      sheet.getRange(row, col).setValue(updates[key]);
    }
  });
}

function deleteStudent(studentId) {
  const sheet = getSheet();
  const row = findRowByStudentId(sheet, studentId);
  if (row === -1) throw new Error("Student not found.");
  sheet.deleteRow(row);
}

// ====================== CERTIFICATES ======================

// Admin action — generates a unique Certificate ID and stamps the issue
// date on the student's row. Format: SL-INT-<year>-<4-digit sequence>,
// matching the sample certificate design.
function issueCertificate(studentId) {
  const sheet = getSheet();
  const row = findRowByStudentId(sheet, studentId);
  if (row === -1) throw new Error("Student not found.");

  const idCol = COLUMNS.indexOf("Certificate ID") + 1;
  const dateCol = COLUMNS.indexOf("Certificate Issued Date") + 1;

  const existing = sheet.getRange(row, idCol).getValue();
  if (existing) {
    return existing; // already issued — don't generate a new one
  }

  const year = new Date().getFullYear();
  // Use the row number as a simple, always-unique sequence.
  const certificateId = "SL-INT-" + year + "-" + String(row).padStart(4, "0");

  sheet.getRange(row, idCol).setValue(certificateId);
  sheet.getRange(row, dateCol).setValue(new Date());

  return certificateId;
}

// Public lookup — used by the /verify-certificate page. Deliberately returns
// ONLY the fields needed to confirm a certificate is genuine (name, course,
// issue date). Never returns email, phone, college, or anything else private,
// and requires no secret since it's meant to be checked by anyone with a
// Certificate ID, the same way a physical certificate can be verified by
// anyone who has it in hand.
function verifyCertificate(certificateId) {
  if (!certificateId) return { valid: false };

  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const idCol = COLUMNS.indexOf("Certificate ID");
  const dateCol = COLUMNS.indexOf("Certificate Issued Date");

  const needle = String(certificateId).trim().toUpperCase();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (String(row[idCol]).trim().toUpperCase() === needle && needle !== "") {
      return {
        valid: true,
        name: row[2],
        course: row[5],
        certificateId: row[idCol],
        issuedDate: row[dateCol] instanceof Date ? row[dateCol].toISOString() : row[dateCol],
      };
    }
  }

  return { valid: false };
}

// ====================== REGISTRATION ======================

// Folder lookups by name (DriveApp.getFoldersByName) scan the whole Drive and
// get slower over time. We cache the resolved folder IDs in Script Properties
// after the first run so every later registration skips straight to the ID —
// this is the single biggest win for cutting registration time.
function getOrCreateFolder() {
  const props = PropertiesService.getScriptProperties();
  const cachedId = props.getProperty("ROOT_FOLDER_ID");
  if (cachedId) {
    try {
      return DriveApp.getFolderById(cachedId);
    } catch (e) {
      // Folder was deleted/moved — fall through and recreate.
    }
  }
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(DRIVE_FOLDER_NAME);
  props.setProperty("ROOT_FOLDER_ID", folder.getId());
  return folder;
}

function getOrCreateSubfolder(root, subfolderName) {
  const props = PropertiesService.getScriptProperties();
  const key = "SUBFOLDER_ID_" + subfolderName;
  const cachedId = props.getProperty(key);
  if (cachedId) {
    try {
      return DriveApp.getFolderById(cachedId);
    } catch (e) {
      // Fall through and recreate.
    }
  }
  const subs = root.getFoldersByName(subfolderName);
  const sub = subs.hasNext() ? subs.next() : root.createFolder(subfolderName);
  props.setProperty(key, sub.getId());
  return sub;
}

function saveFileToDrive(base64, fileName, mimeType, subfolderName) {
  if (!base64) return "";
  const root = getOrCreateFolder();
  const sub = getOrCreateSubfolder(root, subfolderName);

  const bytes = Utilities.base64Decode(base64);
  const blob = Utilities.newBlob(bytes, mimeType || "application/octet-stream", fileName || "file");
  const file = sub.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function generateStudentId(sheet) {
  const year = new Date().getFullYear();
  const count = sheet.getLastRow(); // includes header, so this is a safe running counter
  return "SL" + year + "-" + String(count).padStart(4, "0");
}

function registerStudent(body) {
  const sheet = getSheet();

  const resumeLink = saveFileToDrive(body.resumeBase64, body.resumeFileName, body.resumeMimeType, "Resumes");
  const paymentLink = saveFileToDrive(body.paymentBase64, body.paymentFileName, body.paymentMimeType, "Payment Screenshots");

  const studentId = generateStudentId(sheet);

  // Auto-assign to whichever batch is currently the newest one created for
  // this domain. If no batch has been created yet for this domain, the
  // student is simply left unassigned rather than blocking registration —
  // an admin can create the batch later and reassign manually if needed.
  const currentBatch = findCurrentBatchForDomain(body.course);
  const batchLabel = currentBatch ? currentBatch.name : "";

  sheet.appendRow([
    new Date(), studentId, body.name, body.email, body.phone, body.course, body.college,
    body.degree, body.department, body.year, body.city, body.state,
    body.linkedin || "", body.github || "",
    resumeLink, paymentLink, "Pending", "",
    "", "", batchLabel,
  ]);

  sendRegistrationEmails(body, studentId);
  return studentId;
}

// ====================== EMAIL ======================

// The address registration emails are sent FROM. This must already be a
// verified "Send mail as" alias on the Google account this script is
// deployed under (Gmail → Settings → Accounts → Send mail as) — otherwise
// GmailApp silently falls back to the account's primary address.
const SEND_FROM_EMAIL = "admin@shrandhalabs.com";
const SEND_FROM_NAME = "Shrandha Labs";

// Publicly reachable logo URL — update this if you move off the .vercel.app
// domain onto your own domain later.
const LOGO_URL = "https://shrandhalabs.com/images/logo.png";
const SITE_URL = "https://shrandhalabs.com";

// Shared wrapper so every email looks consistent — dark header with logo,
// white content area, and a signed-off footer with contact links.
function emailShell(bodyHtml) {
  return (
    '<div style="background:#07070A;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">' +
      '<table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#0D0D12;border-radius:16px;overflow:hidden;border:1px solid #232329;">' +
        '<tr><td style="padding:28px 32px;background:#000000;text-align:center;">' +
          '<img src="' + LOGO_URL + '" alt="Shrandha Labs" width="56" height="56" style="display:block;margin:0 auto;border-radius:10px;" />' +
          '<p style="color:#9A9AA6;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:12px 0 0;">Learn. Build. Achieve.</p>' +
        '</td></tr>' +
        '<tr><td style="padding:32px;color:#F4F4F6;font-size:15px;line-height:1.6;">' +
          bodyHtml +
          '<p style="margin-top:32px;color:#F4F4F6;">Regards,<br/>' +
          '<b>Team Shrandha Labs</b><br/>' +
          '<span style="color:#9A9AA6;font-size:13px;">Learn. Build. Achieve.</span></p>' +
        '</td></tr>' +
        '<tr><td style="padding:20px 32px;background:#000000;border-top:1px solid #232329;">' +
          '<p style="color:#6b6b74;font-size:12px;margin:0;text-align:center;">' +
            '<a href="' + SITE_URL + '" style="color:#37D3E0;text-decoration:none;">shrandhalabs.com</a> &nbsp;·&nbsp; ' +
            '<a href="mailto:admin@shrandhalabs.com" style="color:#37D3E0;text-decoration:none;">admin@shrandhalabs.com</a>' +
          '</p>' +
        '</td></tr>' +
      '</table>' +
    '</div>'
  );
}

function sendRegistrationEmails(body, studentId) {
  try {
    const studentBody =
      '<p>Hi ' + escapeHtml(body.name) + ',</p>' +
      '<p>Thanks for registering for the <b style="color:#37D3E0;">' + escapeHtml(body.course) + '</b> internship track at Shrandha Labs.</p>' +
      '<table role="presentation" width="100%" style="margin:20px 0;background:#15151b;border-radius:10px;border:1px solid #232329;">' +
        '<tr><td style="padding:16px 20px;">' +
          '<p style="margin:0;color:#9A9AA6;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Student ID</p>' +
          '<p style="margin:4px 0 0;color:#F5A623;font-size:20px;font-weight:bold;">' + studentId + '</p>' +
        '</td></tr>' +
      '</table>' +
      '<p>Our team will verify your payment and confirm your seat shortly. You\'ll hear from us over email once your registration is approved.</p>';

    GmailApp.sendEmail(
      body.email,
      "Shrandha Labs — Registration Received (" + studentId + ")",
      "",
      {
        from: SEND_FROM_EMAIL,
        name: SEND_FROM_NAME,
        htmlBody: emailShell(studentBody),
      }
    );
  } catch (e) {
    // Don't fail registration if the confirmation email fails to send —
    // but DO log it so it's visible in Executions instead of vanishing silently.
    Logger.log("Student confirmation email failed: " + e.message);
  }

  try {
    const detailRow = function (label, value) {
      return '<tr>' +
        '<td style="padding:8px 0;color:#9A9AA6;font-size:13px;width:120px;border-bottom:1px solid #232329;">' + label + '</td>' +
        '<td style="padding:8px 0;color:#F4F4F6;font-size:13px;border-bottom:1px solid #232329;">' + escapeHtml(value) + '</td>' +
      '</tr>';
    };

    const adminBody =
      '<p>New registration received on the site.</p>' +
      '<table role="presentation" width="100%" style="margin:16px 0;">' +
        detailRow("Student ID", studentId) +
        detailRow("Name", body.name) +
        detailRow("Email", body.email) +
        detailRow("Phone", body.phone) +
        detailRow("Course", body.course) +
        detailRow("College", body.college) +
      '</table>' +
      '<p>Open the admin dashboard to review, approve, and manage this registration.</p>';

    GmailApp.sendEmail(
      getAdminNotifyEmail(),
      "New Registration — " + body.name + " (" + studentId + ")",
      "",
      {
        from: SEND_FROM_EMAIL,
        name: SEND_FROM_NAME,
        htmlBody: emailShell(adminBody),
      }
    );
  } catch (e) {
    Logger.log("Admin notification email failed: " + e.message);
  }
}

// Run this once manually from the Apps Script editor (select it in the
// function dropdown, click Run) to force the Gmail-send permission
// consent screen to appear, and to confirm the "from" alias actually works.
function testSendEmail() {
  GmailApp.sendEmail(
    getAdminNotifyEmail(),
    "Shrandha Labs — test email",
    "",
    {
      from: SEND_FROM_EMAIL,
      name: SEND_FROM_NAME,
      htmlBody: "<p>This is a test email sent from " + SEND_FROM_EMAIL + ".</p>",
    }
  );
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
