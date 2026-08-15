// Create Student class
class Student {

    // Constructor initializes student properties
    constructor(name, rollNo, department, cgpa) {
        this.name = name;
        this.rollNo = rollNo;
        this.department = department;
        this.cgpa = cgpa;
    }
}

// Select the button and profile container
const displayButton = document.getElementById("displayBtn");
const profileContainer = document.getElementById("profileContainer");

// Add click event to the button
displayButton.addEventListener("click", function () {

    // Get values entered by the user
    const name = document.getElementById("name").value;
    const rollNo = document.getElementById("rollNo").value;
    const department = document.getElementById("department").value;
    const cgpa = document.getElementById("cgpa").value;

    // Check whether all fields are filled
    if (name === "" || rollNo === "" ||
        department === "" || cgpa === "") {

        alert("Please enter all student details.");
        return;
    }

    // Create an object of Student class
    const student = new Student(
        name,
        rollNo,
        department,
        cgpa
    );

    // Remove previously displayed profile
    profileContainer.innerHTML = "";

    // Create profile container dynamically
    const profile = document.createElement("div");
    profile.className = "profile";

    // Create heading
    const heading = document.createElement("h2");
    heading.textContent = "Student Profile";

    // Create student detail elements
    const namePara = document.createElement("p");
    namePara.textContent = "Name : " + student.name;

    const rollPara = document.createElement("p");
    rollPara.textContent = "Roll No : " + student.rollNo;

    const departmentPara = document.createElement("p");
    departmentPara.textContent =
        "Department : " + student.department;

    const cgpaPara = document.createElement("p");
    cgpaPara.textContent = "CGPA : " + student.cgpa;

    // Add elements to the profile
    profile.appendChild(heading);
    profile.appendChild(namePara);
    profile.appendChild(rollPara);
    profile.appendChild(departmentPara);
    profile.appendChild(cgpaPara);

    // Display the profile on the webpage
    profileContainer.appendChild(profile);
});