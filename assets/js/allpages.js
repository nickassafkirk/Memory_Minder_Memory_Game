//General Styling/Interactivity

/**
 * adds wiggle effect to main navigation items
 */
let navRef = document.querySelector("#nav-list").children;

for( var navItem of navRef){
    navItem.addEventListener("mouseover",function(e){
        e.target.classList.add("wiggle");
    });
    navItem.addEventListener("mouseout",function(e){
        e.target.classList.remove("wiggle");
    });
}
