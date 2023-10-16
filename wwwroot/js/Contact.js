
import { GetList, DetailsItem, deleteItem } from "./Ajax/Ajax.js";
     GetList('/admin/contact/ViewContact', listContact)

$(document).on('click', '.DetailsContact', function() {
    DetailsItem('/admin/contact/details',this.getAttribute('data'), ViewDetailsContact);
});
$(document).on('click', '.closebtn', function() {
    $(".details").empty()
});

$(document).on('click', '.buttonDelete', function() {
        deleteItem('/admin/contact/Delete/',this.getAttribute('data') , s);
        function s(data){
            if(data == 200){
                GetList('/admin/contact/ViewContact', listContact)
            }
        }
        
});

function listContact(data) {
    $(".listContact").empty();
    $.each(data.list, (index, value) => {
        let html = `
                <tr>
                    <td> ${index}</td>
                    <td>${value.fullName}</td>
                    <td>${value.email}</td>
                    <td>${value.dateSend}</td>
                    <td>${value.status ? "Đã xem" : "Mới"}</td>
                    <td>
                        <button  class="DetailsContact p-1 border-0 rounded c-cursor-poiter" data="${value.id}">
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M683.505911 480.221671c-123.691491 0-224.309725 100.628474-224.309725 224.309725S559.814421 928.841122 683.505911 928.841122s224.309725-100.628474 224.309726-224.309726-100.618235-224.309725-224.309726-224.309725z m0 405.892716c-100.117555 0-181.584015-81.456221-181.584014-181.584014s81.46646-181.584015 181.584014-181.584015 181.584015 81.456221 181.584015 181.584015S783.622442 886.114387 683.505911 886.114387z" fill="#22C67F" /><path d="M160.117235 843.388676V159.779353c0-11.776729 9.586638-21.362343 21.362343-21.362344h555.433216c11.776729 0 21.362343 9.586638 21.362343 21.362344v256.35324h42.725711V159.779353c0-35.340426-28.747628-64.088054-64.088054-64.088054H181.479578c-35.340426 0-64.088054 28.747628-64.088054 64.088054v683.609323c0 35.340426 28.747628 64.088054 64.088054 64.088055h256.353241v-42.725711H181.479578c-11.776729 0.001024-21.362343-9.585614-21.362343-21.362344z" fill="#22C67F" /><path d="M224.205289 266.593118h491.344137v42.72571H224.205289zM224.205289 480.221671h234.990897v42.725711H224.205289zM224.205289 693.849201h149.539476v42.725711H224.205289zM768.956309 666.478698h-49.23455l42.975539-42.975538c8.344665-8.344665 8.344665-21.863023 0-30.208713s-21.863023-8.344665-30.208713 0l-48.984721 48.983698-48.983698-48.983698c-8.344665-8.344665-21.863023-8.344665-30.208713 0-8.344665 8.344665-8.344665 21.863023 0 30.208713l42.975539 42.975538H598.05449c-11.807446 0-21.362343 9.565137-21.362344 21.362344s9.554898 21.362343 21.362344 21.362343h64.088054v27.371527h-32.044539c-11.808469 0-21.363367 9.565137-21.363367 21.362343s9.554898 21.362343 21.363367 21.362343h32.044539v21.362344c0 11.797207 9.554898 21.362343 21.362343 21.362343 11.808469 0 21.362343-9.565137 21.362344-21.362343v-21.362344h32.044539c11.807446 0 21.362343-9.565137 21.362343-21.362343s-9.554898-21.362343-21.362343-21.362343h-32.044539v-27.371527h64.088054c11.808469 0 21.362343-9.565137 21.362343-21.362343 0.002048-11.797207-9.55285-21.362343-21.361319-21.362344z" fill="#74E8AE" /></svg>
                        </button>
                        <button class="buttonDelete p-1 border-0 rounded c-cursor-poiter" data="${value.id}">
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M154 260h568v700H154z" fill="#FF3B30" /><path d="M624.428 261.076v485.956c0 57.379-46.737 103.894-104.391 103.894h-362.56v107.246h566.815V261.076h-99.864z" fill="#030504" /><path d="M320.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883zM543.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883z" fill="#152B3C" /><path d="M721.185 345.717v-84.641H164.437z" fill="#030504" /><path d="M633.596 235.166l-228.054-71.773 31.55-99.3 228.055 71.773z" fill="#FF3B30" /><path d="M847.401 324.783c-2.223 0-4.475-0.333-6.706-1.034L185.038 117.401c-11.765-3.703-18.298-16.239-14.592-27.996 3.706-11.766 16.241-18.288 27.993-14.595l655.656 206.346c11.766 3.703 18.298 16.239 14.592 27.996-2.995 9.531-11.795 15.631-21.286 15.631z" fill="#FF3B30" /></svg>
                        </button>
                    </td>
                </tr>
                `
        $(".listContact").append(html)
    })
}

function ViewDetailsContact(data) {
    var details = `
            <div class="c-transparent-bg">
                <div class="d-flex justify-content-center align-items-center h-100">
                    <div class="confirm c-m-e-20 bg-white c-boxshow  rounded p-4 c-w-60 text-dark">
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
                                <label class="p-1  border-bottom  ">${data.details.dateSend}</label>
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
                            <button class=" closebtn  btn c-btn-yes" >Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
    `
    document.querySelector('.details').innerHTML = details;
}



// function deleteItem() {
//     let btn = `
//         <div class="c-transparent-bg">
//             <div class=" d-flex justify-content-center align-items-center h-100">
//                 <div class="confirm p-4 bg-white c-boxshow rounded">
//                     <div class="text-center">
//                         <div>
//                             <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
//                             <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path
//                                     d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
//                                     stroke="#d5541d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                             </svg>
//                         </div>
//                         <h4 class="center p-3">Bạn có chắc chắn muốn xóa không</h4>
//                     </div>
//                     <div class="d-flex justify-content-around">
//                         <button class="btn c-btn-no" onclick="callback(${false})">Hủy</button>
//                         <button class="btn c-btn-yes" onclick="callback(${true})">Tôi đồng ý</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       `
      
//     $(".confirm").append(btn)
// }