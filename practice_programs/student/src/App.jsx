function App(){
  const name = "Samhavya";
  const age = 19;
  const section = "B";
  return(
    <div className="app"> 
    <h1>Student Information</h1><br/>
    <p>Name: {name}</p><br/>
    <p>Age: {age}</p><br/>
    <p>Section: {section}</p><br/>
    <button onClick={() => alert("Hello,"+ name)} className="button">
      Click me
    </button>
    </div>
  )
};
export default App;