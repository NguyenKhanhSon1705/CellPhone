import { GetAPI, PostAPI } from "../Axios/Axios.js";
import { Validate } from "../validateform.js";
import { ConvertDate } from "../Ajax/Convert.js";
import { toast } from "../effects.js";


$(document).on('click', '.add-cart', function () {
    var slug = this.parentNode.parentNode.parentNode.querySelector('.id-pr').getAttribute('href').substring(1)
    var ob = { slug: slug }
    PostAPI('/ProductsClient/addtocart', ob, data => {
        // console.log(data)
        if (data.code === 200) {
            toast({ title: "Thông báo", message: "Thêm giỏ hàng thành công", type: data.message })
        } else if (data.code === 500) {
            toast({ title: "Thông báo", message: "Vui lòng đăng nhập", type: data.message })
        }
    })
})



function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

$('.quantity-control').on('click', function () {
    var action = $(this).data('action');
    var targetId = $(this).data('target');
    var targetInput = $('#' + targetId);
    var currentValue = parseInt(targetInput.val());
    if (action === 'increase') {
        targetInput.val(currentValue + 1);
    } else if (action === 'decrease' && currentValue > 1) {
        targetInput.val(currentValue - 1);
    }
    updateTotalPrice();

});

$('#select-all').on('change', function () {
    // Cập nhật trạng thái của tất cả checkbox sản phẩm dựa trên checkbox "Chọn tất cả"
    $('.product-checkbox').prop('checked', $(this).prop('checked'));
    updateTotalPrice();
});

// Bắt sự kiện khi checkbox sản phẩm thay đổi
$('.product-checkbox').on('change', function () {
    // Cập nhật trạng thái của checkbox "Chọn tất cả" dựa trên tất cả checkbox sản phẩm
    $('#select-all').prop('checked', $('.product-checkbox:checked').length === $('.product-checkbox').length);
    updateTotalPrice();
});


function updateTotalPrice() {
    var sumPr = 0
    var total = 0;
    var arr = [];
    // Lặp qua tất cả các checkbox sản phẩm được chọn
    $('.product-checkbox:checked').each(function () {
        // Lấy giá trị data-price từ checkbox và cộng vào tổng
        var price = $(this).data('price');

        var quantity = this.parentNode.parentNode.querySelector('input[name="cartitem.quantity"]').value;
        sumPr += +quantity
        total += +price * quantity;
        var slug = this.parentNode.parentNode.parentNode.querySelector('.id-pr').getAttribute('href').substring(1)
        arr.push(slug)
    });

    // Hiển thị tổng giá trị
    $('#total-price').text(formatCurrency(total));
    $('.sumPr').text(sumPr);
    console.log(arr);
    // if(sumPr>0){
        $('.btn-checkout').off('click').on('click', function () {
            var ob = {listPr: arr}
            if(sumPr > 0){
                console.log('test')
                PostAPI('/getProducts' , ob ,  data=>{
                    console.log(data)
                })
            }
        })
    // }
}




