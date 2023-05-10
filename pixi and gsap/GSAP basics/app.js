/**
 * 
 * 
 * DOCUMENTATION: https://greensock.com/docs/v3/GSAP/gsap.from()
 */

if (document.querySelector(".animate")){

    console.log("Found it");
}

gsap.from(".animate", {duration: 1, y: '-100%'});