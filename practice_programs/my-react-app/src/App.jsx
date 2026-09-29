function User(){
  const name = "Samhavya";
  return(
    <p style={{color:"Pink"}}>Hello, {name}</p>
  );
}
function App(){
  return (
    <>
    <div style={{textAlign:"center"}}>
    <h1>Hello, React</h1>
    <p>This is React</p>
    <User/>
    <img src="flower.jpg" alt="flower" width="200px" height="200px"/>
    </div>
    </>
  );
}
export default App;