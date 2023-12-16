import { GetAPI, PostAPI } from "../Axios/Axios.js";
import { Validate } from "../validateform.js"
import { toast } from "../effects.js"

////////////////////////// categories js //////////////////////////

var colors = {
    0: "primary", 1: "success", 2: "warning", 3: "secondary", 4: `danger`, 5: 'info', 6: 'dark'
}
GetAPI('/admin/menu/indexJson', ViewMenu)
function ViewMenu(data) {
    $(".list").empty();
    const Trees = buildMenu(data, null);
    function buildMenu(datas, parentId, level = 0) {
        let submenu = datas.data.filter(item => item.parentMenuId === parentId);
        if (submenu.length > 0) {
            let html = '';
            submenu.forEach((item) => {
                html += `
                <tr>
                    <td>
                        <div class="note-item py-1 px-3 rounded text-white bg-${colors[level]}" style=";margin-left: ${level * 40}px; font-weight:${level === 0 ? 700 : 200}">${item.name}</div>
                    </td>
                    <td class="text-center"><span class="badge px-3 py-1 text-white bg-${colors[level]}">${item.menuChildren != null ? item.menuOrder : ''}</span></td>
                    <td class="text-center"><span class="badge px-3 py-1 text-white bg-${colors[level]}">${item.menuChildren == null ? item.position : ''}</span></td>
                    <td class="text-center"><span class="badge ${item.isActive ==1 ? "badge-success" : "badge-danger"} px-3 py-1 text-white">${item.isActive ==1?"Hiện" : "Ẩn"}</span> </td>
                    <td class="text-center">
                    <button class="buttonDetails p-1 mx-2 box-shadow" data-id="${item.id}">
                    <svg width="20px" height="20px" viewBox="-2.1 -2.1 25.20 25.20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit_cover [#3fe972]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-419.000000, -359.000000)" fill="#6cf962"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z" id="edit_cover-[#3fe972]"> </path> </g> </g> </g> </g></svg></button>
                    <button class="buttonDelete p-1 box-shadow" data-id="${item.id}">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fb3232"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                    </td>
                </tr>
                ${buildMenu(datas, item.id, level + 1)}
            `;
            });

            return html;
        }
        return '';
    }
    $(".list").append(Trees)
}

function modelCategory(params = null) {
    let body = document.querySelector('.content-body');
    let div = document.createElement('div')
    div.classList.add("details")
    var form = `
<div class="c-transparent-bg preve-close w-100">
    <div class="c-form close-model d-flex justify-content-center align-items-center w-75">
        <div class="animate c-m-e-20 bg-white c-boxshow  rounded p-4 c-w-60 text-dark w-75">
            <form id="Create" class="">
                <h4 class="text-center text-shadown my-3 ">Thêm Menu</h4>
                <div class="form-group form-field d-flex">
                    <select id="multiple" class="select w-100" multiple="multiple">
                    </select>
                </div>
                <div class="form-group form-field">
                    <input value="${params != null ? params.name : ''}" id="name" name="name" rule="required"
                        type="text" placeholder=" " class="form-input form-error form-control">
                    <label for="name" class="form-label">Tên menu</label>
                    <span class="form-message"></span>
                </div>
                <div class="form-group form-field">
                    <input value="${params != null ? params.link : ''}" id="name" name="link" rule="required"
                        type="text" placeholder=" " class="form-input form-error form-control">
                    <label for="name" class="form-label">Đường dẫn</label>
                    <span class="form-message"></span>
                </div>

                <div class="form-group form-field">
                    <input value="${params != null ? params.areas : ''}" id="icon" name="areas"  type="text"
                        placeholder=" " class="form-input form-error form-control">
                    <label for="name" class="form-label">Icon</label>
                    <span class="form-message"></span>
                </div>
                
                <div class="d-flex justify-content-between">
                    <div class="form-group form-field w-100">
                        <input value="${params != null ? params.menuOrder : ''}" id="menuOrder" name="areas"  type="number"
                        placeholder=" " class="form-input form-error form-control">
                        <label for="name" class="form-label">Vị trí menu cha</label>
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group form-field  w-100">
                        <input value="${params != null ? params.position : ''}" id="position" name="areas" type="number"
                        placeholder=" " class="form-input form-error form-control">
                        <label for="name" class="form-label">Vị trí menu con</label>
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group form-field w-100  d-flex justify-content-center">
                            <div class="custom-checkbox ">
                                <input id="check" name="check" type="checkbox" ${params !== null ? `${params.isActive !== 0
                                ? 'checked' : ""}` : ''}>
                                <label for="check" class="form-label ml-2" > Hiển thị</label>
                            </div>
                        </div>
                </div>

                <div class="d-flex form-field justify-content-center">
                    <button type="submit" class="button-ainmate form-submit button box-shadow">Thêm mới</button>
                </div>
            </form>
        </div>
    </div>
</div>
    `
    div.innerHTML = form;
    body.append(div);
    var options = []
    GetAPI('/admin/menu/indexJson', data => {
        console.log(data)
        const Trees = buildMenu(data, null);
        function buildMenu(datas, parentId, level = 0) {
            let submenu = datas.data.filter(item => item.parentMenuId === parentId);
            if (submenu.length > 0) {
                var object = {}
                submenu.forEach((item) => {
                    if (params !== null) {
                        if (item.id === params.id) return
                    }
                    let s = " . . . ";
                    for (let i = 0; i < level; i++) {
                        s += " . . . ";
                    }
                    object = {
                        value: item.id,
                        text: s.concat(item.name),
                        classes: `bg-${colors[level]} text-white rounded my-1 mx-2`
                    }
                    let ob = buildMenu(datas, item.id, level + 1)
                    options.unshift(object)
                });
                return object;
            }
        }
        let defaultOption = {
            value: null,
            text: 'Phần tử cha lớn nhất',
            classes: `bg-primary text-white rounded my-1 mx-2`
        }
        options.unshift(defaultOption)
        $('#multiple').multipleSelect({
            data: options,
            animate: 'slide',
            single: true,
            filter: true,
            placeholder: "Lựa chọn phần tử cha (có hoặc không)",
        })

        if (params !== null) {
            console.log(params.parentMenuId)
            var s= $('#multiple').multipleSelect('setSelects', [params.parentMenuId] ,'value');
            console.log(s)
        }
    })
    Validate('#Create', (dataInput) => {
        dataInput.parentMenuId = (+$('#multiple').multipleSelect('getSelects') === 0 ? null : +$('#multiple').multipleSelect('getSelects'))
        dataInput.isActive = $('#check').is(':checked') === true ? 1 : 0
        dataInput.areas = $('#icon').val()
        dataInput.menuOrder = +$('#menuOrder').val()
        dataInput.position = +$('#position').val()
        if (params === null) {
            PostAPI('/admin/menu/CreateMenu', dataInput, data => {
                console.log(dataInput)
                if (data.code === 200) {
                    GetAPI('/admin/menu/indexJson', ViewMenu)
                    toast({ title: 'Thông báo', message: 'Thêm thành công', type: data.message })
                    div.remove()
                }
            }, 0);
        } else {
            dataInput.id = params.id
            PostAPI('/admin/menu/EditMenu', dataInput, data => {
                console.log(data)
                if (data.code === 200) {
                    GetAPI('/admin/menu/indexJson', ViewMenu)
                    toast({ title: 'Thông báo', message: 'Cập nhật thành công', type: data.message })
                    div.remove()
                }
            }, 1);
        }
    })


    $(document).on('click', '.preve-close', () => {
        let element = $('.animate')
        element.addClass('animate-close');
        element.one('animationend', () => {
            element.removeClass('animate-close')
            div.remove();
        })
    });
    $(document).on('click', '.close-model', function (e) {
        e.stopPropagation();
    });
}
// add categories
$(document).on('click', '.create-category', function () {
    modelCategory()
})
// delete categories
$(document).on('click', '.buttonDelete', function () {
    const that = this
    PostAPI('/admin/menu/Delete', { id: $(this).data('id') }, data => {
        if (data.code === 200) {
            GetAPI('/admin/menu/indexJson', ViewMenu)
            toast({
                title: "Xóa thành công",
                message: `Đã xóa ${that.parentNode.parentNode.querySelector('.note-item').textContent} thành công`,
                type: 'warning'
            })
        }
    }, 2)
});

// editt categories
$(document).on('click', '.buttonDetails', function () {
    GetAPI('/admin/menu/DetailsJson', data => {
        if (data.code === 200) {
            modelCategory(data.data)
        }
    }, { id: $(this).data('id') })

});