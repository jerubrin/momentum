function doNothing() {return null;}

let allowMoving = true;
let pics = [];
let picAdd1;
let picAdd2;

document.addEventListener("DOMContentLoaded", function(){
    let sliderPics = document.querySelectorAll('.dest-block');
    pics = [
        document.querySelectorAll('.dest-block')[1].cloneNode(true),
        document.querySelectorAll('.dest-block')[2].cloneNode(true),
        document.querySelectorAll('.dest-block')[3].cloneNode(true)
    ];
    for (let pic of pics){
        pic.classList.add('slow-hide');
    }
});


function slideToLeft() {
    if (allowMoving) {
        allowMoving = false;
        let sliderPics = document.querySelectorAll('.dest-block');
        if (sliderPics.length == 5) {
            //TODO: 5 pics
            let picAdd1;
            let picAdd2;
            if (sliderPics[0].classList.contains('dest-1')) {
                picAdd2 = pics[2].cloneNode(true);
                picAdd1 = pics[1].cloneNode(true);
            } else if (sliderPics[0].classList.contains('dest-2')) {
                picAdd2 = pics[0].cloneNode(true);
                picAdd1 = pics[2].cloneNode(true);
            } else {
                picAdd2 = pics[1].cloneNode(true);
                picAdd1 = pics[0].cloneNode(true);
            }
            document.querySelector('#slider').prepend(picAdd2);
            document.querySelector('#slider').prepend(picAdd1);
            setTimeout(() => {
                picAdd1.classList.remove('slow-hide');
                picAdd2.classList.remove('slow-hide');
            },20)
            setTimeout(() => {
                setPicIds();
                selectLeft();
                allowMoving = true;
            },300)
            //TODO: 5 pics
        } else {
            sliderPics[5].classList.add('slow-hide');
            sliderPics[6].classList.add('slow-hide');
            setTimeout(() => {
                document.querySelector('#slider').removeChild(sliderPics[5]);
                document.querySelector('#slider').removeChild(sliderPics[6]);

                setPicIds();
                selectLeft();
                allowMoving = true;
            },300)
        }
    }
}

function slideToRight() {
    if (allowMoving) {
        allowMoving = false;
        let sliderPics = document.querySelectorAll('.dest-block');
        if (sliderPics.length == 5) {
            let picAdd1;
            let picAdd2;
            if (sliderPics[4].classList.contains('dest-1')) {
                picAdd1 = pics[1].cloneNode(true);
                picAdd2 = pics[2].cloneNode(true);
            } else if (sliderPics[4].classList.contains('dest-2')) {
                picAdd1 = pics[2].cloneNode(true);
                picAdd2 = pics[0].cloneNode(true);
            } else {
                picAdd1 = pics[0].cloneNode(true);
                picAdd2 = pics[1].cloneNode(true);
            }
            document.querySelector('#slider').append(picAdd1);
            document.querySelector('#slider').append(picAdd2);
            setTimeout(() => {
                picAdd1.classList.remove('slow-hide');
                picAdd2.classList.remove('slow-hide');
            },20)
            setTimeout(() => {
                setPicIds();
                selectRight();
                allowMoving = true;
            },330)
            //TODO: 5 pics
        } else {
            sliderPics[0].classList.add('slow-hide');
            sliderPics[1].classList.add('slow-hide');
            setTimeout(() => {
                document.querySelector('#slider').removeChild(sliderPics[0]);
                document.querySelector('#slider').removeChild(sliderPics[1]);

                setPicIds();
                selectRight();
                allowMoving = true;
            },330)
        }
    }
}

function setPicIds() {
    let sliderPics = document.querySelectorAll('.dest-block');
    for(let i = 0; i < sliderPics.length; i++) {
        sliderPics[i].id = "pic-" + (i + 1);
    }
    setOnClicks()
}

function setOnClicks() {
    let sliderPics = document.querySelectorAll('.dest-block');
        if (sliderPics.length == 5) {
            document.getElementById('pic-1').setAttribute("onclick", "doNothing()")
            document.getElementById('pic-2').setAttribute("onclick", "slideToLeft()")
            document.getElementById('pic-3').setAttribute("onclick", "doNothing()")
            document.getElementById('pic-4').setAttribute("onclick", "slideToRight()")
            document.getElementById('pic-5').setAttribute("onclick", "doNothing()")
        } else {
            document.getElementById('pic-1').setAttribute("onclick", "doNothing()")
            document.getElementById('pic-2').setAttribute("onclick", "doNothing()")
            document.getElementById('pic-3').setAttribute("onclick", "slideToLeft()")
            document.getElementById('pic-4').setAttribute("onclick", "doNothing()")
            document.getElementById('pic-5').setAttribute("onclick", "slideToRight()")
            document.getElementById('pic-6').setAttribute("onclick", "doNothing()")
            document.getElementById('pic-7').setAttribute("onclick", "doNothing()")
        }
};

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
//
//function nullOnClicks() {
//    document.getElementById('pic-0').setAttribute("onclick", "doNothing()")
//    document.getElementById('pic-1').setAttribute("onclick", "doNothing()")
//    document.getElementById('pic-2').setAttribute("onclick", "doNothing()")
//    document.getElementById('pic-3').setAttribute("onclick", "doNothing()")
//    document.getElementById('pic-4').setAttribute("onclick", "doNothing()")
//    document.getElementById('pic-5').setAttribute("onclick", "doNothing()")
//};
//
