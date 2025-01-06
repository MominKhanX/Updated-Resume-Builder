"use strict";
var _a;
const workExperienceContainer = document.getElementById("work-experience");
const educationContainer = document.getElementById("education");
const skillsContainer = document.getElementById("skills");
const cvOutput = document.getElementById("cv-output");
let profilePicURL = "";
// Event listener for image upload
(_a = document
    .getElementById("profile-pic")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", handleImageUpload);
function handleImageUpload(event) {
    const input = event.target;
    const imagePreview = document.getElementById("image-preview");
    if (input.files && input.files[0]) {
        const file = input.files[0];
        // Validate file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
            alert("File size must be less than 2MB.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePicURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            imagePreview.src = profilePicURL; // Update preview image
            updateCV(); // Update CV on image upload
        };
        reader.readAsDataURL(file);
    }
}
// Function to generate the title and description dynamically
const updateTitleAndDescription = () => {
    const titleInput = document.getElementById("title")
        .value;
    const descriptionInput = document.getElementById("description").value;
    // Validate inputs
    if (!titleInput || !descriptionInput) {
        alert("Don’t forget to add a title and description!");
        return;
    }
    // Select the container where you want to display the data
    const titleContainer = document.getElementById("generated-title");
    const descriptionContainer = document.getElementById("generated-description");
    // Update content dynamically
    if (titleContainer) {
        titleContainer.textContent = titleInput;
    }
    if (descriptionContainer) {
        descriptionContainer.textContent = descriptionInput;
    }
};
// Add event listener to your form submission or button
const form = document.getElementById("resume-form");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload
        updateTitleAndDescription(); // Call the function
    });
}
// Add work experience dynamically
function addWorkExperience() {
    const workDiv = document.createElement("div");
    workDiv.innerHTML = `
    <label>Job Title:</label>
    <input type="text" class="job-title" />
    <label>Company:</label>
    <input type="text" class="company" />
    <label>Start Date:</label>
    <input type="month" class="start-date" />
    <label>End Date:</label>
    <input type="month" class="end-date" />
    <hr />
  `;
    workExperienceContainer.appendChild(workDiv);
    updateCV();
}
// Add education dynamically
function addEducation() {
    const educationDiv = document.createElement("div");
    educationDiv.innerHTML = `
    <label>Degree:</label>
    <input type="text" class="degree" />
    <label>Institution:</label>
    <input type="text" class="institution" />
    <label>Start Date:</label>
    <input type="month" class="start-date" />
    <label>End Date:</label>
    <input type="month" class="end-date" />
    <hr />
  `;
    educationContainer.appendChild(educationDiv);
    updateCV();
}
// Add skill dynamically
function addSkill() {
    const skillDiv = document.createElement("div");
    skillDiv.innerHTML = `
    <label>Skill:</label>
    <input type="text" class="skill"  placeholder="Enter a skill" />
    <hr />
  `;
    skillsContainer.appendChild(skillDiv);
    updateCV();
}
// Add language dynamically
function addLanguage() {
    const languageDiv = document.createElement("div");
    languageDiv.innerHTML = `
    <label>Language:</label>
    <input type="text" class="language" placeholder="Enter a language" />
    <hr />
  `;
    const languagesContainer = document.getElementById("languages");
    if (languagesContainer) {
        languagesContainer.appendChild(languageDiv);
        updateCV(); // Update the CV preview
    }
}
// Update the CV preview
function updateCV() {
    var _a, _b;
    const titleInput = document.getElementById("title")
        .value;
    const descriptionInput = document.getElementById("description").value;
    const linkedinInput = (_a = document.getElementById("linkedin")) === null || _a === void 0 ? void 0 : _a.value;
    cvOutput.innerHTML = `
    <div class="cv-professional-layout">
      <!-- Header Section -->
      <div class="cv-header">
        ${profilePicURL
        ? `<img src="${profilePicURL}" alt="Profile" class="cv-profile-img"/>`
        : ""}
        <div class="cv-header-content">
          <h1 class="name">${document.getElementById("name").value}</h1>
          <div class="cv-contact-info">
            <p><i class="fas fa-envelope"></i> ${document.getElementById("email").value}</p>
            <p><i class="fas fa-phone"></i> ${document.getElementById("phone").value}</p>
            ${linkedinInput
        ? `<p style="font-size:20px;color: silver;"><i class="fab fa-linkedin"></i> <a href="${linkedinInput}" target="_blank" style="text-decoration: none; color: silver;">${linkedinInput}</a></p>`
        : ""}
          </div>
        </div>
      </div>

      <!-- Title and Description Section -->
      <div class="cv-title-description">
        <h2>${titleInput ? titleInput : "Your Title Here"}</h2>
        <p style=" word-wrap: break-word; width: auto; margin-right: .8rem;">
        ${descriptionInput ? descriptionInput : "Your description here"}</p>
      </div>

      <!-- Work Experience Section -->
      <div class="cv-section">
        <h2><i class="fas fa-briefcase"></i> Work Experience</h2>
        ${Array.from(workExperienceContainer.querySelectorAll("div"))
        .map((div) => {
        var _a, _b, _c, _d;
        const jobTitle = (_a = div.querySelector(".job-title")) === null || _a === void 0 ? void 0 : _a.value;
        const company = (_b = div.querySelector(".company")) === null || _b === void 0 ? void 0 : _b.value;
        const startDate = (_c = div.querySelector(".start-date")) === null || _c === void 0 ? void 0 : _c.value;
        const endDate = (_d = div.querySelector(".end-date")) === null || _d === void 0 ? void 0 : _d.value;
        if (jobTitle && company) {
            return `
              <div class="cv-item">
                <div class="cv-item-header">
                  <h3>${jobTitle}</h3>
                  <p class="cv-company">${company}</p>
                </div>
                <p class="cv-date">${formatDate(startDate)} - ${formatDate(endDate)}</p>
              </div>
            `;
        }
        return "";
    })
        .join("")}
      </div>

      <!-- Education Section -->
      <div class="cv-section">
        <h2><i class="fas fa-graduation-cap"></i> Education</h2>
        ${Array.from(educationContainer.querySelectorAll("div"))
        .map((div) => {
        var _a, _b, _c, _d;
        const degree = (_a = div.querySelector(".degree")) === null || _a === void 0 ? void 0 : _a.value;
        const institution = (_b = div.querySelector(".institution")) === null || _b === void 0 ? void 0 : _b.value;
        const startDate = (_c = div.querySelector(".start-date")) === null || _c === void 0 ? void 0 : _c.value;
        const endDate = (_d = div.querySelector(".end-date")) === null || _d === void 0 ? void 0 : _d.value;
        if (degree && institution) {
            return `
              <div class="cv-item">
                <div class="cv-item-header">
                  <h3>${degree}</h3>
                  <p class="cv-institution">${institution}</p>
                </div>
                <p class="cv-date">${formatDate(startDate)} - ${formatDate(endDate)}</p>
              </div>
            `;
        }
        return "";
    })
        .join("")}
      </div>

      <!-- Languages Section -->
      <div class="cv-section">
        <h2 style="font-size: 1.6em;"><i style="margin-right: .2em; font-size: .9em" class="fas fa-language"></i>Languages</h2>
        ${Array.from(((_b = document.getElementById("languages")) === null || _b === void 0 ? void 0 : _b.querySelectorAll("div")) || [])
        .map((div) => {
        var _a;
        const language = (_a = div.querySelector(".language")) === null || _a === void 0 ? void 0 : _a.value;
        return language ? `<p>${language}</p>` : "";
    })
        .join("")}
      </div>

      <!-- Skills Section -->
      <div class="cv-section">
        <h2><i class="fas fa-tools"></i> Skills</h2>
        <div class="cv-skills">
          ${Array.from(skillsContainer.querySelectorAll("div"))
        .map((div) => {
        var _a;
        const skill = (_a = div.querySelector(".skill")) === null || _a === void 0 ? void 0 : _a.value;
        if (skill) {
            return `<span class="cv-skill-item">${skill}</span>`;
        }
        return "";
    })
        .join("")}
        </div>
      </div>
    </div>
  `;
}
function formatDate(dateString) {
    if (!dateString)
        return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
// *************************************************************
// print CV
function printCV() {
    window.print();
}
// *************************************************************
// Generate the CV in a new window
function generateCV() {
    var _a, _b, _c, _d;
    const linkedinInput = (_a = document.getElementById("linkedin")) === null || _a === void 0 ? void 0 : _a.value;
    const cvHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated CV</title>

<style>

/* ========== Base Styles ========== */
body {
    font-family: "Roboto", sans-serif;
    background-color: rgb(85, 122, 134);
    color: rgb(227, 227, 227);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 40px 0;
    box-sizing: border-box;
    flex-direction: column;
    gap: 10px;
}

.container {
    background-color: rgb(240, 240, 240);
    box-shadow: 20px 20px 25px rgba(0, 0, 0, 0.5);
    height: auto;
    width: 800px;
    display: flex;
    overflow: hidden;
}

.leftside {
    background-color: #003147;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
    width: 300px;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    place-items: center;
    color: #ffffff;
}

.rigtside {
    flex-grow: 1;
    padding: 20px;
    border-radius: 10px;
    color: #333333;
    height: 100%;
    width: 500px;
    margin-left: 20px;
    margin-top: 40px;
    font-size: 18px;
}

.image {
    background-image: url(/user.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 80px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 6px solid black;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.innerimg {
    width: 100%;
}

/* ========== Contact Section ========== */
.contact {
    width: 250px;
    margin-top: 30px;
    margin-right: 4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    white-space: nowrap;
}

.conth2 {
    font-size: 1.5rem;
    margin-left: 2rem;
    color: rgb(117, 166, 209);
}

.contline {
    width: 234px;
    height: 0.5px;
    background-color: #ffffff;
    margin-top: -18px;
    margin-left: 2rem;
}

.phone {
    font-size: 0.8rem;
    color: #ffffff;
    margin-left: 2rem;
    margin-top: 1.2rem;
}

.fas fa-phone {
    margin-right: 4px;
}

.email {
    font-size: 0.8rem;
    color: #ffffff;
    margin-left: 2rem;
}

.fas fa-envelope {
    margin-right: 4px;
}

.linkdin {
    font-size: 0.8rem;
    color: #ffffff;
    margin-left: 2rem;
    display: flex;
    gap: 2px;
}

.fab fa-linkedin {
    font-size: 15px;
    margin-right: 4px;
}

.link {
    color: #ffffff;
    text-decoration: none;
    font-size: 11px;
    width: 220px;
    margin-top: 0.5px;
    word-wrap: break-word;
    display: inline-block;
    overflow-wrap: break-word;
    white-space: normal;
    text-align: left;
    padding: 1px;
    box-sizing: border-box;
}

/* ========== Education Section ========== */
.education {
    width: 65%;
    place-items: left;
    align-items: flex-start;
    margin-right: 3.2rem;
}

.eduh2 {
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-left: 1px;
    color: rgb(117, 166, 209);
}

.eduline {
    width: 232px;
    height: 0.5px;
    background-color: #ccc;
    margin-top: -18px;
}

.edudatesection {
    color: #ffffff;
    margin-left: 0;
    margin-top: -0.2rem;
}

.edudate {
    font-size: 12px;
    color: #ffffff;
    margin-top: 1.5rem;
    margin-left: 1px;
}

.eduinst {
    font-size: 18px;
    margin-top: -1.4rem;
    margin-left: 2px;
    color: #ffffff;
    font-weight: 500;
}

.edu-ul {
    margin-top: 5px;
    margin-left: 20px;
}

.edudegree {
    font-size: 18px;
    color: #ffffff;
    margin-left: -2.6rem;
    margin-top: -2rem;
}

/* ========== Languages Section ========== */
.languages {
    margin-right: 0.9rem;
}

.lang-h2 {
    color: rgb(117, 166, 209);
    font-size: 1.5rem;
}

.lang-line {
    width: 232px;
    height: 0.5px;
    background-color: #ccc;
    margin-top: -14px;
}

.lang-ul {
    margin-top: 5px;
    margin-left: 20px;
}

.lang-ul li {
    font-size: 18px;
    color: #ffffff;
    margin-left: -2.3em;
    margin-top: 1rem;
}

/* ========== Name & Title ========== */
.name {
    color: rgb(78, 108, 147);
    margin-left: -1.4rem;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    white-space: nowrap;
    font-size: 2.5rem;
    margin-top: -10px;
    display: flex;
    justify-content: left;
}

.title {
    font-size: 1.5rem;
    margin-top: -2rem;
    font-weight: 600;
    color: rgb(78, 108, 147);
}

/* ========== Profile ========== */
.profile {
    font-size: 1.3rem;
    margin-top: -1rem;
    font-weight: 600;
    color: rgb(78, 108, 147);
}

.profile-line {
    width: 430px;
    height: 0.5px;
    background-color: #ccc;
    margin-top: -5px;
}

.description {
    color: #333333;
    word-wrap: break-word;
    width: 26rem;
}

/* ========== Work Section ========== */
.work-h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 1.5rem;
    color: rgb(78, 108, 147);
}

.work-line {
    width: 430px;
    height: 0.5px;
    background-color: #ccc;
    margin-top: -5px;
}

.work-para {
    color: #666666;
    margin-bottom: 10px;
}

.jobdate {
    font-size: 14px;
    margin-left: 30px;
    color: #848C90;
}

.jobtitle {
    font-weight: bold;
    font-size: 18px;
}

.company {
    font-size: 18px;
    display: block;
    margin-top: 5px;
    color: #848C90;
}

.info2 {
    margin: 30px 50px 50px 50px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
}

/* ========== Skills ========== */
.skill-h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 1.5rem;
    color: rgb(78, 108, 147);
}

.skill-line {
    width: 430px;
    height: 0.5px;
    background-color: #ccc;
    margin-top: -5px;
}

.skills {
    width: 430px;
    height: 350px;
    margin-top: 1.5rem;
}

.skills span {
    display: block;
    margin: 5px 0;
    background-color: #003147;
    font-size: 18px;
    color: #ffffff;
    text-align: center;
    padding: 5px 10px;
    border-radius: 5px;
}

/* ========== Buttons ========== */
.edit-cv {
    padding: 10px 10rem;
    margin-right: 10px;
    font-weight: bolder;
    background-color: #003147;
    color: #ffffff;
    border: 2px solid #333;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.4s ease;
}

.edit-cv:hover {
    background-color: #f5f5f5;
    color: #003147;
}

.pdf {
    padding: 10px 10rem;
    font-weight: bolder;
    background-color: #003147;
    color: #ffffff;
    border: 2px solid #333;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.4s ease;
}

.pdf:hover {
    background-color: #f5f5f5;
    color: #003147;
}

/* ========== Responsive Media Queries (unchanged) ========== */
@media (max-width: 768px) {
    .container {
        box-shadow: 20px 20px 20px rgba(51, 51, 51, 0.7);
        height: 1200px;
        width: 700px;
        display: flex;
        overflow: hidden;
    }

    .leftside {
        width: 230px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        place-items: center;
        margin-top: 0;
    }

    .rigtside {
        width: 400px;
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }

    .image {
        margin-top: 60px;
        width: 160px;
        height: 140px;
    }

    .contact {
        width: 200px;
    }

    .conth2 {
        font-size: 1.3rem;
    }

    .contline {
        width: 204px;
    }

    .phone {
        font-size: 0.8em;
    }

    .email {
        font-size: 0.8em;
        margin-left: 2rem;
    }

    .linkdin {
        display: flex;
    }

    .fa-brands,
    .fab {
        margin-right: 3px;
    }

    .link {
        text-decoration: none;
        font-size: 10.8px;
        width: 200px;
        margin-top: -0.1px;
        display: inline-block;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        text-align: left;
        padding: 1px;
        box-sizing: border-box;
    }

    .eduh2 {
        font-size: 1.3rem;
    }

    .eduline {
        width: 204px;
    }

    .edudate {
        font-size: 10.7px;
    }

    .eduinst {
        font-size: 16px;
    }

    .edudegree {
        font-size: 15px;
    }

    .languages {
        margin-right: 0;
        margin-left: 0;
    }

    .lang-h2 {
        font-size: 1.3rem;
    }

    .lang-line {
        width: 202px;
    }

    .lang-ul {
        margin-left: 12px;
    }

    .lang-ul li {
        font-size: 15px;
    }

    .name {
        margin-right: 8.8rem;
        margin-top: 30px;
    }

    .title {
        font-size: 1.5rem;
        margin-right: 12rem;
    }

    .profile {
        font-size: 1.3rem;
        margin-right: 21.5rem;
    }

    .description {
        font-size: 18px;
    }

    .work-h2 {
        font-size: 1.3rem;
    }

    .edit-cv {
        padding: 10px 9rem;
    }

    .pdf {
        padding: 10px 7.8rem;
    }

    .print ul {
        font-size: 15px;
    }
}

@media (max-width: 640px) {
    .container {
        box-shadow: 20px 20px 20px rgba(51, 51, 51, 0.7);
        height: 1200px;
        width: 620px;
        display: flex;
        overflow: hidden;
    }

    .leftside {
        width: 230px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        place-items: center;
        margin-top: 0;
    }

    .linkdin {
        display: flex;
    }

    .fa-brands,
    .fab {
        margin-right: 3px;
    }

    .link {
        text-decoration: none;
        font-size: 10.8px;
        width: 190px;
        margin-top: -0.1px;
        display: inline-block;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        text-align: left;
        padding: 1px;
        box-sizing: border-box;
    }

    .languages {
        margin-left: 0.5rem;
    }

    .rigtside {
        width: 400px;
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }

    .edudate {
        font-size: 10.2px;
    }

    .name {
        margin-right: 10rem;
        font-size: 32px;
        margin-top: 25px;
    }

    .title {
        font-size: 1.4rem;
        margin-top: -1.8rem;
        margin-right: 11rem;
        white-space: nowrap;
    }

    .profile {
        font-size: 1.2rem;
        margin-right: 19.9rem;
        margin-top: -1rem;
    }

    .profile-line {
        width: 365px;
        margin-right: 2rem;
    }

    .description {
        width: 23rem;
        font-size: 15px;
        margin-right: 1rem;
    }

    .work-experience {
        width: 21em;
        margin-right: 1.1rem;
    }

    .work-line {
        width: 365px;
    }

    .jobtitle {
        font-size: 16px;
    }

    .jobdate {
        font-size: 12px;
    }

    .company {
        font-size: 16px;
    }

    .skills-div {
        width: 23.5rem;
        margin-right: 1.5rem;
    }

    .skill-h2 {
        font-size: 1.2rem;
    }

    .skill-line {
        width: 365px;
        margin-top: -5px;
    }

    .skills {
        width: 365px;
    }

    .edit-cv {
        padding: 10px 7rem;
    }

    .pdf {
        padding: 10px 5.8rem;
    }

    .print ul {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .container {
        box-shadow: 20px 20px 20px rgba(51, 51, 51, 0.7);
        height: 100%;
        width: 460px;
        display: flex;
        overflow: hidden;
    }

    .leftside {
        width: 165px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        place-items: center;
        padding-top: 2rem;
        margin-top: 0;
    }

    .image {
        margin-top: 10px;
        margin-left: 0.6rem;
        width: 110px;
        height: 110px;
    }

    .contact {
        width: 130px;
    }

    .conth2 {
        font-size: 1rem;
    }

    .contline {
        width: 130px;
        margin-top: -12px;
    }

    .fas fa-phone {
        font-size: 10px;
        margin-right: 2px;
    }

    .phone {
        font-size: 0.7em;
    }

    .email {
        font-size: 9.3px;
    }

    .linkdin {
        font-size: 0.7rem;
        display: flex;
    }

    .fa-brands,
    .fab {
        margin-right: 0;
    }

    .link {
        text-decoration: none;
        font-size: 9px;
        width: 120px;
        margin-top: -0.1px;
        display: inline-block;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        text-align: left;
        padding: 1px;
        box-sizing: border-box;
    }

    .education {
        margin-right: 2.2rem;
    }

    .eduline {
        width: 132px;
        margin-top: -12px;
    }

    .edudate {
        width: 135px;
        font-size: 8px;
        margin-top: 1rem;
    }

    .eduinst {
        font-size: 14px;
    }

    .edudegree {
        font-size: 14px;
    }

    .languages {
        margin-left: 0.4rem;
    }

    .lang-h2 {
        font-size: 1rem;
    }

    .lang-line {
        width: 135px;
        margin-top: -6px;
    }

    .lang-ul li {
        font-size: 14px;
        margin-left: -2.5em;
    }

    .rigtside {
        width: 270px;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }

    .name {
        margin-right: 3.5rem;
        font-size: 28px;
    }

    .title {
        font-size: 1.1rem;
        margin-top: -1.8rem;
        margin-right: 5.8rem;
        white-space: nowrap;
    }

    .profile {
        font-size: 1rem;
        margin-right: 12.6rem;
    }

    .profile-line {
        display: block;
        visibility: visible;
        width: 230px;
        height: 0.5px;
        margin-top: -0.5rem;
        margin-bottom: 1rem;
    }

    .description {
        width: 17rem;
        font-size: 13px;
        margin-right: -0.5rem;
        margin-top: -0.1rem;
    }

    .work-experience {
        width: 10em;
        margin-right: 5.4rem;
    }

    .work-h2 {
        font-size: 1rem;
    }

    .work-line {
        width: 275px;
    }

    .work-para {
        margin-bottom: 10px;
        width: 280px;
    }

    .jobtitle {
        font-size: 12px;
    }

    .jobdate {
        font-size: 10px;
        margin-left: 10px;
        white-space: nowrap;
    }

    .company {
        font-size: 14px;
    }

    .skills-div {
        width: 10rem;
        margin-right: 6.6rem;
    }

    .skill-h2 {
        font-size: 1rem;
    }

    .skill-line {
        width: 275px;
    }

    .skills {
        width: 275px;
    }

    .edit-cv {
        padding: 10px 5rem;
    }

    .pdf {
        padding: 10px 3.5rem;
    }

    .print ul {
        font-size: 12px;
    }
}

@media (max-width: 391px) {
    .container {
        box-shadow: 20px 20px 20px rgba(51, 51, 51, 0.7);
        height: 100%;
        width: 385px;
        display: flex;
        overflow: hidden;
    }
    
    .leftside {
        width: 160px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        place-items: center;
        margin-top: 0;
    }

    .image {
        margin-top: 10px;
        margin-left: 0.6rem;
        width: 110px;
        height: 90px;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border-bottom-left-radius: 30px;
    }
    
    .innerimg {
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border-bottom-left-radius: 30px;
    }
    
    .contact {
        width: 130px;
    }

    .conth2 {
        font-size: 1rem;
    }

    .contline {
        width: 130px;
        margin-top: -12px;
    }

    .fas fa-phone {
        font-size: 10px;
        margin-right: 2px;
    }

    .phone {
        font-size: 0.7em;
    }
    
    .email {
        font-size: 9.3px;
    }

    .linkdin {
        font-size: 0.7rem;
        display: flex;
    }

    .fa-brands,
    .fab {
        margin-right: 0px;
    }

    .link {
        text-decoration: none;
        font-size: 8.5px;
        width: 130px;
        margin-top: -0.1px;
        display: inline-block;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        text-align: left;
        padding: 1px;
        box-sizing: border-box;
    }

    .education {
        margin-right: 2.2rem;
    }

    .eduline {
        width: 132px;
        margin-top: -12px;
    }

    .edudate {
        width: 135px;
        font-size: 8px;
        margin-top: 1rem;
    }
    
    .eduinst {
        font-size: 14px;
    }

    .edudegree {
        font-size: 14px;
    }
    
    .languages {
        margin-left: 0.4rem;
    }

    .lang-h2 {
        font-size: 1rem;
    }

    .lang-line {
        width: 135px;
        margin-top: -6px;
    }
    
    .lang-ul li {
        font-size: 14px;
        margin-left: -2.5em;
    }

    .rigtside {
        width: 270px;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
    
    .name {
        margin-right: 5rem;
        font-size: 24px;
    }

    .title {
        font-size: 1rem;
        margin-top: -1.6rem;
        margin-right: 6.6rem;
        white-space: nowrap;
    }
    
    .profile {
        font-size: 0.9rem;
        margin-right: 12.8rem;
    }

    .profile-line {
        display: block;
        visibility: visible;
        width: 203px;
        margin-right: 4rem;
        height: 0.5px;
        margin-top: -0.5rem;
        margin-bottom: 1rem;
    }
    
    .description {
        width: 12.2rem;
        font-size: 13px;
        margin-right: 4rem;
        margin-top: -0.1rem;
    }
    
    .work-experience {
        width: 10em;
        margin-right: 5.4rem;
    }
    
    .work-h2 {
        font-size: 0.9rem;
    }
    
    .work-line {
        width: 205px;
    }

    .work-para {
        margin-bottom: 10px;
        width: 280px;
    }

    .jobtitle {
        font-size: 10px;
    }

    .jobdate {
        font-size: 8px;
        margin-left: 0;
        white-space: nowrap;
    }

    .company {
        font-size: 10px;
    }
    
    .skills-div {
        width: 10rem;
        margin-right: 6.6rem;
    }
    
    .skill-h2 {
        font-size: 0.9rem;
    }

    .skill-line {
        width: 205px;
    }

    .skills {
        width: 205px;
    }
    
    .edit-cv {
        padding: 10px 4rem;
    }

    .pdf {
        padding: 10px 2.8rem;
    }

    .print ul {
        font-size: 12px;
    }
}


/* Print adjustments to preserve backgrounds and colors */
@media print {
    body,
    .container,
    .leftside,
    .rigtside,
    .image {
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
    }

    @page {
        margin: 0;
    }
}

.print {
    background-color: #003147;
    width: 21rem;
    padding: 2rem;
    border-top: 3px solid #00bbc7;
    border-right: 3px solid #0088a9;
    border-bottom: 3px solid #00557f;
    border-left: 3px solid #003e66;
}

</style>


    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

</head>

<body>
    <div class="container">
        <div class="leftside">
            <div class="image">
                ${profilePicURL
        ? `<img src="${profilePicURL}" alt="Profile" class="innerimg" />`
        : ""}
            </div>
            <div class="contact">
                <h2 class="conth2">Contact</h2>
                <div class="contline"></div>
                <p class="phone"><i class="fas fa-phone"></i> ${document.getElementById("phone").value}</p>
                <p class="email"><i class="fas fa-envelope"></i> ${document.getElementById("email").value}</p>
                ${linkedinInput
        ? `<p class="linkdin"><i class="fab fa-linkedin"></i> <a href="${linkedinInput}" target="_blank" class="link">${linkedinInput}</a></p>`
        : ""}
            </div>
            <div class="education">
                <h2 class="eduh2">Education</h2>
                <div class="eduline"></div>
                ${Array.from(educationContainer.querySelectorAll("div"))
        .map((div) => {
        var _a, _b, _c, _d;
        const degree = (_a = div.querySelector(".degree")) === null || _a === void 0 ? void 0 : _a.value;
        const institution = (_b = div.querySelector(".institution")) === null || _b === void 0 ? void 0 : _b.value;
        const startDate = (_c = div.querySelector(".start-date")) === null || _c === void 0 ? void 0 : _c.value;
        const endDate = (_d = div.querySelector(".end-date")) === null || _d === void 0 ? void 0 : _d.value;
        if (degree && institution) {
            return `
                                <p class="edudatesection">
                                    <p class="edudate">${formatDate(startDate)} - ${formatDate(endDate)}</p> <br/>
                                    <p class="eduinst">${institution}</p> <br/>
                                    <ul class="edu-ul">
                                        <li class="edudegree">${degree}</li>
                                    </ul>
                                </p>
                            `;
        }
        return "";
    })
        .join("")}
            </div>
            <div class="languages">
                <h2 class="lang-h2">Languages</h2>
                <div class="lang-line"></div>
                ${Array.from(((_b = document
        .getElementById("languages")) === null || _b === void 0 ? void 0 : _b.querySelectorAll("div")) || [])
        .map((div) => {
        const languageInput = div.querySelector(".language");
        const language = languageInput === null || languageInput === void 0 ? void 0 : languageInput.value.trim();
        return language
            ? `<ul class="lang-ul" >
                                  <li>${language}</li>
                              </ul>`
            : "";
    })
        .join("")}
            </div>
        </div>
        <div class="rigtside">
            <h1 class="name">${document.getElementById("name").value}</h1>
            <h3 class="title">${((_c = document.getElementById("title")) === null || _c === void 0 ? void 0 : _c.value) ||
        "Web Developer"}</h3>
            <br/>
            <h2 class="profile">Profile</h2>  
            <div class="profile-line"></div>          
            <p class="description">${((_d = document.getElementById("description")) === null || _d === void 0 ? void 0 : _d.value) || ""}</p>
            <div class="work-experience">
                <h2 class="work-h2">Work Experience</h2>
                <div class="work-line"></div> 
                ${Array.from(workExperienceContainer.querySelectorAll("div"))
        .map((div) => {
        var _a, _b, _c, _d;
        const jobTitle = (_a = div.querySelector(".job-title")) === null || _a === void 0 ? void 0 : _a.value;
        const company = (_b = div.querySelector(".company")) === null || _b === void 0 ? void 0 : _b.value;
        const startDate = (_c = div.querySelector(".start-date")) === null || _c === void 0 ? void 0 : _c.value;
        const endDate = (_d = div.querySelector(".end-date")) === null || _d === void 0 ? void 0 : _d.value;
        if (jobTitle && company) {
            return `
                                <p class="work-para">
                                    <span class="jobtitle">${jobTitle}</span>
                                    <span class="jobdate">${formatDate(startDate)} - ${formatDate(endDate)}</span>
                                    <br/>
                                    <span class="company">${company}</span>
                                </p>
                            `;
        }
        return "";
    })
        .join("")}
            </div>
            <div class="skills-div">
                <h2 class="skill-h2">Skills</h2>
                <div class="skill-line"></div> 
                <div class="skills">
                    ${Array.from(skillsContainer.querySelectorAll("div"))
        .map((div) => {
        var _a;
        const skill = (_a = div.querySelector(".skill")) === null || _a === void 0 ? void 0 : _a.value;
        return skill ? `<span>${skill}</span>` : "";
    })
        .join("")}
                </div>
            </div>
        </div>
    </div>

    <div style="text-align: center; margin-top: 60px;">
           <button class="edit-cv" onclick="window.close();">Edit CV</button>
           <button onclick="printCV()" class="pdf">Download PDF</button>
   </div>

   <div class="print">
    <h2>Print Settings</h2>
    <ul>
      <li>Printer: Select "Save as PDF."</li>
      <li>Layout: Choose "Portrait."</li>
      <li>Pages: Set the option to "1."</li>
      <li>Paper Size: Select "Letter"</li>
      <li>Scale (%): Set it to "Custom (According to your Screen)"</li>
      <li>Pages per Sheet: Set to "1"</li>
      <li>Margins: Select "None"</li>
      <li>Options: Enable the checkbox for "Background Graphics"</li>
    </ul>
  </div>
    
    <!-- jquery cdn -->
    <script src="https://code.jquery.com/jquery-3.6.4.js" integrity="sha256-a9jBBRygX1Bh5lt8GZjXDzyOB+bWve9EiO7tROUtj/E=" crossorigin="anonymous"></script>
    <!-- jquery repeater cdn -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.repeater/1.2.1/jquery.repeater.js" integrity="sha512-bZAXvpVfp1+9AUHQzekEZaXclsgSlAeEnMJ6LfFAvjqYUVZfcuVXeQoN5LhD7Uw0Jy4NCY9q3kbdEXbwhZUmUQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    
    <script>
      function printCV(){
        window.print();
        }
    </script>
      

</body>
</html>`;
    const newWindow = window.open();
    if (newWindow) {
        newWindow.document.write(cvHTML);
        newWindow.document.close();
    }
    else {
        console.error("Failed to open new window. Please check if pop-ups are blocked.");
    }
}