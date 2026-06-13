// ======================
// AUTH CHECK
// ======================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href =
        "../../Login/login.html";
}

// ======================
// GET CASE ID
// ======================

const params =
    new URLSearchParams(
        window.location.search
    );

const caseId =
    params.get("id");

if (!caseId) {
    alert("Case ID not found");
    window.location.href =
        "../Cases/case.html";
}

// ======================
// LOAD USER DATA
// ======================

function loadUserInfo() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    if (!user) return;

    const userName =
        document.getElementById(
            "userName"
        );

    const userRole =
        document.getElementById(
            "userRole"
        );

    const userAvatar =
        document.getElementById(
            "userAvatar"
        );

    if (userName) {
        userName.textContent =
            user.fullName ||
            user.name ||
            "User";
    }

    if (userRole) {
        userRole.textContent =
            user.role || "User";
    }

    if (
        userAvatar &&
        (
            user.profilePicture ||
            user.profileImage
        )
    ) {
        userAvatar.src =
            user.profilePicture ||
            user.profileImage;
    }
}

// ======================
// LOAD CASE
// ======================

async function loadCase() {

    try {

        const response =
            await fetch(
                `https://apex-legal-1.onrender.com/api/cases/${caseId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (!response.ok) {
            throw new Error(
                data.message
            );
        }

        const legalCase =
            data.legalCase ||
            data.case ||
            data;

        document.getElementById(
            "caseTitle"
        ).textContent =
            legalCase.title ||
            "Untitled Case";

        document.getElementById(
            "caseNumber"
        ).textContent =
            legalCase.caseNumber ||
            "-";

        document.getElementById(
            "clientName"
        ).textContent =
            legalCase.client?.fullName ||
            "No Client";

        document.getElementById(
            "caseStatus"
        ).textContent =
            legalCase.status ||
            "-";

        document.getElementById(
            "caseType"
        ).textContent =
            legalCase.caseType ||
            "-";

        document.getElementById(
            "casePriority"
        ).textContent =
            legalCase.priority ||
            "-";

        document.getElementById(
            "courtName"
        ).textContent =
            legalCase.courtName ||
            "-";

        document.getElementById(
            "hearingDate"
        ).textContent =
            legalCase.hearingDate
                ? new Date(
                    legalCase.hearingDate
                  ).toLocaleDateString()
                : "Not Scheduled";

        document.getElementById(
            "caseDescription"
        ).textContent =
            legalCase.description ||
            "No description available";

        loadDocuments(
            legalCase.documents || []
        );

        loadNotes(
            legalCase.notes || []
        );

    } catch (error) {

        console.error(error);

        alert(
            error.message ||
            "Failed to load case"
        );
    }
}

// ======================
// DOCUMENTS
// ======================

// ======================
// LOAD DOCUMENTS
// ======================

async function loadDocuments() {

    try {

        const response =
            await fetch(
                `https://apex-legal-1.onrender.com/api/documents/case/${caseId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        console.log(
            "DOCUMENT RESPONSE:",
            data
        );

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load documents"
            );
        }

        const documents =

            Array.isArray(data)
                ? data
                : data.documents ||
                  data.data ||
                  data.docs ||
                  data.results ||
                  [];

        console.log(
            "DOCUMENTS:",
            documents
        );

        const container =
            document.getElementById(
                "documentsList"
            );

        if (!container) return;

        if (!documents.length) {

            container.innerHTML = `
                <p>
                    No documents uploaded yet.
                </p>
            `;

            return;
        }

        container.innerHTML = "";

        documents.forEach(doc => {

            container.innerHTML += `
                <div class="document-card">

                    <div class="document-info">

                        <h4>
                            ${
                                doc.fileName ||
                                "Unnamed Document"
                            }
                        </h4>

                        <p>
                            Category:
                            ${
                                doc.category ||
                                "-"
                            }
                        </p>

                        <small>
                            Tag:
                            ${
                                doc.tag ||
                                "-"
                            }
                        </small>

                    </div>

                    <div class="document-actions">

                        <a
                            href="${doc.fileUrl}"
                            target="_blank"
                            class="download-btn"
                        >
                            View
                        </a>

                    </div>

                </div>
            `;
        });

    } catch (error) {

        console.error(
            "Document Load Error:",
            error
        );

        const container =
            document.getElementById(
                "documentsList"
            );

        if (container) {

            container.innerHTML = `
                <p>
                    Failed to load documents.
                </p>
            `;
        }
    }
}
// ======================
// NOTES
// ======================

function loadNotes(notes) {

    const container =
        document.getElementById(
            "notesContainer"
        );

    if (!container) return;

    if (!notes.length) {

        container.innerHTML =
            "<p>No notes added.</p>";

        return;
    }

    container.innerHTML = "";

    notes.forEach(note => {

        container.innerHTML += `
            <div class="note-card">

                <p>
                    ${note.body}
                </p>

                <small>
                    ${
                        new Date(
                            note.createdAt
                        ).toLocaleString()
                    }
                </small>

            </div>
        `;
    });
}

// ======================
// UPLOAD DOCUMENT
// ======================

const uploadBtn =
    document.getElementById(
        "uploadDocumentBtn"
    );

const documentFile =
    document.getElementById(
        "documentFile"
    );

const documentCategory =
    document.getElementById(
        "documentCategory"
    );

const documentTag =
    document.getElementById(
        "documentTag"
    );

if (uploadBtn && documentFile) {

    uploadBtn.addEventListener(
        "click",
        () => {
            documentFile.click();
        }
    );

    documentFile.addEventListener(
        "change",
        async () => {

            const file =
                documentFile.files[0];

            if (!file) return;

            const category =
                documentCategory.value;

            const tag =
                documentTag.value.trim();

            if (!category) {
                alert(
                    "Please select a document category"
                );

                documentFile.value = "";

                return;
            }

            if (!tag) {
                alert(
                    "Please enter a document tag"
                );

                documentFile.value = "";

                return;
            }

            try {

                uploadBtn.disabled = true;

                uploadBtn.textContent =
                    "Uploading...";

                const formData =
                    new FormData();

                formData.append(
                    "evidence",
                    file
                );

                formData.append(
                    "caseId",
                    caseId
                );

                formData.append(
                    "category",
                    category
                );

                formData.append(
                    "tag",
                    tag
                );

                const response =
                    await fetch(
                        "https://apex-legal-1.onrender.com/api/documents/upload",
                        {
                            method: "POST",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            },

                            body: formData
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Upload failed"
                    );
                }

                alert(
                    "Document uploaded successfully"
                );

                documentFile.value = "";

                documentTag.value = "";

                documentCategory.value = "";

                loadCase();

            } catch (error) {

                console.error(error);

                alert(
                    error.message ||
                    "Upload failed"
                );

            } finally {

                uploadBtn.disabled = false;

                uploadBtn.textContent =
                    "Upload Document";
            }
        }
    );
}

// ======================
// SAVE NOTE
// ======================

const saveNoteBtn =
    document.getElementById(
        "saveNoteBtn"
    );

if (saveNoteBtn) {

    saveNoteBtn.addEventListener(
        "click",
        async () => {

            const note =
                document
                    .getElementById(
                        "newNote"
                    )
                    .value
                    .trim();

            if (!note) {
                return;
            }

            try {

                const response =
                    await fetch(
                        `https://apex-legal-1.onrender.com/api/cases/${caseId}/notes`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`
                            },

                            body:
                                JSON.stringify({
                                    body: note
                                })
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message
                    );
                }

                document.getElementById(
                    "newNote"
                ).value = "";

                loadCase();

            } catch (error) {

                alert(
                    error.message
                );
            }
        }
    );
}


// ======================
// CREATE HEARING
// ======================

const saveHearingBtn =
    document.getElementById(
        "saveHearingBtn"
    );

if (saveHearingBtn) {

    saveHearingBtn.addEventListener(
        "click",
        async () => {

            const originalText =
                saveHearingBtn.textContent;

            try {

                const title =
                    document.getElementById(
                        "hearingTitle"
                    ).value.trim();

                const hearingDate =
                    document.getElementById(
                        "hearingDateInput"
                    ).value;

                const courtName =
                    document.getElementById(
                        "hearingCourt"
                    ).value.trim();

                const courtroom =
                    document.getElementById(
                        "hearingCourtroom"
                    ).value.trim();

                const judge =
                    document.getElementById(
                        "hearingJudge"
                    ).value.trim();

                if (
                    !title ||
                    !hearingDate ||
                    !courtName
                ) {

                    alert(
                        "Title, hearing date and court name are required."
                    );

                    return;
                }

                saveHearingBtn.disabled =
                    true;

                saveHearingBtn.textContent =
                    "Saving...";

                const response =
                    await fetch(
                        "https://apex-legal-1.onrender.com/api/hearings/create",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`
                            },

                            body:
                                JSON.stringify({
                                    caseId,
                                    title,
                                    hearingDate,
                                    courtName,
                                    courtroom,
                                    judge
                                })
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to create hearing"
                    );
                }

                alert(
                    "Hearing scheduled successfully"
                );

                document.getElementById(
                    "hearingTitle"
                ).value = "";

                document.getElementById(
                    "hearingDateInput"
                ).value = "";

                document.getElementById(
                    "hearingCourt"
                ).value = "";

                document.getElementById(
                    "hearingCourtroom"
                ).value = "";

                document.getElementById(
                    "hearingJudge"
                ).value = "";

                if (hearingForm) {
                    hearingForm.classList.remove(
                        "show"
                    );
                }

                if (
                    typeof loadHearings ===
                    "function"
                ) {
                    loadHearings();
                }

            } catch (error) {

                console.error(error);

                alert(
                    error.message
                );

            } finally {

                saveHearingBtn.disabled =
                    false;

                saveHearingBtn.textContent =
                    originalText;
            }
        }
    );
}

// ======================
// TOGGLE HEARING FORM
// ======================

const hearingBtn =
    document.getElementById(
        "createHearingBtn"
    );

const hearingForm =
    document.getElementById(
        "hearingForm"
    );

if (
    hearingBtn &&
    hearingForm
) {

    hearingBtn.addEventListener(
        "click",
        () => {

            hearingForm.classList.toggle(
                "show"
            );
        }
    );
}
// ======================
// LOAD HEARINGS
// ======================

async function loadHearings() {

    try {

        const response =
            await fetch(
                `https://apex-legal-1.onrender.com/api/hearings/case/${caseId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load hearings"
            );
        }

        const hearings =
            data.hearings || [];

        const container =
            document.getElementById(
                "hearingsContainer"
            );

        if (!container) return;

        if (!hearings.length) {

            container.innerHTML = `
                <p>No hearings scheduled.</p>
            `;

            return;
        }

        container.innerHTML = "";

        hearings.forEach(hearing => {

            container.innerHTML += `
                <div class="hearing-card">

                    <div class="hearing-left">

                        <h4>
                            ${hearing.title}
                        </h4>

                        <div class="hearing-date">
                            ${new Date(
                                hearing.hearingDate
                            ).toLocaleDateString()}
                        </div>

                    </div>

                    <div class="hearing-right">

                        <div class="hearing-court">
                            ${hearing.courtName}
                        </div>

                        <div class="hearing-room">
                            ${
                                hearing.courtroom ||
                                "No courtroom assigned"
                            }
                        </div>

                    </div>

                </div>
            `;
        });

    } catch (error) {

        console.error(
            "Load Hearings Error:",
            error
        );
    }
}
// ======================
// INIT
// ======================

loadUserInfo();
loadCase();
loadDocuments();
loadHearings()