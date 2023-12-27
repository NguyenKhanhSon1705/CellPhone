import { GetAPI, PostAPI } from "../Axios/Axios.js";
import { Validate } from "../validateform.js";
import { ConvertDate } from "../Ajax/Convert.js";

var pageCurrent = 1;
var colors = {
    0: "primary", 1: "success", 2: "warning", 3: "secondary", 4: `danger`, 5: 'info', 6: 'dark'
}

var SizePage = $('#multiple-quantity').multipleSelect({
    animate: 'slide',
    single: true,
    onClick: function () {
        GetAPI('/admin/products/indexJson', listProducts, { CurrentPage: pageCurrent, SizePage: +SizePage.multipleSelect('getSelects') })

    }
})

var options = []
 GetAPI('/admin/products/category/indexJson', data => {
     const Trees = buildMenu(data, null);
     function buildMenu(datas, parentId, level = 0) {
         let submenu = datas.data.filter(item => item.parentCategoryId === parentId);
         if (submenu.length > 0) {
             var object = {}
            submenu.forEach((item) => {

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
    $('#multiple').multipleSelect({        data: options,
         animate: 'slide',
       single: true,
      filter: true,
       placeholder: "Lựa chọn phần tử cha (có hoặc không)",
     })
 })
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
    console.log(dataInput)
    PostAPI('/admin/products/CreateJson', dataInput, (data) => {
        console.log(data)
    }, 0)
})


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

GetAPI('/admin/products/indexJson', listProducts)

function listProducts(data) {
     $(".list").empty();
  
    
    $.each(data.data.listProducts, (index, item) => {
       /* console.log(item.productCategoryProducts[0].category.title )*/
        
        var html = `
        <div class="tablet-item col l-2-4 c-6 ">
            <div class="box-shadows">
                <div class="product-discount tablet ${item.promotion ==0 ? 'd-none' : ''}">${item.promotion}%</div>
                <a href="/admin/products/details/${item.productID}" >
                    <p class="text-center"><img src="${item.image}" height=100 width=100 alt="" class=""></p>
                    <div>
                        <h3 class="product-heading tablet">${item.title}</h3>

                        <div class="product-price tablet">
                            <sapn class="price-new ">Giá: ${item.price} đ</sapn>
                        </div>
                    </div>
                    <div class="product-describe tablet">
                        <span class="decribe-text">
                        Ngày tạo: ${ConvertDate(item.dateCreated , false)}
                        Người tạo:${item.authorId}
                        </span>
                    </div>
                </a>
                <div class="product-heart tablet">
                    <span class="decribe-text">
                        <p class="mb-0">Trạng thái: <span class="${item.published != false ? 'badge badge-success px-2 text-white' : ''}">${item.published !== false ? 'Hiển thị' : 'Ẩn'}</span></p
                        <p class="mb-0">Tồn kho: ${item.inventory}</p>
                        <p class="mb-0">Danh mục: </p>\
                    </span>
                </div>
            </div>
        </div>
        `
        $(".list").append(html)
    })

     Paging(data, page => {
         // if (page >= 1 && page <= data.data.countPage) {
         GetAPI('/admin/products/indexJson', listProducts, { CurrentPage: page, SizePage: +SizePage.multipleSelect('getSelects') })
         // }
     })
}