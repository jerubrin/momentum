function doNothing() {return null;}

function slideToRight() {
    document.getElementById('pic-0').classList.add('slow-hide');
    let cloneNode = document.getElementById('pic-0').cloneNode(true);
    document.getElementById('pic-0').id = 'pic-r'
    document.getElementById('slider').appendChild(cloneNode);

    nullOnClicks();
    document.getElementById('slider').addEventListener("transitionend", rightTransitionEnd);
}

function rightTransitionEnd(){
    if (document.getElementById('pic-r') != null) {
        document.getElementById('slider').removeChild(document.getElementById('pic-r'));
        document.getElementById('pic-0').classList.remove('slow-hide');

        document.getElementById('pic-0').id = 'pic-n';
        document.getElementById('pic-1').id = 'pic-0';
        document.getElementById('pic-2').id = 'pic-1';
        document.getElementById('pic-3').id = 'pic-2';
        document.getElementById('pic-4').id = 'pic-3';
        document.getElementById('pic-5').id = 'pic-4';
        document.getElementById('pic-n').id = 'pic-5';
        selectRight();
        setOnClicks();
    }
    document.getElementById('slider').removeEventListener("transitionend", rightTransitionEnd)
}

function slideToLeft() {
    document.getElementById('pic-5').classList.add('slow-hide');
    let cloneNode = document.getElementById('pic-5').cloneNode(true);
    document.getElementById('pic-5').id = 'pic-r'
    document.getElementById('slider').insertBefore(cloneNode, document.getElementById('pic-0'));

    nullOnClicks();
    document.getElementById('slider').addEventListener("transitionend", leftTransitionEnd);
}

function leftTransitionEnd(){
    if (document.getElementById('pic-r') != null) {
        document.getElementById('slider').removeChild(document.getElementById('pic-r'));
        document.getElementById('pic-5').classList.remove('slow-hide');
        
        document.getElementById('pic-5').id = 'pic-n';
        document.getElementById('pic-4').id = 'pic-5';
        document.getElementById('pic-3').id = 'pic-4';
        document.getElementById('pic-2').id = 'pic-3';
        document.getElementById('pic-1').id = 'pic-2';
        document.getElementById('pic-0').id = 'pic-1';
        document.getElementById('pic-n').id = 'pic-0';
        
        selectLeft();
        setOnClicks();
    }
    document.getElementById('slider').removeEventListener("transitionend", leftTransitionEnd)
}


function selectRight() {
    if (document.getElementById('circle-1').classList.contains('circle-active')) {
        select(2)
    } else if (document.getElementById('circle-2').classList.contains('circle-active')) {
        select(3)
    } else {
        select(1)
    }
};

function selectLeft() {
    if (document.getElementById('circle-2').classList.contains('circle-active')) {
        select(1);
    } else if (document.getElementById('circle-3').classList.contains('circle-active')) {
        select(2);
    } else {
        select(3);
    }
};


function select(n) {
    document.getElementById("circle-1").classList.remove('circle-active');
    document.getElementById("circle-2").classList.remove('circle-active');
    document.getElementById("circle-3").classList.remove('circle-active');
    document.getElementById("circle-"+n).classList.add('circle-active');
    switch(n) {
        case 1:
            document.getElementById('circle-1').href = "javascript:doNothing();";
            document.getElementById('circle-2').href = "javascript:slideToRight();";
            document.getElementById('circle-3').href = "javascript:slideToLeft();";
        break;
        case 2:
            document.getElementById('circle-2').href = "javascript:doNothing();";
            document.getElementById('circle-3').href = "javascript:slideToRight();";
            document.getElementById('circle-1').href = "javascript:slideToLeft();";
        break;
        default:
            document.getElementById('circle-3').href = "javascript:doNothing();";
            document.getElementById('circle-1').href = "javascript:slideToRight();";
            document.getElementById('circle-2').href = "javascript:slideToLeft();";
    }
}

function nullOnClicks() {
    document.getElementById('pic-0').setAttribute("onclick", "doNothing()")
    document.getElementById('pic-1').setAttribute("onclick", "doNothing()")
    document.getElementById('pic-2').setAttribute("onclick", "doNothing()")
    document.getElementById('pic-3').setAttribute("onclick", "doNothing()")
    document.getElementById('pic-4').setAttribute("onclick", "doNothing()")
    document.getElementById('pic-5').setAttribute("onclick", "doNothing()")
};

function setOnClicks() {
    document.getElementById('pic-1').setAttribute("onclick", "slideToLeft()")
    document.getElementById('pic-3').setAttribute("onclick", "slideToRight()")
};