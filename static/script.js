document.querySelector("#add").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "flex";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
});

document.querySelector("#add-ad-form").addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: e.target["title"].value,
            description: e.target["description"].value,
        }),
    }).then(() => {
        location.reload();
    });
});

let wrapper = document.querySelector(".wrapper");
fetch("/ads", {
    method: "post",
}).then(async (response) => {
    let ads = await response.json();
    wrapper.innerHTML = "";
    ads.forEach((product) => {
        wrapper.innerHTML += `
                <div class="ad">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                </div>
                `;
    });
});

