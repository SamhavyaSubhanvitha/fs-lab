const title = document.getElementById("title");
const content = document.getElementById("content");
const color = document.getElementById("color");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");

let notes = [];

addBtn.addEventListener("click", addNote);

function addNote(){

    if(title.value=="" || content.value==""){
        alert("Enter Title and Note");
        return;
    }

    let note={
        title:title.value,
        content:content.value,
        color:color.value
    };

    notes.push(note);

    displayNotes();

    title.value="";
    content.value="";
}

function displayNotes(){

    notesContainer.innerHTML="";

    for(let i=0;i<notes.length;i++){

        let card=document.createElement("div");
        card.className="note";
        card.style.backgroundColor=notes[i].color;

        let h2=document.createElement("h2");
        h2.innerHTML=notes[i].title;

        let p=document.createElement("p");
        p.innerHTML=notes[i].content;

        let edit=document.createElement("button");
        edit.innerHTML="Edit";

        let del=document.createElement("button");
        del.innerHTML="Delete";

        edit.addEventListener("click",function(){

            let newTitle=prompt("Enter Title",notes[i].title);
            let newContent=prompt("Enter Note",notes[i].content);

            if(newTitle!=null && newContent!=null){
                notes[i].title=newTitle;
                notes[i].content=newContent;
                displayNotes();
            }

        });

        del.addEventListener("click",function(){

            notes.splice(i,1);
            displayNotes();

        });

        card.appendChild(h2);
        card.appendChild(p);
        card.appendChild(edit);
        card.appendChild(del);

        notesContainer.appendChild(card);

    }
}