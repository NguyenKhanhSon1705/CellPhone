import { GetAPI, PostAPI } from "../Axios/Axios.js";
import { Validate } from "../validateform.js"
import { toast } from "../effects.js"

GetAPI('/admin/status/indexjson', ViewStatus)
function modelCategory(params = null) {
    console.log(params)
    let body = document.querySelector('.content-body');
    let div = document.createElement('div')
    div.classList.add("details")
    var form = `
<div class="c-transparent-bg preve-close w-100">
    <div class="c-form close-model d-flex justify-content-center align-items-center w-50">
        <div class="animate c-m-e-20 bg-white c-boxshow  rounded p-2 c-w-60 text-dark w-75">
            <form id="Create" class="">
                <button type="button" class="p-1 btn-close border-0 bg-white float-right"><i
                        class="ti-close"></i></button>
                <h4 class="text-center text-shadown my-3 ">Thêm trạng thái đơn hàng</h4>
                <div>
                        <div class="form-group form-field ">
                            <input value="${params != null ? params.statusName : ''}" id="name" name="statusName" rule="required"
                                type="text" placeholder=" " class=" form-input form-error form-control ">
                            <label for="name" class="form-label">Tên trạng thái</label>
                            <span class="form-message"></span>
                        </div>
                        <div class="form-group form-field ">
                            <input value="${params != null ? params.description : ''}" id="name" name="description"
                                rule="required" type="text" placeholder=" " class="form-input form-error form-control ">
                            <label for="name" class="form-label">Mô tả trạng thái</label>
                            <span class="form-message"></span>
                        </div>
                </div>
                <div class="d-flex justify-content-around">
                    <div class="d-flex form-field justify-content-center">
                        <button type="button" class="btn-close px-3 box-shadow">Hủy</button>
                    </div>
                    <div class="d-flex form-field justify-content-center">
                        <button type="submit" class="button-ainmate form-submit button box-shadow px-5">Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
    `
    div.innerHTML = form;
    body.append(div);

    Validate('#Create', (dataInput) => {

        if (params === null) {
            PostAPI('/admin/status/CreateJson', dataInput, data => {
                GetAPI('/admin/status/indexjson', ViewStatus)
                toast({ title: 'Thông báo', message: 'Thêm thành công', type: data.message })
                div.remove()
            }, 0);
        } else {
            dataInput.id = params.id
            console.log(dataInput)
            PostAPI('/admin/status/UpdateJson', dataInput, data => {
                console.log(data)
                if (data.code === 200) {
                    GetAPI('/admin/status/indexjson', ViewStatus)
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
    $(document).on('click', '.btn-close', function () {
        let element = $('.animate')
        element.addClass('animate-close');
        element.one('animationend', () => {
            element.removeClass('animate-close')
            div.remove();
        })
    })
}
function ViewStatus (data){
    console.log(data.data)
    $(".list").empty();
    $.each(data.data, (index, item) => {
        let html = `
                <tr>
                    <td class="text-center">${index}</td>
                    <td class="note-item text-center">${item.statusName}</td>
                    <td class="text-center">${item.description}</td>
                    <td class="text-center">
                        <button  class="Details p-1 border-0 rounded c-cursor-poiter" data-id="${item.id}">
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M683.505911 480.221671c-123.691491 0-224.309725 100.628474-224.309725 224.309725S559.814421 928.841122 683.505911 928.841122s224.309725-100.628474 224.309726-224.309726-100.618235-224.309725-224.309726-224.309725z m0 405.892716c-100.117555 0-181.584015-81.456221-181.584014-181.584014s81.46646-181.584015 181.584014-181.584015 181.584015 81.456221 181.584015 181.584015S783.622442 886.114387 683.505911 886.114387z" fill="#22C67F" /><path d="M160.117235 843.388676V159.779353c0-11.776729 9.586638-21.362343 21.362343-21.362344h555.433216c11.776729 0 21.362343 9.586638 21.362343 21.362344v256.35324h42.725711V159.779353c0-35.340426-28.747628-64.088054-64.088054-64.088054H181.479578c-35.340426 0-64.088054 28.747628-64.088054 64.088054v683.609323c0 35.340426 28.747628 64.088054 64.088054 64.088055h256.353241v-42.725711H181.479578c-11.776729 0.001024-21.362343-9.585614-21.362343-21.362344z" fill="#22C67F" /><path d="M224.205289 266.593118h491.344137v42.72571H224.205289zM224.205289 480.221671h234.990897v42.725711H224.205289zM224.205289 693.849201h149.539476v42.725711H224.205289zM768.956309 666.478698h-49.23455l42.975539-42.975538c8.344665-8.344665 8.344665-21.863023 0-30.208713s-21.863023-8.344665-30.208713 0l-48.984721 48.983698-48.983698-48.983698c-8.344665-8.344665-21.863023-8.344665-30.208713 0-8.344665 8.344665-8.344665 21.863023 0 30.208713l42.975539 42.975538H598.05449c-11.807446 0-21.362343 9.565137-21.362344 21.362344s9.554898 21.362343 21.362344 21.362343h64.088054v27.371527h-32.044539c-11.808469 0-21.363367 9.565137-21.363367 21.362343s9.554898 21.362343 21.363367 21.362343h32.044539v21.362344c0 11.797207 9.554898 21.362343 21.362343 21.362343 11.808469 0 21.362343-9.565137 21.362344-21.362343v-21.362344h32.044539c11.807446 0 21.362343-9.565137 21.362343-21.362343s-9.554898-21.362343-21.362343-21.362343h-32.044539v-27.371527h64.088054c11.808469 0 21.362343-9.565137 21.362343-21.362343 0.002048-11.797207-9.55285-21.362343-21.361319-21.362344z" fill="#74E8AE" /></svg>
                        </button>
                        <button class="buttonDelete p-1 mx-1 border-0 rounded c-cursor-poiter" data-id="${item.id}">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fb3232"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                    </td>
                </tr>
                `
        $(".list").append(html)
    })

}


$(document).on('click', '.create', function () {
    modelCategory();
})

$(document).on('click', '.buttonDelete', function () {
    const that = this
    PostAPI('/admin/status/DeleteJson', { id: $(this).data('id') }, data => {
        if (data.code === 200) {
            GetAPI('/admin/status/indexjson', ViewStatus)
            toast({
                title: "Xóa thành công",
                message: `Đã xóa ${that.parentNode.parentNode.querySelector('.note-item').textContent} thành công`,
                type: 'warning'
            })
        }
    }, 2)
});

// xem chi tiết và chỉnh suawr
$(document).on('click', '.Details', function () {
    console.log($(this).data('id'))
    GetAPI('/admin/status/DetailsJson', data => {
        if (data.code === 200) {
            modelCategory(data.data)
        }
    }, { id: $(this).data('id') })
})