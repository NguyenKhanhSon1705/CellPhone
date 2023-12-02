import { Validate } from "./validateform.js";
import { GetList, deleteItem, CreateItem, EditItem } from "./Ajax/Ajax.js";
import { toast } from './effects.js'

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
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fb3232"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </button>
                    </td>
                </tr>
                `
        $(".list").append(html)
    })
}

// add new role
$(document).on('click', '.create-role', function () {
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
                            <input  id="name" name="name" rule="required" type="text" placeholder=" "
                                class="form-input form-error form-control" autofocus>
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
})

// xóa role
$(document).on('click', '.buttonDelete', function () {
    const that = this
    deleteItem('/admin/role/DeleteRole', $(this).data('id'), callback);
    function callback(data) {
        if (data.code === 200) {
            GetList('/admin/role/jsonindex', listRole)
            toast({ title: "Xóa vai trò", message: `Đã xóa vai trò ${that.parentNode.parentNode.querySelector('input').value} thành công`, type: 'success' })
        }
    }
});

// editt
$(document).on('click', '.DetailsRole', function () {
    let body = document.querySelector('.content-body');
    let div = document.createElement('div')
    div.classList.add("details")
    var form = `
            <div class="c-transparent-bg preve-close">
            <div class="c-form d-flex justify-content-center align-items-center">
                <div class="animate c-m-e-20 bg-white c-boxshow  rounded p-4 c-w-60 text-dark">
                    <form id="Create-Role" class="">
                        <h3>Cập nhật tên vai trò ${this.parentNode.parentNode.querySelector('input').value}</h3>
                        <div class="form-group form-field">
                            <input value="${this.parentNode.parentNode.querySelector('input').value}" id="name" name="name" rule="required" type="text" placeholder=" "
                                class="form-input form-error form-control">
                            <label for="name" class="form-label">Tên vai trò</label>
                            <span class="form-message"></span>
                        </div>
                        <div class="d-flex form-field justify-content-between">
                            <button type="submit" class="form-submit button box-shadow">Cập nhật</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
    `
    div.innerHTML = form;
    body.append(div);

    Validate('#Create-Role', (data) => {
        data.id = $(this).data('id')
        EditItem('/admin/role/UpdateRole', data, function (data) {
            if (data.code === 200) {
                GetList('/admin/role/jsonindex', listRole)
                toast({ title: "Cập nhật", message: "Cập nhât vai trò thành công", type: 'success' });
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


    // if (previousInput && previousInput !== this) {
    //     var object = {
    //         'id': $(this).data('id'),
    //         'name': previousInput.value.trim()
    //     }
    //     // Kiểm tra giá trị của ô input trước và sau khi thay đổi
    //     if (previousValue !== previousInput.value.trim()) {
    //         EditItem('/admin/role/UpdateRole', object, (data) => {
    //             if (data.code === 200) {
    //                 previousInput.readOnly = true;
    //                 previousInput.classList.remove('input-edit');
    //             } else if (data === 500) {
    //                 GetList('/admin/role/jsonindex', listRole)
    //             }
    //         });
    //         console.log(object)
    //     }
    //     // Đặt trạng thái chỉ đọc cho ô input trước
    //     previousInput.readOnly = true;
    //     previousInput.classList.remove('input-edit');
    // }else
    // {

    // }
    // var parents = this.parentNode.parentNode;
    // var input = parents.querySelector('input');
    // input.readOnly = false;
    // input.classList.add('input-edit');
    // previousValue = input.value.trim();
    // previousInput = input;
});

