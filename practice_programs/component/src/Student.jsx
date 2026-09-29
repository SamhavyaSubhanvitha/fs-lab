function Student(props) {
    return (
        <div>
            <h2>Student Details</h2>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>Branch: {props.branch}</p>
        </div>
    );
}

export default Student;
