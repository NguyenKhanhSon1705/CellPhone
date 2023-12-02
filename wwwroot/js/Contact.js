import { GetList, DetailsItem, deleteItem } from "./Ajax/Ajax.js";
import { ConvertDate } from "./Ajax/Convert.js";


GetList('/admin/contact/IndexJson', listContact)
$(document).on('click', '.DetailsContact', function () {
    DetailsItem('/admin/contact/details', $(this).data('id'), ViewDetailsContact);
});


$(document).on('click', '.buttonDelete', function () {
    deleteItem('/admin/contact/Delete/', $(this).data('id'), callback);
    function callback(data) {
        if (data.code === 200) {
            GetList('/admin/contact/IndexJson', listContact)
        }
    }

});

function listContact(data) {
    $(".listContact").empty();
    $.each(data.list, (index, value) => {
        let html = `
                <tr>
                    <td>${value.fullName}</td>
                    <td>${value.email}</td>
                    <td>${ConvertDate(value.dateSend, false)}</td>
                    <td>${value.status ? "Đã xem" : "Mới"}</td>
                    <td>
                        <button  class="DetailsContact p-1 border-0 rounded c-cursor-poiter" data-id="${value.id}">
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M683.505911 480.221671c-123.691491 0-224.309725 100.628474-224.309725 224.309725S559.814421 928.841122 683.505911 928.841122s224.309725-100.628474 224.309726-224.309726-100.618235-224.309725-224.309726-224.309725z m0 405.892716c-100.117555 0-181.584015-81.456221-181.584014-181.584014s81.46646-181.584015 181.584014-181.584015 181.584015 81.456221 181.584015 181.584015S783.622442 886.114387 683.505911 886.114387z" fill="#22C67F" /><path d="M160.117235 843.388676V159.779353c0-11.776729 9.586638-21.362343 21.362343-21.362344h555.433216c11.776729 0 21.362343 9.586638 21.362343 21.362344v256.35324h42.725711V159.779353c0-35.340426-28.747628-64.088054-64.088054-64.088054H181.479578c-35.340426 0-64.088054 28.747628-64.088054 64.088054v683.609323c0 35.340426 28.747628 64.088054 64.088054 64.088055h256.353241v-42.725711H181.479578c-11.776729 0.001024-21.362343-9.585614-21.362343-21.362344z" fill="#22C67F" /><path d="M224.205289 266.593118h491.344137v42.72571H224.205289zM224.205289 480.221671h234.990897v42.725711H224.205289zM224.205289 693.849201h149.539476v42.725711H224.205289zM768.956309 666.478698h-49.23455l42.975539-42.975538c8.344665-8.344665 8.344665-21.863023 0-30.208713s-21.863023-8.344665-30.208713 0l-48.984721 48.983698-48.983698-48.983698c-8.344665-8.344665-21.863023-8.344665-30.208713 0-8.344665 8.344665-8.344665 21.863023 0 30.208713l42.975539 42.975538H598.05449c-11.807446 0-21.362343 9.565137-21.362344 21.362344s9.554898 21.362343 21.362344 21.362343h64.088054v27.371527h-32.044539c-11.808469 0-21.363367 9.565137-21.363367 21.362343s9.554898 21.362343 21.363367 21.362343h32.044539v21.362344c0 11.797207 9.554898 21.362343 21.362343 21.362343 11.808469 0 21.362343-9.565137 21.362344-21.362343v-21.362344h32.044539c11.807446 0 21.362343-9.565137 21.362343-21.362343s-9.554898-21.362343-21.362343-21.362343h-32.044539v-27.371527h64.088054c11.808469 0 21.362343-9.565137 21.362343-21.362343 0.002048-11.797207-9.55285-21.362343-21.361319-21.362344z" fill="#74E8AE" /></svg>
                        </button>
                        <button class="buttonDelete p-1 mx-1 border-0 rounded c-cursor-poiter" data-id="${value.id}">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fb3232"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                    </td>
                </tr>
                `
        $(".listContact").append(html)
    })
}

function ViewDetailsContact(data) {
    let body = document.querySelector('.content-body');
    let div = document.createElement('div')
    div.classList.add("details")
    var details = `
            <div class="c-transparent-bg preve-close">
                <div class="c-form d-flex justify-content-center align-items-center">
                    <div class="animate c-m-e-20 bg-white c-boxshow  rounded p-4 c-w-60 text-dark">
                        <div class="row border-bottom">
                            <div class="col l-6">
                                <label class="p-1 c-font-weight">Người gửi: </label>
                                <label class="p-1  border-bottom  ">${data.details.fullName}</label>
                            </div>
                            <div class="col l-6 ">
                                <label class="p-1 c-font-weight ">Email: </label>
                                <label class="p-1  border-bottom  ">${data.details.email} </label>
                            </div>
                        </div>
                        <div class="row border-bottom">
                            <div class="col l-6">
                                <label class="p-1 c-font-weight">Số điện thoại: </label>
                                <label class="p-1  border-bottom  ">${data.details.phone}</label>
                            </div>
                            <div class="col l-6">
                                <label class="p-1 c-font-weight">Ngày gửi: </label>
                                <label class="p-1  border-bottom  ">${ConvertDate(data.details.dateSend)}</label>
                            </div>
                        </div>
                        <div class="row border-bottom">
                            <div class="col l-12">
                                <label class="p-1 center c-font-weight">Nội dung</label>
                                <label class="p-1 center ">${data.details.message}</label>
                            </div>
                        </div>
                        <div class="p-1  d-flex justify-content-between">
                            <div class="">
                                <label class="c-font-weight">Trạng thái: </label>
                                <label>${data.details.status ? "Đã xem" : "Chưa xem"}</label>
                            </div>
                            <button class=" closebtn c-btn-yes" >Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
    `
    $(document).on('click', '.preve-close', function () {
        div.remove()
    });
    $(document).on('click', '.c-form', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.closebtn', function () {
        div.remove()
    });
    div.innerHTML = details
    body.append(div)
}

