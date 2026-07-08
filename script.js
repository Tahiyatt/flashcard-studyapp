const card = document.querySelector(".card");

card.addEventListener("click", () => {
    console.log("clicked");
    card.classList.toggle("flipped");
})


let cardSet = {
    title: "title",
    data: []
}

const initialText =
    `
Walk from v to w:an alternating series of vertices and edges from vertex v to vertex w
Trivial Walk:Walk of length 0,consists only of a single vertex and no edges.
Trail:A walk that does do repeat an edge. Alternating series of vetrices and edges from v to w with no repeating edges.
Path:A trail that does not repeat a vertex. A walk without repeated vertices or edges
Closed Walk:A walk that starts and ends on the same vertex
Circuit / Euler Circuit + Req:Closed Walk that does not repeat an edge. A walk that starts and ends at the same vertex and does not repeat an edge.<br><br>G only has a circuit iff every vertex has a even degree
Simple circuit:A circuit without repeated&nbsp; vertices. A closed walk without repeated vertices or edges.
Subgraph:subset of the graph G, with the same vertices, edges, and endpoints on those edges
Connectedness:Graph is connected. It is possible to walk from any vertex to another
What does it mean for a graph to be < em > connected</em >?:any two vertices are connected by a path<br>
Euler path / trail:G has an Euler path(&nbsp;a path that uses every edge exactly once) from v to w if it has exactly 0 or 2 vertices of odd degree.
Hamiltonian Circuits:A simple circuit that includes every vertex in a graph. No repeated edges or vertices in graph<br><br>Graphs have these.&nbsp;<br><br>No rule for telling if a graph has this. But we could rule out graphs with vertices of degree 1.
Adjancncy Matrix(directed):Square n x n matrix (n vertices) where each element A<span style="font-size: 16.6667px;">ij</span> tells us the number of paths (arrows) from vertex i to vertex j<br><br><br><img src="paste-bc590f79e1b2d72ace8f6bf2b71006513e7a65ab.jpg">
Adjacency Matrix(Undirected):Same as directed. A<sub>ij</sub> tells us the number of edges from i to j.
symmetric matrices so this means that A < sub > ij =& nbsp;</sub > A < sub > ji</sub > ":
Adjacency Matrix for multiple Connect Components:A<sub>i&nbsp;</sub> only exists in the diagonal<br><br><img src="paste-3d7999c5c153e7c323d339531da19a9308e39364.jpg">
Matrix Multiplication:Multiply rows by columns and place in element.
Use Adjacency Matrix for walks:A<sup>n</sup>  gives us the matrix where the ij<sup>th&nbsp;</sup> entry tells us the # of walks from v<sub>i </sub>to v<sub>j&nbsp;</sub> of length n
Isomorphism of graph:Exact same vertices and edges but different labelings
Invariant Properties:Properties of graphs that remain the same regardless of different isomorphisms of the same graph
Invariant Properties(list):# of vertices<br># of edges<br>degrees on vertices<br>circuits, simple circuits, Euler/Hamilotionan and any paths<br>connectedness<br>
Simple graph:No loops (i -&gt; i) or parallel paths (when there are 2 paths from i to j)
`

function parseCardSet(title, text) {

    const cardSet = {
        title: title,
        cards: []
    };

    // Split into lines and remove empty ones
    const lines = text
        .trim()
        .split("\n")
        .filter(line => line.trim() !== "");

    for (const line of lines) {

        // Find the first colon
        const colonIndex = line.indexOf(":");

        // Skip malformed lines with no colon
        if (colonIndex === -1) continue;

        const front = line.slice(0, colonIndex).trim();
        const back = line.slice(colonIndex + 1).trim();

        cardSet.cards.push({
            front: front,
            back: back
        });
    }

    return cardSet;
}

const graphCards = parseCardSet("Graph Theory", initialText);

console.log(graphCards.cards.length);
const cardIndexP = document.querySelector("#card-index");
let current = 0;
cardIndexP.textContent = `${current + 1}/${graphCards.cards.length}`

const topicName = document.querySelector("#topic-name");

topicName.textContent = `${graphCards.title}`

console.log(`${graphCards.title}`);

function updateCard(index) {
    console.log(index)
    if (index === 0) {
        leftArrow.classList.add("gray");
    }
    else if (index === graphCards.cards.length - 1) {
        rigthArrow.classList.add("gray");
    }
    else {
        rigthArrow.classList.remove("gray");
        leftArrow.classList.remove("gray");
    }
    const frontContent = document.querySelector(".front");
    frontContent.innerHTML = `<p>${graphCards.cards[index].front}</p`;

    const backContent = document.querySelector(".back");
    backContent.innerHTML = `<p>${graphCards.cards[index].back}`;

    cardIndexP.textContent = `${current + 1}/${graphCards.cards.length}`
    card.classList.remove("flipped");
}


const rigthArrow = document.querySelector(".bi-arrow-right-circle-fill");

rigthArrow.addEventListener("click", () => {
    if(current===graphCards.cards.length-1) return
    current = current + 1;
    updateCard(current);
})

const leftArrow = document.querySelector(".bi-arrow-left-circle-fill");

leftArrow.addEventListener("click", () => {
    if(current===0) return
    current = current - 1;
    updateCard(current);
})
leftArrow.classList.add("gray");
updateCard(0)

document.addEventListener("keydown",(event)=>{
    const key = event.key;

    if(key===' '){
        card.click();
    }
    if(key==="ArrowLeft"){
        leftArrow.click();
    }
    if(key==="ArrowRight"){
        rigthArrow.click();
    }
})