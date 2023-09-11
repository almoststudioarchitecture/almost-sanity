    var animating = false;
    var firstLoad = false;

    var main = document.querySelector("main");
    main.addEventListener("click", function (event) {
        if (!event.target.matches('[data-type="page-transition"]')) return;
        event.preventDefault();
        var newPage = event.target.getAttribute("href");
        // if (!animating) changePage(newPage, true);
        // firstLoad = true;

        // let urlExtension = targetElement.getAttribute("data-href"); // This is just a placeholder; replace with your actual URL extension
        // Ensure there's no trailing slash
    // let currentPath = window.location.pathname;
    // if (currentPath.endsWith('/')) {
    //     currentPath = currentPath.slice(0, -1);
    // }

    // console.log(window.location.origin, currentPath, urlExtension);

    window.location.href = window.location.origin + newPage;
    });

    // window.addEventListener("popstate", function () {
    //     if (firstLoad) {
    //         var newPageArray = location.pathname.split("/");
    //         var newPage = newPageArray[newPageArray.length - 1];
    //         if (!animating) changePage(newPage, false);
    //     }
    //     firstLoad = true;
    // });

    // function changePage(url, bool) {
    //     animating = true;
    //     document.body.classList.add("page-is-changing");

    //     // var loadingBar = document.querySelector(".cd-loading-bar");
    //     var mainStroke = document.querySelector('.svgWrapper.hover');
    //     mainStroke.classList.add("page-transition-main-stroke")
    //     var transitionEndEvents = [
    //         "webkitTransitionEnd",
    //         "otransitionend",
    //         "oTransitionEnd",
    //         "msTransitionEnd",
    //         "transitionend",
    //     ];

    //     function transitionEndHandler() {
    //         loadNewContent(url, bool);
    //         transitionEndEvents.forEach(function (eventName) {
    //             mainStroke.removeEventListener(eventName, transitionEndHandler);
    //         });
    //     }

    //     transitionEndEvents.forEach(function (eventName) {
    //         mainStroke.addEventListener(eventName, transitionEndHandler);
    //     });

    //     if (!transitionsSupported()) loadNewContent(url, bool);
    // }

    // function loadNewContent(url, bool) {
    //     url = "" === url ? "index.html" : url;
    //     var newSectionClass = "cd-" + url.replace(".html", "");
    //     var section = document.createElement("div");
    //     section.classList.add("cd-main-content", newSectionClass);

    //     var xhr = new XMLHttpRequest();
    //     xhr.open("GET", url, true);
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState === 4 && xhr.status === 200) {
    //             var tempDiv = document.createElement("div");
    //             tempDiv.innerHTML = xhr.responseText;
    //             var newMainContent = tempDiv.querySelector('main');
    //             // newMainContent.querySelector(".section.hero").style.visibility="hidden";
                
    //             const styleElems = tempDiv.querySelectorAll('link[rel="stylesheet"]');
    //             // if (newMainContent) {
    //             //     main.innerHTML = newMainContent.innerHTML;
    //             // }
    //             for (let styleElem of styleElems){
    //                 document.head.appendChild(styleElem);
    //             }
                
    //             // var delay = transitionsSupported() ? 1200 : 0;
    //             var delay = 1200;
    //             setTimeout(function(){
    //                 if (newMainContent) {
    //                     main.innerHTML = newMainContent.innerHTML;
    //                 }
    //                 setTimeout(function(){
    //                     document.body.classList.remove("page-is-changing");
    //                 },200)
    //             },1000)
    //             // setTimeout(function () {
    //             //     // if (section.classList.contains("cd-project")) {
    //             //     //     document.body.classList.add("cd-project");
    //             //     // } else {
    //             //     //     document.body.classList.remove("cd-project");
    //             //     // }
                    
    //             //     // for (let styleElem of styleElems){
    //             //     //     document.head.appendChild(styleElem);
    //             //     // }
    //             //     document.body.classList.remove("page-is-changing");

    //             //     // var loadingBar = document.querySelector(".cd-loading-bar");
    //             //     var transitionEndEvents = [
    //             //         "webkitTransitionEnd",
    //             //         "otransitionend",
    //             //         "oTransitionEnd",
    //             //         "msTransitionEnd",
    //             //         "transitionend",
    //             //     ];

    //             //     function transitionEndHandler() {
    //             //         animating = false;
    //             //         transitionEndEvents.forEach(function (eventName) {
    //             //             // loadingBar.removeEventListener(eventName, transitionEndHandler);
    //             //         });
    //             //     }

    //             //     transitionEndEvents.forEach(function (eventName) {
    //             //         // loadingBar.addEventListener(eventName, transitionEndHandler);
    //             //     });

    //             //     if (!transitionsSupported()) animating = false;
    //             // }, delay);

    //             if (url !== window.location && bool) {
    //                 window.history.pushState({ path: url }, "", url);
    //             }
    //         }
    //     };
    //     xhr.send();
    // }

    // function transitionsSupported() {
    //     return document.documentElement.classList.contains("csstransitions");
    // }