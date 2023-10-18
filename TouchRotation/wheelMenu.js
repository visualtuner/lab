let wheel_menu;
function WheelMenu(callback) {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

    let wheelMenu = document.getElementById("wheelMenu"),
        wheelMenuWrap = wheelMenu.parentElement,
        pieces = wheelMenu.querySelectorAll(".piece"),
        wheelMenuBounding = wheelMenu.getBoundingClientRect(),
        centerPoint = window.getComputedStyle(wheelMenu).transformOrigin,
        centers = centerPoint.split(" ");
    
    let centerY = wheelMenuBounding.top + parseInt(centers[1]) - window.pageYOffset,
        centerX = wheelMenuBounding.left + parseInt(centers[0]) - window.pageXOffset;

    let totalDegrees = 0;
    let startDegrees = 0;
    let lastDegrees = 0;
    let currentDegrees = 0;
    let activeIndex = 0;
    let target = null;
    let dragging = false;
    let targetDegrees = 0;
    let direction;
    let animationId = null;
    let start = null;
    let frameCount = 0;
    let justBeforeDegrees = 0;
    let acceleration = 0;
    let subMenuFlag = false;
    let wheelTouchStartPointX;
    let wheelTouchStartPointY;
    let wheelTouchEndPointX;
    let wheelTouchEndPointY;

    //함수
    let init;
    let calcDegrees;
    let onStart;
    let onMove;
    let onEnd;
    let update;
    let setBtnDegrees;
    let activeBtn;
    let inactiveBtn;
    let wheelTo;
    let wheelOn;
    let wheelOff;
    let subMenuOn;
    let subMenuOff;

    init = function() {
        wheelMenuBounding = wheelMenu.getBoundingClientRect();
        centerPoint = window.getComputedStyle(wheelMenu).transformOrigin;
        centers = centerPoint.split(" ");
        centerY = wheelMenuBounding.top + parseInt(centers[1]) - window.pageYOffset;
        centerX = wheelMenuBounding.left + parseInt(centers[0]) - window.pageXOffset;

        totalDegrees = 0;
        startDegrees = 0;
        lastDegrees = 0;
        currentDegrees = 0;
        activeIndex = 0;
        target = null;
        dragging = false;
        targetDegrees = 0;
        direction;
        animationId = null;
        start = null;
        frameCount = 0;
        justBeforeDegrees = 0;
        acceleration = 0;

        wheelTo(0);
    }

    wheelOn = function(speed) {
        subMenuOff();
        // wheelMenuWrap.parentElement.addEventListener('transitionend', function(){
        //     wheelMenuWrap.parentElement.removeEventListener('transitionend', arguments.callee);
        //     console.log('on');
        //     init();
        // });
        var timeoutSpeed = (speed != undefined) ? Number(speed.replace("ms","")) : 500;

        setTimeout(function(){
            init();
        }, timeoutSpeed );

        wheelTo(0, speed || "0.5s");
        wheelMenuWrap.style.transitionProperty = "all";
        wheelMenuWrap.style.transitionDuration = speed || "0.5s";
        wheelMenuWrap.style.willChange = 'transform';
        wheelMenuWrap.style.opacity = "1";
        wheelMenuWrap.style.transform = 'translateX(-50%) translateY(-50%) translateZ(0) scale(1)';
    }

    wheelOff = function(speed) {
        subMenuOff();
        // wheelMenuWrap.parentElement.addEventListener('transitionend', function(){
        //     wheelMenuWrap.parentElement.removeEventListener('transitionend', arguments.callee);
        //     console.log('off');
        //     init();
        //     wheelTo(180, "0s");
        // });
        var timeoutSpeed = (speed != undefined) ? Number(speed.replace("ms","")) : 500;

        setTimeout(function(){
            init();
            wheelTo(180, "0s");
        }, timeoutSpeed );
        
        wheelTo(lastDegrees + 180, speed || "0.5s");
        wheelMenuWrap.style.transitionProperty = "all";
        wheelMenuWrap.style.transitionDuration = speed || "0.5s";
        wheelMenuWrap.style.willChange = 'transform';
        wheelMenuWrap.style.opacity = "0";
        wheelMenuWrap.style.transform = 'translateX(-50%) translateY(-50%) translateZ(0) scale(0)';
    }

    subMenuOff = function(e) {
        subMenuFlag = false;

        for(let i = 0; i < pieces.length; i++){
            if( pieces[i].classList.contains('sub-menu-on') ) {
                pieces[i].classList.remove('sub-menu-on');
            }
        }
    }

    subMenuOn = function(e) {
        subMenuFlag = true;
        e.currentTarget.classList.add('sub-menu-on');
    }

    calcDegrees = function(e) {
        let pointerEvent = e;
        if (e.targetTouches && e.targetTouches[0]) {
            e.preventDefault();
            pointerEvent = e.targetTouches[0];
            mouseX = pointerEvent.pageX;
            mouseY = pointerEvent.pageY;
        } else {
            mouseX = e.clientX,
            mouseY = e.clientY;
        }

        let radians = Math.atan2(mouseX - centerX, mouseY - centerY);
        let degrees = (radians * (180 / Math.PI) * -1) + 180;
        return degrees;
    }

    onStart = function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        dragging = true;

        target = e.currentTarget;

        startDegrees = calcDegrees(e);
        currentDegrees = startDegrees;

        target.style.transition = 'none';
        target.style.willChange = 'transform';

        for(let i = 0; i < pieces.length; i++){
            pieces[i].querySelector(".btn").style.transition = "none";
            pieces[i].querySelector(".btn").style.willChange = 'transform';
        }

        animationId = requestAnimationFrame(update);

        wheelTouchStartPointX = e.changedTouches[0].clientX;
        wheelTouchStartPointY = e.changedTouches[0].clientY;
    }

    onMove = function(e) {
        dragging = true;
        
        currentDegrees = calcDegrees(e);

        wheelTouchEndPointX = e.changedTouches[0].clientX;
        wheelTouchEndPointY = e.changedTouches[0].clientY;
    }

    onEnd = function(e) {
        targetDegrees = 0;
        
        dragging = false;

        navigator.vibrate(0);

        targetDegrees = Math.round( Math.round(totalDegrees) / 45 ) * 45;
    }

    update = function(timestamp) {

        animationId = requestAnimationFrame(update);

        if (!target)
            return;

        if (dragging) {
            totalDegrees = lastDegrees + (currentDegrees - startDegrees);

            /*if(Math.abs(justBeforeDegrees - currentDegrees) > 1){
                navigator.vibrate(10000);

                subMenuOff();
            }else{
                navigator.vibrate(0);
            }*/

            wheelTouchDistX = Math.abs(wheelTouchStartPointX - wheelTouchEndPointX);
            wheelTouchDistY = Math.abs(wheelTouchStartPointY - wheelTouchEndPointY);

            if( wheelTouchDistX > 2 || wheelTouchDistY > 2  ) {
                navigator.vibrate(10000);

                subMenuOff();
            }else{
                navigator.vibrate(0);
            }

            wheelTouchStartPointX = wheelTouchEndPointX;
            wheelTouchStartPointY = wheelTouchEndPointY;
            

            acceleration = Math.min(Math.round(Math.abs(justBeforeDegrees - currentDegrees) * 0.25), 3);
            
            if(justBeforeDegrees > currentDegrees){
                direction = -1;
            }else{
                direction = 1;
            }

            justBeforeDegrees = currentDegrees;

        } else {
            navigator.vibrate(0);

            cancelAnimationFrame(animationId);
            
            totalDegrees = Math.round( Math.round(totalDegrees) / 45 ) * 45;
            relativeDegrees = Math.abs(totalDegrees - targetDegrees);
            totalDegrees = totalDegrees + (direction * relativeDegrees) + (direction * (45 * acceleration));
            

            target.style.transition = "all 0.2s";

            target.addEventListener('transitionstart', function() {
                cancelAnimationFrame(animationId);
                activeBtn(totalDegrees, callback);
                target.removeEventListener('transitionstart', arguments.callee);
            });

            target.addEventListener('transitionend', function() {
                cancelAnimationFrame(animationId);
                target.removeEventListener('transitionend', arguments.callee);
            });

            for(let i = 0; i < pieces.length; i++){
                pieces[i].querySelector(".btn").style.transition = "all 0.2s";
            }
        }

        target.style.transform = 'rotate(' + totalDegrees + 'deg)';
        setBtnDegrees(totalDegrees);

        
        // User has finished dragging.
        if (dragging)
            return;

        lastDegrees = totalDegrees % 360;
    }
    
    setBtnDegrees = function(parentDegrees) {
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].querySelector(".btn").style.transform = 'translateX(-50%) translateY(-50%) rotate(' + -1 * (parentDegrees + (i * 45)) + 'deg)';
        }
    }

    activeBtn = function(targetDegrees, callback) {
        inactiveBtn();

        let trackingNumber = (targetDegrees/45) % 8;

        if(trackingNumber == 0){pieces[0].querySelector(".btn").classList.add("act"); activeIndex = 0; }
        else if(trackingNumber == 1 || trackingNumber == -7){pieces[7].querySelector(".btn").classList.add("act"); activeIndex = 7; }
        else if(trackingNumber == 2 || trackingNumber == -6){pieces[6].querySelector(".btn").classList.add("act"); activeIndex = 6; }
        else if(trackingNumber == 3 || trackingNumber == -5){pieces[5].querySelector(".btn").classList.add("act"); activeIndex = 5; }
        else if(trackingNumber == 4 || trackingNumber == -4){pieces[4].querySelector(".btn").classList.add("act"); activeIndex = 4; }
        else if(trackingNumber == 5 || trackingNumber == -3){pieces[3].querySelector(".btn").classList.add("act"); activeIndex = 3; }
        else if(trackingNumber == 6 || trackingNumber == -2){pieces[2].querySelector(".btn").classList.add("act"); activeIndex = 2; }
        else if(trackingNumber == 7 || trackingNumber == -1){pieces[1].querySelector(".btn").classList.add("act"); activeIndex = 1; }

        if(callback != undefined) {
            callback(activeIndex);
        }
        

    }

    inactiveBtn = function() {
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].querySelector(".btn").classList.remove("act");
        }
    }

    wheelTo = function(degrees,speed){
        wheelMenu.addEventListener('transitionend', function(){
            wheelMenu.removeEventListener('transitionend', arguments.callee);
        });
        wheelMenu.style.transitionProperty = "all";
        wheelMenu.style.transitionDuration = speed || "0.2s";
        wheelMenu.style.transform = 'rotate(' + degrees + 'deg)';

        pieces.forEach(function(currentElement) {
            currentElement.querySelector(".btn").style.transitionProperty = "all";
            currentElement.querySelector(".btn").style.transitionDuration = speed || "0.2s";
            currentElement.querySelector(".btn").addEventListener('transitionend', function() {
                this.style.transition = 'none';
                this.removeEventListener('transitionend', arguments.callee);
            });
        });

        setBtnDegrees(degrees);
        activeBtn(degrees);

        lastDegrees = degrees % 360;
    }

    wheelMenu.addEventListener('touchend', onEnd);
    wheelMenu.addEventListener('touchmove', onMove);
    wheelMenu.addEventListener('touchstart', onStart);

    pieces.forEach(function(pieceElem, index) {
        let btnTouchStartPointX;
        let btnTouchStartPointY;
        let btnTouchEndPointX;
        let btnTouchEndPointY;
        let btnTouchDistX;
        let btnTouchDistY;
        let btnTouchEndTimeJudge;
        let btnTouchEndTimeout;

        pieceElem.querySelector('.btn').addEventListener("touchstart", function(e) {
            btnTouchStartPointX = e.changedTouches[0].clientX;
            btnTouchStartPointY = e.changedTouches[0].clientY;

            btnTouchEndTimeJudge = true;

            navigator.vibrate(100);

            btnTouchEndTimeout = setTimeout(function(){
                btnTouchEndTimeJudge = false;
            },600);

            pieceElem.querySelector('.btn').classList.remove('active-motion');

        });

        pieceElem.querySelector('.btn').addEventListener("touchend", function(e) {
            btnTouchEndPointX = e.changedTouches[0].clientX;
            btnTouchEndPointY = e.changedTouches[0].clientY;
            btnTouchDistX = Math.abs(btnTouchStartPointX - btnTouchEndPointX);
            btnTouchDistY = Math.abs(btnTouchStartPointY - btnTouchEndPointY);
            
            if( btnTouchEndTimeJudge ){
                if( btnTouchDistX < 4 && btnTouchDistY < 4  ) {
                    pieceElem.querySelector('.btn').click();

                    pieceElem.classList.add('sub-menu-on');

                    pieceElem.querySelector('.btn').classList.add('active-motion');

                    for(let i = 0; i < pieces.length; i++){
                        if( i != index ) {
                            pieces[i].classList.remove('sub-menu-on');
                            pieces[i].querySelector('.btn').classList.remove('active-motion');
                        }
                    }
                }
            }else{
                return;
            }

            clearTimeout(btnTouchEndTimeout);
        });

        if( pieceElem.querySelector('.btn .wheel-sub-menu') != null) {
            pieceElem.querySelector('.btn .wheel-sub-menu').addEventListener('touchstart', function(e) {
                e.stopPropagation();
            });
            pieceElem.querySelector('.btn .wheel-sub-menu').addEventListener('touchmove', function(e) {
                e.stopPropagation();
            });
            pieceElem.querySelector('.btn .wheel-sub-menu').addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }

    });

    // wheelTo(0,"0ms");
    wheelOff("0ms");

    return {
        activeIndex: activeIndex,
        wheelTo: wheelTo,
        wheelOn: wheelOn,
        wheelOff: wheelOff,
        subMenuFlag: subMenuFlag,
        subMenuOn: subMenuOn,
        subMenuOff: subMenuOff,
        init: init,
    };

    
}

document.addEventListener("DOMContentLoaded", function(){
    wheel_menu = new WheelMenu(afterWheel);
});

window.addEventListener("resize", function(){
    wheelMenuItemOff("300ms");
});

document.querySelector(".quick-menu-item .dim").onclick = function(evt) {
    wheelMenuItemOff("300ms");
}

document.querySelector(".wheel-menu-toggle-btn").onclick = function(evt) {
    evt.currentTarget.parentElement.classList.toggle('on');
    if(evt.currentTarget.parentElement.classList.contains('on')){
        wheelMenuItemOn("500ms");
    }else{
        wheelMenuItemOff("300ms");
    }
}

/*document.querySelectorAll(".wheel-menu .btn").onclick = function(){
    console.log('click');
}*/

function afterWheel(activeIndex){
    document.querySelectorAll(".quick-menu-info").forEach((element) => {
        element.classList.remove('on');
    });
    document.querySelector(".quick-menu-info:nth-of-type("+ (activeIndex + 1) +")").classList.add('on');
}

function wheelMenuItemOff(speed) {
    document.querySelector(".quick-menu-item").classList.remove('on');
    document.querySelector(".wheel-menu-item").style.transitionDuration = speed;
    document.querySelector(".wheel-menu-item").classList.remove('on');
    wheel_menu.wheelOff(speed);

    document.querySelectorAll(".quick-menu-info").forEach((element) => {
        element.classList.remove('on');
    });
}

function wheelMenuItemOn(speed) {
    document.querySelector(".quick-menu-item").classList.add('on');
    document.querySelector(".wheel-menu-item").style.transitionDuration = speed;
    document.querySelector(".wheel-menu-item").classList.add('on');
    wheel_menu.wheelOn(speed);

    document.querySelector(".quick-menu-info:nth-of-type(1)").style.transitionDelay = speed;
    document.querySelector(".quick-menu-info:nth-of-type(1)").classList.add('on');
    document.querySelector(".quick-menu-info:nth-of-type(1)").clientHeight;
    document.querySelector(".quick-menu-info:nth-of-type(1)").style.transitionDelay = "initial";
}