window.onload=function() {
    //initial state
    let temp = {
        currentTool: '',
        currentColor: 'rgb(0, 128, 0)',
        prevColor: 'rgb(204, 204, 204)',
    };
    localStorage.setItem("myState", JSON.stringify(temp));
    let state = JSON.parse(localStorage.getItem("myState"));


    //SET CURRENT AND PREV COLORS IN HTML
    document.getElementById('currentColorImg').style.backgroundColor = state.currentColor;
    document.getElementById('prevColorImg').style.backgroundColor = state.prevColor;


    /*_________________________________________________*/

    //CHOOSE TOOL BUCKET
    ifBucket(document.getElementById('bucket'));

    function ifBucket(elem) {
        elem.onclick = function () {
            if (state.currentTool === 'bucket') {
                state.currentTool = '';
                localStorage.setItem("myState", JSON.stringify(state));
                document.getElementById('bucket').style.backgroundColor = '';
            }
            else {
                //reset colors of others elements
                document.getElementById('transform').style.backgroundColor = '';
                document.getElementById('move').style.backgroundColor = '';
                document.getElementById('picker').style.backgroundColor = '';

                state.currentTool = 'bucket';
                localStorage.setItem("myState", JSON.stringify(state));
                document.getElementById('bucket').style.backgroundColor = 'red';
            }
        }
    }

    /*_________________________________________________*/

    //CHOOSE TOOL TRANSFORM
    ifTransform(document.getElementById('transform'));

    function ifTransform(elem) {
        elem.onclick = function () {
            if (state.currentTool === 'transform') {
                state.currentTool = '';
                localStorage.setItem("myState", JSON.stringify(state));
                document.getElementById('transform').style.backgroundColor = '';
            }
            else {
                //reset colors of others elements
                document.getElementById('bucket').style.backgroundColor = '';
                document.getElementById('move').style.backgroundColor = '';
                document.getElementById('picker').style.backgroundColor = '';

                state.currentTool = 'transform';
                localStorage.setItem("myState", JSON.stringify(state));
                document.getElementById('transform').style.backgroundColor = 'red';
            }
        }
    }


    /*_________________________________________________*/

    //COLOR PICKER CHOOSE TOOL
    ifPicker(document.getElementById('picker'));

    function ifPicker(elem) {
        elem.onclick = function () {
            if (state.currentTool === 'picker') {
                state.currentTool = '';
                localStorage.setItem("myState", JSON.stringify(state));
                document.getElementById('picker').style.backgroundColor = '';
            }
            else {
                //reset colors of others elements
                document.getElementById('bucket').style.backgroundColor = '';
                document.getElementById('move').style.backgroundColor = '';
                document.getElementById('transform').style.backgroundColor = '';

                state.currentTool = 'picker';
                localStorage.setItem("myState", JSON.stringify(state));
                document.getElementById('picker').style.backgroundColor = 'red';
            }
        }
    }


    /*_________________________________________________*/

    //CHOOSE RED AND BLUE COLORS BY PICKER
    chooseColor(document.querySelector('#Blue'));
    chooseColor(document.querySelector('#Red'));
    chooseColor(document.querySelector('#prevColor'));

    function chooseColor(elem) {
        let style = getComputedStyle(elem.childNodes[0]);
        elem.onclick = function () {
            if (state.currentColor !== style.backgroundColor && state.currentTool === 'picker') {
                let temp = state.currentColor;
                state.currentColor = style.backgroundColor;
                state.prevColor = temp;
                localStorage.setItem("myState", JSON.stringify(state));
                //SET CURRENT AND PREV COLORS IN HTML
                document.getElementById('currentColorImg').style.backgroundColor = state.currentColor;
                document.getElementById('prevColorImg').style.backgroundColor = state.prevColor;
            }
        }
    }


    /*_________________________________________________*/

    //KEYBOARD   m - move; p - picker; t - transform; b - color bucket tool;
    document.addEventListener('keydown', function (event) {
        let doEvent = new Event('click');
        if (event.key === 'p') {
            document.getElementById('picker').dispatchEvent(doEvent);
        }
        if (event.key === 'b') {
            document.getElementById('bucket').dispatchEvent(doEvent);
        }
        if (event.key === 't') {
            document.getElementById('transform').dispatchEvent(doEvent);
        }
        if (event.key === 'm') {
            document.getElementById('move').dispatchEvent(doEvent);
        }
    });

    /*_________________________________________________*/

    //CHOOSE MOVE TOOL
    ifMove(document.getElementById('move'));

    function ifMove(elem) {
        elem.onclick = function () {
            if (state.currentTool === 'move') {
                state.currentTool = '';
                localStorage.setItem("myState", JSON.stringify(state));
                document.getElementById('move').style.backgroundColor = '';
            }
            else {
                //reset colors of others elements
                document.getElementById('bucket').style.backgroundColor = '';
                document.getElementById('picker').style.backgroundColor = '';
                document.getElementById('transform').style.backgroundColor = '';

                state.currentTool = 'move';
                localStorage.setItem("myState", JSON.stringify(state));
                document.getElementById('move').style.backgroundColor = 'red';
            }
        }
    }

    /*_________________________________________________*/

    //CANVAS_ITEM FUNCTIONAL
    let count = false; //indicators for move tool
    let orderTemp; //indicators for move tool
    let elemTemp;
    Array.from(document.getElementsByClassName('canvas_item')).forEach(elem => {
        elem.onclick = function itemClick() {
            let style = getComputedStyle(elem);
            //bucket listener
            if (state.currentTool === 'bucket') {
                elem.style.backgroundColor = state.currentColor;
            }
            //transform listener
            if (state.currentTool === 'transform') {
                if (elem.style.borderRadius === '') {
                    elem.style.borderRadius = 'calc((60vh - 20px) / 3)';
                }
                else {
                    elem.style.borderRadius = '';
                }
            }
            //color picker listener
            if (state.currentTool === 'picker') {
                //check for duplicate colors
                if (style.backgroundColor !== state.currentColor) {
                    let temp = state.currentColor;
                    state.currentColor = style.backgroundColor;
                    state.prevColor = temp;
                    localStorage.setItem("myState", JSON.stringify(state));
                    //SET CURRENT AND PREV COLORS IN HTML
                    document.getElementById('currentColorImg').style.backgroundColor = state.currentColor;
                    document.getElementById('prevColorImg').style.backgroundColor = state.prevColor;
                }
            }

            if (state.currentTool === 'move') {
                if (count === false) {
                    orderTemp = style.order; //set order element to move
                    elemTemp = elem;
                    count = !count;
                }
                else {
                    elem.style.order = orderTemp;
                    elemTemp.style.order = style.order;
                    count = !count;
                }
            }
        }
    });
    /*_________________________________________________*/
};
