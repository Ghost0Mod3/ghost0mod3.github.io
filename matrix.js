const username = "Ghost0Mod3";

fetch(`https://api.github.com/users/${username}/repos`)
.then(response => response.json())
.then(repos => {

    const container =
        document.getElementById("repo-container");

    repos
    .filter(repo => !repo.name.includes(".github.io"))
    .sort(
        (a,b) =>
        new Date(b.updated_at) -
        new Date(a.updated_at)
    )
    .forEach(repo => {

        const card =
            document.createElement("div");

        card.className = "repo-card";

        card.innerHTML = `
            <h3>${repo.name}</h3>

            <p>
                ${repo.description || "No description"}
            </p>

            ${repo.html_url}
               View Repository →
            </a>
        `;

        container.appendChild(card);
    });

})
.catch(error => console.error(error));

/* MATRIX RAIN */

const canvas =
    document.getElementById("matrix");

const ctx =
    canvas.getContext("2d");

canvas.width =
    window.innerWidth;

canvas.height =
    window.innerHeight;

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

const fontSize = 16;

const columns =
    Math.floor(canvas.width / fontSize);

const drops = [];

for(let i = 0; i < columns; i++){
    drops[i] = 1;
}

function draw(){

    ctx.fillStyle =
        "rgba(0,0,0,0.05)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#00ff41";

    ctx.font =
        fontSize + "px monospace";

    for(let i = 0; i < drops.length; i++){

        const text =
            chars[
                Math.floor(
                    Math.random() *
                    chars.length
                )
            ];

        ctx.fillText(
            text,
            i * fontSize,
            drops[i] * fontSize
        );

        if(
            drops[i] * fontSize >
            canvas.height &&
            Math.random() > 0.975
        ){
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 35);

window.addEventListener(
    "resize",
    () => {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;
    }
);