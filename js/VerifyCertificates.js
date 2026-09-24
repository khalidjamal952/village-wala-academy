/* =========================================
   CERTIFICATE VERIFICATION
========================================= */

const verifyCertificateBtn =
    document.getElementById("verifyCertificateBtn");

const certificateSearch =
    document.getElementById("certificateSearch");

const verificationResult =
    document.getElementById("verificationResult");


/* =========================================
   VERIFY CERTIFICATE
========================================= */

if (verifyCertificateBtn) {

    verifyCertificateBtn.addEventListener(
        "click",
        function () {

            const enteredId =
                certificateSearch.value
                    .trim()
                    .toUpperCase();

            if (!enteredId) {

                verificationResult.innerHTML = `
                    <div class="verification-error">

                        <h3>
                            ⚠️ Certificate ID Required
                        </h3>

                        <p>
                            Please enter a Certificate ID
                            to continue verification.
                        </p>

                    </div>
                `;

                return;
            }


            const purchasedCourses =
                JSON.parse(
                    localStorage.getItem("purchasedCourses")
                ) || [];


            let verifiedCourse = null;


            purchasedCourses.forEach(
                function (course) {

                    const savedCertificateId =
                        localStorage.getItem(
                            "certificate_" + course.id
                        );

                    if (
                        savedCertificateId &&
                        savedCertificateId
                            .toUpperCase() === enteredId
                    ) {

                        verifiedCourse = course;

                    }

                }
            );


            /* =========================================
               CERTIFICATE NOT FOUND
            ========================================== */

            if (!verifiedCourse) {

                verificationResult.innerHTML = `

                    <div class="verification-error">

                        <div class="verification-status-icon">
                            ❌
                        </div>

                        <h3>
                            Certificate Not Found
                        </h3>

                        <p>
                            We could not verify this
                            Certificate ID.
                        </p>

                        <small>
                            Please check the Certificate ID
                            and try again.
                        </small>

                    </div>

                `;

                return;
            }


            /* =========================================
               GET STUDENT PROFILE
            ========================================== */

            const profile =
                JSON.parse(
                    localStorage.getItem(
                        "studentProfile"
                    )
                ) || {};


            const studentName =
                profile.name || "Student";


            /* =========================================
               SUCCESS
            ========================================== */

            verificationResult.innerHTML = `

                <div class="verification-success">

                    <div class="verification-status-icon">
                        ✓
                    </div>

                    <h3>
                        Certificate Verified
                    </h3>

                    <p>
                        This certificate is successfully
                        verified in Village Wala Academy.
                    </p>


                    <div class="verification-details">

                        <div class="verification-detail-row">

                            <span>
                                Student Name
                            </span>

                            <strong>
                                ${studentName}
                            </strong>

                        </div>


                        <div class="verification-detail-row">

                            <span>
                                Course
                            </span>

                            <strong>
                                ${verifiedCourse.title}
                            </strong>

                        </div>


                        <div class="verification-detail-row">

                            <span>
                                Certificate ID
                            </span>

                            <strong>
                                ${enteredId}
                            </strong>

                        </div>


                        <div class="verification-detail-row">

                            <span>
                                Status
                            </span>

                            <strong>
                                Completed ✓
                            </strong>

                        </div>

                    </div>

                </div>

            `;

        }
    );

}