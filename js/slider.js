function select(n) {
    switch(n) {
        case 1:
            document.getElementById("slider").classList.remove('last-dest');
            document.getElementById("slider").classList.add('first-dest');
            document.getElementById('arrow-left').children[0].children[0].setAttribute("fill-opacity", "0.5")
            document.getElementById('arrow-right').children[0].children[0].setAttribute("fill-opacity", "1")
        break;
        case 3:
            document.getElementById("slider").classList.remove('first-dest');
            document.getElementById("slider").classList.add('last-dest');
            document.getElementById('arrow-left').children[0].children[0].setAttribute("fill-opacity", "1")
            document.getElementById('arrow-right').children[0].children[0].setAttribute("fill-opacity", "0.5")
        break;
        default:
            document.getElementById("slider").classList.remove('last-dest');
            document.getElementById("slider").classList.remove('first-dest');
            document.getElementById('arrow-left').children[0].children[0].setAttribute("fill-opacity", "1")
            document.getElementById('arrow-right').children[0].children[0].setAttribute("fill-opacity", "1")
    }
    
    
    document.getElementById("circle-1").classList.remove('circle-active');
    document.getElementById("circle-2").classList.remove('circle-active');
    document.getElementById("circle-3").classList.remove('circle-active');
    document.getElementById("circle-"+n).classList.add('circle-active');
}

function selectLeft() {
    if (document.getElementById('circle-2').classList.contains('circle-active')) {
        select(1)
    } else if (document.getElementById('circle-3').classList.contains('circle-active')) {
        select(2)
    }
}

function selectRight() {
    if (document.getElementById('circle-1').classList.contains('circle-active')) {
        select(2)
    } else if (document.getElementById('circle-2').classList.contains('circle-active')) {
        select(3)
    }
}