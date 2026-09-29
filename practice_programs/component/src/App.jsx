import Student from "./Student";

function App() {
    return (
        <div>
            <h1>Student Management System</h1>


            <Student
                name="Ravi"
                age="20"
                branch="CSE"
            />


            <Student
                name="Priya"
                age="21"
                branch="AIML"
            />


            <Student
                name="Rahul"
                age="20"
                branch="ECE"
            />
        </div>
    );
}

export default App;

