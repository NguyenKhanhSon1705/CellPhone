import { Pagination, deleteItem, GetList, CreateItem } from "./Ajax/Ajax.js";
import { toast } from "./effects.js";

let pageCurrent;
let totalPage;
Pagination('/admin/users/indexjson', { CurrentPage: 1 }, paging);

function renderPaging(data, Search = undefined ) {
    $('.list').empty()
    $('.pagination').empty();
    if (data.code === 200) {
        $('.totalUser').html(`Tổng danh sách: ${data.data.total > 0 ? data.data.total : "Không tìm thấy"}`)
        $.each(data.data.users, (index, user) => {
            let html = `
                <tr>
                    <td> ${index}</td>
                    <td>${user.fullName }</td>
                    <td>${user.email}</td>
                    <td><button class="select-role w-100 box-shadow p-1" data-id="${user.id}" data-email="${user.email}" data-name="${user.fullName}">${user.roleNames == '' ? " " : user.roleNames}</button></td>
                    <td>
                        <a href="/admin/users/details/${user.id}" title="Chi tiết" class="DetailsContact d-inline-block mx-1 p-1 border-0 rounded c-cursor-poiter" >
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M683.505911 480.221671c-123.691491 0-224.309725 100.628474-224.309725 224.309725S559.814421 928.841122 683.505911 928.841122s224.309725-100.628474 224.309726-224.309726-100.618235-224.309725-224.309726-224.309725z m0 405.892716c-100.117555 0-181.584015-81.456221-181.584014-181.584014s81.46646-181.584015 181.584014-181.584015 181.584015 81.456221 181.584015 181.584015S783.622442 886.114387 683.505911 886.114387z" fill="#22C67F" /><path d="M160.117235 843.388676V159.779353c0-11.776729 9.586638-21.362343 21.362343-21.362344h555.433216c11.776729 0 21.362343 9.586638 21.362343 21.362344v256.35324h42.725711V159.779353c0-35.340426-28.747628-64.088054-64.088054-64.088054H181.479578c-35.340426 0-64.088054 28.747628-64.088054 64.088054v683.609323c0 35.340426 28.747628 64.088054 64.088054 64.088055h256.353241v-42.725711H181.479578c-11.776729 0.001024-21.362343-9.585614-21.362343-21.362344z" fill="#22C67F" /><path d="M224.205289 266.593118h491.344137v42.72571H224.205289zM224.205289 480.221671h234.990897v42.725711H224.205289zM224.205289 693.849201h149.539476v42.725711H224.205289zM768.956309 666.478698h-49.23455l42.975539-42.975538c8.344665-8.344665 8.344665-21.863023 0-30.208713s-21.863023-8.344665-30.208713 0l-48.984721 48.983698-48.983698-48.983698c-8.344665-8.344665-21.863023-8.344665-30.208713 0-8.344665 8.344665-8.344665 21.863023 0 30.208713l42.975539 42.975538H598.05449c-11.807446 0-21.362343 9.565137-21.362344 21.362344s9.554898 21.362343 21.362344 21.362343h64.088054v27.371527h-32.044539c-11.808469 0-21.363367 9.565137-21.363367 21.362343s9.554898 21.362343 21.363367 21.362343h32.044539v21.362344c0 11.797207 9.554898 21.362343 21.362343 21.362343 11.808469 0 21.362343-9.565137 21.362344-21.362343v-21.362344h32.044539c11.807446 0 21.362343-9.565137 21.362343-21.362343s-9.554898-21.362343-21.362343-21.362343h-32.044539v-27.371527h64.088054c11.808469 0 21.362343-9.565137 21.362343-21.362343 0.002048-11.797207-9.55285-21.362343-21.361319-21.362344z" fill="#74E8AE" /></svg>
                        </a>
                        <button title="Xóa" class="buttonDelete p-1 border-0 rounded c-cursor-poiter" data-id="${user.id}">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fb3232"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </button>
                    </td>
                </tr>
                `
            $('.list').append(html)
        })
        if (data.data.countPage !== 1) {
            for (let i = 1; i <= data.data.countPage; i++) {
                let btn =
                    `
                <button  class="btn-page px-3 py-1 mx-1 my-3 rounded box-shadow ${i === data.data.currentPage ? 'active' : ''}" value="${i}">${i}</button>
            `
                $('.pagination').append(btn)
            }
            let btns = document.querySelectorAll('.btn-page');
            btns.forEach(function (button) {
                button.addEventListener('click', function () {
                    // Loại bỏ lớp "active" từ tất cả các nút
                    btns.forEach(function (btn) {
                        btn.classList.remove('active');
                    });
                    pageCurrent = button.value
                    console.log(pageCurrent)
                    // Thêm lớp "active" cho nút hiện tại
                    this.classList.add('active');
                    Pagination('/admin/users/indexjson', { CurrentPage: pageCurrent, email: Search }, Search === undefined ? paging : data => { pagingSearch(data, Search) });
                });
            });
        }
    }
}
function paging(data) {
    renderPaging(data);
};
$(document).on('click', '.buttonDelete', function () {
    deleteItem('/admin/users/DeleteUser', $(this).data('id'), data => {
        if (data.code === 200) {
            toast({
                title: 'Thành công',
                message: data.message,
                type: 'success'
            })
            Pagination('/admin/users/indexjson', { CurrentPage: pageCurrent }, paging);
        }
    })
})
$(document).on('click', '.select-role', function () {
    var idUser = $(this).data('id');
    var nameUser = $(this).data('name');
    var emailUser = $(this).data('email');
    var listRole = $(this).text().split(', ')
    GetList('/admin/users/ListRoleJson', (data) => {
        var options = data.data.map(function (item) {
            return {
                value: item.id,
                text: item.name
            };
        });

        $('#multiple').multipleSelect({
            data: options,
            animate: 'slide',
            selectAll: false,

        })
        $('#multiple').multipleSelect('setSelects', listRole, 'text')
        $(document).on('click', '.preve-close', function () {
            div.remove()
        });
        $(document).on('click', '.c-form', function (e) {
            e.stopPropagation();
        });
    })

    let body = document.querySelector('.content-body');
    let div = document.createElement('div')
    div.classList.add("details")
    var form = `
            <div class="c-transparent-bg preve-close">
            <div class="c-form d-flex justify-content-center align-items-center">
                <div class="animate c-m-e-20 bg-white c-boxshow  rounded p-5 c-w-60 text-dark">
                    <form id="Create-Role" class="">
                        <div>
                        <h3>Thêm vai trò cho người dùng (Role)</h3>
                        <p>Email: ${emailUser}</p>
                        <p>Tên : ${nameUser == null ? "<span class='text-danger'>Chưa đặt tên</span>" : nameUser}</p>
                        </div>
                        <select id="multiple" class="select w-100" multiple="multiple">
                        </select>
                        <div class="d-flex form-field justify-content-between">
                            <button type="button" class="submitRole button box-shadow">Thêm vai trò(roles)</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
                    `
    div.innerHTML = form;
    body.append(div);

    $(document).one('click', '.submitRole', function () {
        var ob = {
            id: idUser,
            roles: $('#multiple').multipleSelect('getSelects')
        }
        CreateItem('/admin/users/addroleuser', ob, (data) => {
            if (data.code === 200) {
                console.log(pageCurrent+ "test")
                Pagination('/admin/users/indexjson', {CurrentPage : pageCurrent}, renderPaging);
                toast({ title: "Thông báo", message: `Cập nhật vai trò thành công`, type: 'success' })
                div.remove();
            }
        })
    })

})

function pagingSearch(data, search) {
    renderPaging(data, search)
}
// tìm kiếm user
$(document).on('click', '.buttonSearch', () => {
    var inputData = document.querySelector('input[name="search"]').value.trim()
    if (inputData !== '') {
        Pagination('/admin/users/indexjson', { CurrentPage: 1, email: inputData }, data => {
            pagingSearch(data, inputData)
        });
    }
})

// render tất cả user
$(document).on('click', '.user-all', () => {
    Pagination('/admin/users/indexjson', { CurrentPage: 1 }, paging);
})

// render tất cả user có roles


