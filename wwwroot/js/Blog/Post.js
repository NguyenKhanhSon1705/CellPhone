import { GetAPI, PostAPI } from "../Axios/Axios.js";
import { Validate } from "../validateform.js"
import { toast } from "../effects.js"
import { ConvertDate } from "../Ajax/Convert.js";

var pageCurrent = 1;
var colors = {
    0: "primary", 1: "success", 2: "warning", 3: "secondary", 4: `danger`, 5: 'info', 6: 'dark'
}

var SizePage = $('#multiple-quantity').multipleSelect({
    // data: options,
    // value: '1',
    animate: 'slide',
    single: true,
    onClick: function () {
        GetAPI('/admin/blog/post/postjson', listPost, { CurrentPage: pageCurrent, SizePage: +SizePage.multipleSelect('getSelects') })
    }
})


GetAPI('/admin/blog/post/postjson', listPost, { CurrentPage: pageCurrent, SizePage: +SizePage.multipleSelect('getSelects') })


let Paging = (data, callback) => {
    $('.pageNumber').empty();
    if (data.data.countPage > 1) {
        for (let i = 1; i <= data.data.countPage; ++i) {
            let btn = `
                <li class="page-item ${i === data.data.currentPage ? 'active' : ''}">
                    <button class="page-link">${i}</button>
                </li>
            `;
            $('.pageNumber').append(btn);
        }
        // Xử lý sự kiện khi nút số trang được click
        $('.page-item').on('click', function () {
            $('.page-item').removeClass('active');
            pageCurrent = +$(this).text();
            $(this).addClass('active');
            callback(pageCurrent);
        });

        // Sự kiện khi nút "Previous" được click
        // $(".Previous").on("click", function () {
        //     if (pageCurrent > 1) {
        //         pageCurrent = pageCurrent - 1;
        //         callback(pageCurrent);
        //     }
        // });

        // // Sự kiện khi nút "Next" được click
        // $(".Next").on("click", function () {
        //     if (pageCurrent < data.data.countPage) {
        //         pageCurrent = pageCurrent + 1;
        //         callback(pageCurrent);
        //     }
        // });
    }
};


function listPost(data) {
    $(".listpost").empty();
    $.each(data.data.listPost, (index, item) => {
        let html = `
                <tr>
                    <td class="note-item">
                        <div class="d-flex flex-column">
                        <h4>${item.title}</h4>
                        <a>Danh mục: ${item.postCategories.map((categories) => categories.category.title.toString())}</a>
                        </div>
                    </td>
                    <td><img src="${item.image != null ? item.image : "/images/loader.gif"}" height=40 width=40 class="road" alt="">
                    </td>
                    <td>${ConvertDate(item.dateUpdated, false)}</td>
                    <td>${item.viewCount}</td>
                    <td ><span class="${item.status != 0 ? 'badge badge-success px-2 text-white' : ''}">${item.status != 0 ? 'Đã duyệt' : 'Chờ duyệt'}</span></td>
                    <td>
                        <button  class="Details p-1 border-0 rounded c-cursor-poiter" data-id="${item.postID}">
                            <?xml version="1.0" encoding="utf-8"?>
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M683.505911 480.221671c-123.691491 0-224.309725 100.628474-224.309725 224.309725S559.814421 928.841122 683.505911 928.841122s224.309725-100.628474 224.309726-224.309726-100.618235-224.309725-224.309726-224.309725z m0 405.892716c-100.117555 0-181.584015-81.456221-181.584014-181.584014s81.46646-181.584015 181.584014-181.584015 181.584015 81.456221 181.584015 181.584015S783.622442 886.114387 683.505911 886.114387z" fill="#22C67F" /><path d="M160.117235 843.388676V159.779353c0-11.776729 9.586638-21.362343 21.362343-21.362344h555.433216c11.776729 0 21.362343 9.586638 21.362343 21.362344v256.35324h42.725711V159.779353c0-35.340426-28.747628-64.088054-64.088054-64.088054H181.479578c-35.340426 0-64.088054 28.747628-64.088054 64.088054v683.609323c0 35.340426 28.747628 64.088054 64.088054 64.088055h256.353241v-42.725711H181.479578c-11.776729 0.001024-21.362343-9.585614-21.362343-21.362344z" fill="#22C67F" /><path d="M224.205289 266.593118h491.344137v42.72571H224.205289zM224.205289 480.221671h234.990897v42.725711H224.205289zM224.205289 693.849201h149.539476v42.725711H224.205289zM768.956309 666.478698h-49.23455l42.975539-42.975538c8.344665-8.344665 8.344665-21.863023 0-30.208713s-21.863023-8.344665-30.208713 0l-48.984721 48.983698-48.983698-48.983698c-8.344665-8.344665-21.863023-8.344665-30.208713 0-8.344665 8.344665-8.344665 21.863023 0 30.208713l42.975539 42.975538H598.05449c-11.807446 0-21.362343 9.565137-21.362344 21.362344s9.554898 21.362343 21.362344 21.362343h64.088054v27.371527h-32.044539c-11.808469 0-21.363367 9.565137-21.363367 21.362343s9.554898 21.362343 21.363367 21.362343h32.044539v21.362344c0 11.797207 9.554898 21.362343 21.362343 21.362343 11.808469 0 21.362343-9.565137 21.362344-21.362343v-21.362344h32.044539c11.807446 0 21.362343-9.565137 21.362343-21.362343s-9.554898-21.362343-21.362343-21.362343h-32.044539v-27.371527h64.088054c11.808469 0 21.362343-9.565137 21.362343-21.362343 0.002048-11.797207-9.55285-21.362343-21.361319-21.362344z" fill="#74E8AE" /></svg>
                        </button>
                        <button class="buttonDelete p-1 mx-1 border-0 rounded c-cursor-poiter" data-id="${item.postID}">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fb3232"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fb3232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                    </td>
                </tr>
                `
        $(".listpost").append(html)
    })

    Paging(data, page => {
        // if (page >= 1 && page <= data.data.countPage) {
        GetAPI('/admin/blog/post/postjson', listPost, { CurrentPage: page, SizePage: +SizePage.multipleSelect('getSelects') })
        // }
    })
}

// module container add/edit
function modelCategory(params = null) {
    let body = document.querySelector('.content-body');
    let div = document.createElement('div')
    div.classList.add("details")
    var form = `
<div class="c-transparent-bg preve-close w-100">
    <div class="c-form close-model d-flex justify-content-center align-items-center w-100">
        <div class="animate c-m-e-20 bg-white c-boxshow  rounded p-2 c-w-60 text-dark w-75">
            <form id="Create" class="">
                <button type="button" class="p-1 btn-close border-0 bg-white float-right"><i
                        class="ti-close"></i></button>
                <h4 class="text-center text-shadown my-3 ">Bài viết mới</h4>
                <div>
                    <div class="form-group form-field d-flex">
                        <select id="multiple" class="select w-100" multiple="multiple">
                        </select>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="form-group form-field w-100">
                            <input value="${params != null ? params.title : ''}" id="name" name="Title" rule="required"
                                type="text" placeholder=" " class=" form-input form-error form-control ">
                            <label for="name" class="form-label">Tên danh mục</label>
                            <span class="form-message"></span>
                        </div>

                        <div class="form-group form-field w-100">
                            <input value="${params != null ? params.abstractTitle : ''}" id="name" name="AbstractTitle"
                                rule="required" type="text" placeholder=" " class="form-input form-error form-control ">
                            <label for="name" class="form-label">Mô tả bài viết</label>
                            <span class="form-message"></span>
                        </div>
                    </div>
                    <div class=" d-flex justify-content-between">
                        <div class="form-group form-field w-100 d-flex">
                            <div class="">
                                <img id="previewImage" height=50 width=70
                                    src="${params != null ? params.image : '/images/loader.gif'}" class=" px-2"></img>
                                <input id="fileInput" name="file" type="file" class="d-none" />
                                <label for="fileInput" class="box-shadow label-s d-inline px-2">Chọn Tệp</label>
                            </div>
                        </div>
                        <div class="form-group form-field w-100  d-flex">
                            <div class="custom-checkbox ">
                                <input id="check" name="check" type="checkbox" ${params !== null ? `${params.status !== 0
            ? 'checked' : ""}` : ''}>
                                <label for="check" class="form-label" style="transform: translate(10px, -20px);">Duyệt
                                    đăng</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group form-field">
                    <textarea id="Editor"></textarea>
                </div>

                <div class="d-flex justify-content-around">
                    <div class="d-flex form-field justify-content-center">
                        <button type="button" class="btn-close px-3 box-shadow">Hủy</button>
                    </div>
                    <div class="d-flex form-field justify-content-center">
                        <button type="submit" class="button-ainmate form-submit button box-shadow px-5">Đăng</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
    `
    div.innerHTML = form;
    body.append(div);
    var options = []
    GetAPI('/admin/blog/category/indexJson', data => {
        const Trees = buildMenu(data, null);
        function buildMenu(datas, parentId, level = 0) {
            let submenu = datas.data.filter(item => item.parentCategoryId === parentId);
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
                        text: s.concat(item.title),
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
            $('#multiple').multipleSelect('setSelects', params.categoryIDs)
        }
    })
    var editor = new FroalaEditor('#Editor', {
        charCounterCount: false,
        attribution: false,
        heightMin: 50,
        heightMax: 200,
        events: {
            'initialized': function () {
                if (params !== null) {
                    var editor = this;
                    editor.html.set(params.content);
                }
            }
        }
    });
    var fileName
    $('#fileInput').change(function () {
        fileName = $(this).val().split('\\').pop();
        console.log(fileName)
        $('.label-s').text(fileName || 'Tùy chỉnh');
        var selectedFile = this.files[0];
        if (selectedFile) {
            // Hiển thị hình ảnh preview
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImage').attr('src', e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            // Nếu không có tệp nào được chọn, đặt src của hình ảnh preview thành trống
            $('#previewImage').attr('src', '/images/loader.gif');
        }
    });
    

    Validate('#Create', (dataInput) => {
        dataInput.CategoryIDs = [(+$('#multiple').multipleSelect('getSelects') === 0 ? null : +$('#multiple').multipleSelect('getSelects'))]
        var isChecked = $('#check').is(':checked');
        dataInput.Status = isChecked === true ? 1 : 0
        dataInput.Image = $('#fileInput')[0].files[0]
        dataInput.Content = editor.html.get()

        if (params === null) {
            PostAPI('/admin/blog/post/Create', dataInput, data => {
                GetAPI('/admin/blog/post/PostJson', listPost)
                toast({ title: 'Thông báo', message: 'Thêm thành công', type: data.message })
                div.remove()
            }, 0);
        } else {
            dataInput.id = params.postID
            console.log(dataInput)
            PostAPI('/admin/blog/post/Edit', dataInput, data => {
                console.log(data)
                if (data.code === 200) {
                    GetAPI('/admin/blog/post/PostJson', listPost)
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

// thêm mới bài viết
$(document).on('click', '.create-post', function () {
    modelCategory();
})

// xem chi tiết và chỉnh suawr
$(document).on('click', '.Details', function () {
    console.log($(this).data('id'))
    GetAPI('/admin/blog/post/DetailsJson', data => {
        if (data.code === 200) {
            modelCategory(data.data)
        }
    }, { id: $(this).data('id') })
})
// xóa một bài post
$(document).on('click', '.buttonDelete', function () {
    const that = this
    PostAPI('/admin/blog/post/Delete', { id: $(this).data('id') }, data => {
        if (data.code === 200) {
            GetAPI('/admin/blog/post/postjson', listPost)
            toast({
                title: "Xóa thành công",
                message: `Đã xóa ${that.parentNode.parentNode.querySelector('.note-item').textContent} thành công`,
                type: 'warning'
            })
        }
    }, 2)
});