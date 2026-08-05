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
];

// ====================== ENTRY POINTS ======================

function doGet(e) {
  try {
    const action = e.parameter.action;
    if (action === "list") {
      requireSecret(e.parameter.secret);
      return jsonResponse({ students: listStudents() });
    }
    return jsonResponse({ error: "Unknown or missing action." });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
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
    status: "Status", remarks: "Remarks",
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

// ====================== REGISTRATION ======================

function getOrCreateFolder() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

function saveFileToDrive(base64, fileName, mimeType, subfolderName) {
  if (!base64) return "";
  const root = getOrCreateFolder();
  let sub;
  const subs = root.getFoldersByName(subfolderName);
  sub = subs.hasNext() ? subs.next() : root.createFolder(subfolderName);

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

  sheet.appendRow([
    new Date(), studentId, body.name, body.email, body.phone, body.course, body.college,
    body.degree, body.department, body.year, body.city, body.state,
    body.linkedin || "", body.github || "",
    resumeLink, paymentLink, "Pending", "",
  ]);

  sendRegistrationEmails(body, studentId);
  return studentId;
}

// ====================== EMAIL ======================

function sendRegistrationEmails(body, studentId) {
  try {
    MailApp.sendEmail({
      to: body.email,
      subject: "Shrandha Labs — Registration Received (" + studentId + ")",
      htmlBody:
        "<p>Hi " + escapeHtml(body.name) + ",</p>" +
        "<p>Thanks for registering for the <b>" + escapeHtml(body.course) + "</b> internship track at Shrandha Labs.</p>" +
        "<p>Your Student ID is <b>" + studentId + "</b>. Our team will verify your payment and confirm your seat shortly.</p>" +
        "<p>— Shrandha Labs<br/>Learn. Build. Achieve.</p>",
    });
  } catch (e) {
    // Don't fail registration if the confirmation email fails to send.
  }

  try {
    MailApp.sendEmail({
      to: getAdminNotifyEmail(),
      subject: "New Registration — " + body.name + " (" + studentId + ")",
      htmlBody:
        "<p>New registration received.</p>" +
        "<ul>" +
        "<li>Student ID: " + studentId + "</li>" +
        "<li>Name: " + escapeHtml(body.name) + "</li>" +
        "<li>Email: " + escapeHtml(body.email) + "</li>" +
        "<li>Phone: " + escapeHtml(body.phone) + "</li>" +
        "<li>Course: " + escapeHtml(body.course) + "</li>" +
        "<li>College: " + escapeHtml(body.college) + "</li>" +
        "</ul>",
    });
  } catch (e) {
    // Non-fatal.
  }
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
