// Hero Section Animation
function heroSectionAnimation(){
    var h1 = document.querySelectorAll('.txt h1');
h1.forEach((elem)=>{
    var spl = elem.textContent.split("");
    elem.innerHTML = "";
    spl.forEach((e)=>{
        elem.innerHTML += `<span>${e}</span>`
    })   
})

 var tl1 = gsap.timeline();

 tl1.to('#loader .top',{
    delay:1.5,
    y: "-100%",
    duration: 1
},"a")

tl1.to('#loader .bottom',{
    delay:1.5,
    y: "100%",
    duration: 1
},"a")

tl1.to("#loader",{
    display: "none",
})


tl1.from('.txt h1 span',{
    y: "100%",
    duration:0.5,
    stagger: 0.1
})
tl1.to(".txt",{
    overflow: "initial"
})
tl1.from(".txt-2 img",{
    opacity: "0",
    scale: "0.8",
    y: "20%"
})
}
heroSectionAnimation();

// Marquee Section

// function marqueeAnimation(){
//     const marqueeWidth = document.querySelectorAll('.marquee').forEach((x)=>{
//          return x.offsetWidth;
//     });


//     gsap.to('.marquee', {
//         x: `-${marqueeWidth}px`, // Move the content to the left by its own width
//         duration: 4, 
//         repeat: -1,
//         ease: "none",
//         onComplete: function() {
//             gsap.set('.marquee', { x: '0%' }); // Reset position to the start for seamless looping
//         }
//     });
// }

// marqueeAnimation();

// Images Hover Section

function imgsHoverEffect() {
    const elems = document.querySelectorAll(".elem");

    elems.forEach((elem) => {
        const img = elem.querySelector('img');

        elem.addEventListener("mouseenter", () => {
            gsap.to(img, { opacity: 1, duration: 0.3 });
        });

        elem.addEventListener("mouseleave", () => {
            gsap.to(img, { opacity: 0, duration: 0.3 });
        });

        elem.addEventListener("mousemove", (dets) => {
            const rect = elem.getBoundingClientRect();
            gsap.to(img, {
                x: dets.clientX - rect.left,
                y: dets.clientY - rect.top,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
}

imgsHoverEffect();



// Canvas Animation Code
function canvasAnimation(){
    const canvas = document.querySelector('canvas#frame');
const context = canvas.getContext("2d");


const frames = {
    currentIndex : 0,
    maxIndex: 513
}


const images = [];
let imagesLoaded = 0;

function preloadImages(){
    for(let i = 1; i <= frames.maxIndex; i++){
        
        let imageURL = `./Media/Canvas/frame_${i.toString().padStart(4,0)}.jpeg`
        let img = new Image();
        img.src = imageURL;
        img.onload = () => {
            imagesLoaded++;
            if(imagesLoaded == frames.maxIndex){
                loadImages(frames.currentIndex)
                startAnimation();
            }
        }
        images.push(img);
    }
}

function loadImages(index) {
    if (index > 0 && index <= frames.maxIndex) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let scaleX = canvas.width / img.width;
        let scaleY = canvas.height / img.height;
        let scale;

        // Determine scaling based on screen size
        if (window.innerWidth <= 768) {
            scale = Math.min(scaleX, scaleY);
        } else {
            scale = Math.max(scaleX, scaleY);
        }

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
    }
}

function handleResize() {
    loadImages(frames.currentIndex);
}

window.addEventListener('resize', handleResize);



function startAnimation(){
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent-canvas",
            start: "top top",
            scrub: 2,
        }
    });

    tl.to(frames,{
        currentIndex: frames.maxIndex,
        onUpdate: function(){
            loadImages(Math.floor(frames.currentIndex));
        }
    })

}

startAnimation();
preloadImages();

}

canvasAnimation();

function wishAnimation() {
    var wishTextElements = document.querySelectorAll('.wish p');

    wishTextElements.forEach((element) => {
        var words = element.textContent.split(" ");
        element.innerHTML = ''; // Clear the current content

        words.forEach((word) => {
            element.innerHTML += `<span>${word} </span>`;
        });
    });

    gsap.to(".wish p span",{
        opacity: 1,
        y: 50,
        stagger: 0.2,
        // duration: 1,
        ease: "power2.easeInOut",
        scrollTrigger:{
            trigger: ".wish",
                        start: "top 80%",
                        end: "70% 80%",
                        toggleActions: "play none none reverse",
                        // markers: true,
                        scrub: 3
        }
    })
}

wishAnimation();
