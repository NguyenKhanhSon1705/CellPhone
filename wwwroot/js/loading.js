export function LoadingStart() {
    console.log("test");
    let boby = document.body
    let div = document.createElement('div');
    div.classList.add('loading');
    let html = `
        <div class="loader">
            <div class="inner one"></div>
            <div class="inner two"></div>
            <div class="inner three"></div>
        </div>
    `
    div.innerHTML = html;
    boby.append(div);
}

export function LoadingStop() {
    $(".loading").remove()
}

// export function Toast() {
//     var newdiv = document.createElement("div");
//     newdiv.classList.add('toast-container')
//     let html =
//         `
//         <div class="card">
//             <div class="card-body">
//                 <h4 class="card-title">Toastr Top Right</h4>
//                 <div class="card-content">
//                     <div class="toastr m-t-15">
//                         <div class="text-left">
//                             <button type="button" class="btn btn-success m-b-10 m-l-5" id="toastr-success-top-right">Success</button>
//                             <button type="button" class="btn btn-info m-b-10 m-l-5" id="toastr-info-top-right">Info</button>
//                             <button type="button" class="btn btn-warning m-b-10 m-l-5" id="toastr-warning-top-right">Warning</button>
//                             <button type="button" class="btn btn-danger m-b-10 m-l-5" id="toastr-danger-top-right">Error</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//             `
//     newdiv.appendChild(html);

// }
// export function toast(){
//     let boby = document.body
//     let div = document.createElement('div');
    
//     let html = `
//     <h1>dkafj;lkd</h1>
//         <div class="loader">
//             <div class="inner one"></div>
//             <div class="inner two"></div>
//             <div class="inner three"></div>
//         </div>
//     `
//     div.innerHTML = html;
//     boby.append(div);
//     // var click = document.getElementById("toastr-success-top-right")
//     // click.addEventListener("click", function(){
//     //     alert();
//     //      toastr.success("This Is Success Message", "Top Right", { timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, positionClass: "toast-top-right", preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
//     // })

// }