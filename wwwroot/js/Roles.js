import { Validate } from "./validateform.js";
import { GetList, deleteItem, CreateItem, EditItem } from "./Ajax/Ajax.js";
import { toast } from './loading.js'

GetList('/admin/role/jsonindex', listRole)

// get danh sách role
function listRole(data) {
    $(".list").empty();
    $.each(data.data, (index, value) => {
        let html = `
                <tr>
                    <td> ${index}</td>
                    <td><input readonly name="name" class="input" value="${value.name}"></input></td>
                    <td>${value.claims}</td>
                    <td>
                        <button title="Chỉnh sửa"  class="DetailsRole p-1 border-0 rounded c-cursor-poiter" data-id="${value.id}">
                        <svg width="20px" height="20px" viewBox="-2.1 -2.1 25.20 25.20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit_cover [#3fe972]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-419.000000, -359.000000)" fill="#6cf962"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z" id="edit_cover-[#3fe972]"> </path> </g> </g> </g> </g></svg>
                           </button>
                        <button title="Xóa" class="buttonDelete p-1 border-0 rounded c-cursor-poiter" data-id="${value.id}">
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M154 260h568v700H154z" fill="#FF3B30" /><path d="M624.428 261.076v485.956c0 57.379-46.737 103.894-104.391 103.894h-362.56v107.246h566.815V261.076h-99.864z" fill="#030504" /><path d="M320.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883zM543.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883z" fill="#152B3C" /><path d="M721.185 345.717v-84.641H164.437z" fill="#030504" /><path d="M633.596 235.166l-228.054-71.773 31.55-99.3 228.055 71.773z" fill="#FF3B30" /><path d="M847.401 324.783c-2.223 0-4.475-0.333-6.706-1.034L185.038 117.401c-11.765-3.703-18.298-16.239-14.592-27.996 3.706-11.766 16.241-18.288 27.993-14.595l655.656 206.346c11.766 3.703 18.298 16.239 14.592 27.996-2.995 9.531-11.795 15.631-21.286 15.631z" fill="#FF3B30" /></svg>
                        </button>
                    </td>
                </tr>
                `
        $(".list").append(html)
    })
}


$(document).on('click', '.create-role', function () {
    CreateRole();
})

// thêm mới role
function CreateRole() {
    let body = document.querySelector('.content-body');
    let div = document.createElement('div')
    div.classList.add("details")
    var form = `
            <div class="c-transparent-bg preve-close">
            <div class="c-form d-flex justify-content-center align-items-center">
                <div class="animate c-m-e-20 bg-white c-boxshow  rounded p-4 c-w-60 text-dark">
                    <form id="Create-Role" class="">
                        <h3>Thêm mới vai trò (Role)</h3>
                        <div class="form-group form-field">
                            <input id="name" name="name" rule="required" type="text" placeholder=" "
                                class="form-input form-error form-control">
                            <label for="name" class="form-label">Tên vai trò</label>
                            <span class="form-message"></span>
                        </div>
                        <div class="d-flex form-field justify-content-between">
                            <button type="submit" class="form-submit button box-shadow">Thêm mới</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
    `
    div.innerHTML = form;
    body.append(div);

    Validate('#Create-Role', (data) => {
        CreateItem('/admin/role/CreateRole', data, function (data) {
            if (data.code === 200) {
                GetList('/admin/role/jsonindex', listRole)
                div.remove();
            }
        })
    })
    $(document).on('click', '.preve-close', function () {
        div.remove()
    });
    $(document).on('click', '.c-form', function (e) {
        e.stopPropagation();
    });
}

// xóa role
$(document).on('click', '.buttonDelete', function () {
    deleteItem('/admin/role/DeleteRole', $(this).data('id'), callback);
    function callback(data) {
        if (data.code === 200) {
            GetList('/admin/role/jsonindex', listRole)
        }
    }
});

// // $(document).on('click', '.DetailsRole', function () {
// //     var parents = this.parentNode.parentNode;
// //     var input = parents.querySelector('input');
// //     input.classList.add('input-edit')
// //     input.readOnly = false;

// //     console.log(this)
// //     console.log(input)

// // })
// var svg = {
//     check: '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#6aff57" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5" stroke="#4ff35a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
//     edit: '<svg width="20px" height="20px" viewBox="-2.1 -2.1 25.20 25.20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit_cover [#3fe972]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-419.000000, -359.000000)" fill="#6cf962"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z" id="edit_cover-[#3fe972]"> </path> </g> </g> </g> </g></svg>'
// }

var previousInput = null;
var previousValue = null;
$(document).on('click', '.DetailsRole', function () {
    // Kiểm tra nếu có ô input trước đó đã chỉnh sửa và không phải là ô hiện tại
    if (previousInput && previousInput !== this) {
        // Kiểm tra giá trị của ô input trước và sau khi thay đổi
        if (previousValue !== previousInput.value.trim()) {
          
            // Nếu giá trị đã thay đổi, gọi hàm EditItem
            var object = {
                'id': $(this).data('id'),
                'name': previousInput.value.trim()
            }
            EditItem('/admin/role/UpdateRole', object, (data) => {
                if (data.code === 200){
                    previousInput.readOnly = true;
                    previousInput.classList.remove('input-edit');
                    // GetList('/admin/role/jsonindex', listRole)
                }
               
            } , false);
        }
        // Đặt trạng thái chỉ đọc cho ô input trước
        previousInput.readOnly = true;
        previousInput.classList.remove('input-edit');
    }
    var parents = this.parentNode.parentNode;
    var input = parents.querySelector('input');
    input.readOnly = false;
    input.classList.add('input-edit');
    previousValue = input.value.trim();
    previousInput = input;
});

