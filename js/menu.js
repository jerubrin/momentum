function openmenu() {
    document.getElementById("mobile-nav-background").classList.toggle("none-to-flex");
    document.getElementById("mobile-nav-background").classList.toggle("black-back");
    document.getElementById("mobile-nav-block").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        console.log("isn't dropbtn")
        let dropdowns = document.getElementsByClassName("drop-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
            if (openDropdown.classList.contains('black-back')) {
                openDropdown.classList.remove('black-back');
            }
            if (openDropdown.classList.contains('none-to-flex')) {
                openDropdown.classList.remove('none-to-flex');
            }
        }
    }
}