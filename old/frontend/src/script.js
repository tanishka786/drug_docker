// Made with Immersed love 💖 for coding by 🪄 Tan-the-developer ✌🏻 &  Pallu-the-programer 🫰🏻
// Drug supply chain management using blockchain
console.log("The script is working");

const navBar = document.querySelector("nav");

window.addEventListener("scroll", function () {
    if (this.scrollY >= 500 && this.scrollY < 899) {
        console.log(this.scrollY);
        console.log("above 500");
        navBar.style.backgroundColor = "#256EFF";
    } else if (this.scrollY >= 900 && this.scrollY < 1399) {
        console.log(this.scrollY);
        console.log("above 900");
        navBar.style.backgroundColor = "#3DDC97";
    } else if (this.scrollY >= 1400 && this.scrollY < 1749) {
        console.log(this.scrollY);
        console.log("above 1400");
        navBar.style.backgroundColor = "#B5D99C";
    } else if (this.scrollY >= 1750) {
        console.log(this.scrollY);
        console.log("above 1800");
        navBar.style.backgroundColor = "#FF495C";
    }
});

/* ---- particles.js config ---- */

particlesJS("particles-js", {
    particles: {
        number: {
            value: 380,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: "#00ffff",
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000",
            },
            polygon: {
                nb_sides: 5,
            },
            image: {
                src: "img/github.svg",
                width: 100,
                height: 100,
            },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab",
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true,
});


//metamask js
async function WallectConnect() {
    console.log("here");
    if (typeof window.ethereum !== "undefined"){
        const walletAddr = await ethereum.request({ method: "eth_requestAccounts"});
        console.log(walletAddr);
        console.log("Metamask is installed");

        document.getElementById("walletAddrText").innerHTML = walletAddr;
    }
    else{
        console.log("Metamask is not installed");
    }
    
}

async function checkWalletBalance() {
    console.log("here in Check Balance ", document.getElementById("walletAddrText").innerHTML);
    walletAddr = document.getElementById("walletAddrText").innerHTML;

    let walletBalance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [
            walletAddr,
            'latest'
        ]
    }).catch((err) => {
        console.log(error);
    })
    console.log("Balance in hex", walletBalance);
    console.log("Balance in ETH ", parseFloat((walletBalance) / Math.pow(10, 18)));
    document.getElementById("walletBalanceText").innerHTML = parseFloat((walletBalance) / Math.pow(10, 18));
}