import { GetAPI, PostAPI } from "../Axios/Axios.js";
import { Validate } from "../validateform.js";
import { ConvertDate } from "../Ajax/Convert.js";
import { toast } from "../effects.js";



// var city = $('#city').multipleSelect({
//     animate: 'slide',
//     single: true,
//     placeholder :"Tỉnh/ Thành Phố",
//     filter: true,
//     onOpen: function () {
//         GetAPI('https://provinces.open-api.vn/api/?depth=3', data => {
//             console.log(data);

//         })
//     }
// })


var provinces
GetAPI('https://provinces.open-api.vn/api/?depth=3', data => {
    // Lấy danh sách các tỉnh/thành phố từ dữ liệu API
    // console.log(data)
    // var provinces = data.map(item => item.name);
    provinces = data.map(item => ({ value: item.code, text: item.name }));
    var city = $('#city').multipleSelect({
        data: provinces,
        animate: 'slide',
        single: true,
        placeholder: "-- Tỉnh/ Thành Phố --",
        filter: true,
        onClick: function () {
            data.forEach(element => {
                if (element.code === +$('#city').multipleSelect('getSelects')) {
                    district(element.districts)
                }
            });
        }
    });

});

function district(data) {
    $('#district').html('<option value="">-- Quận/ Huyện --</option>');

    if (data !== undefined) {
        data.map(value => document.getElementById('district').innerHTML += `<option value='${value.code}'>${value.name}</option>`);
    }
    $('#district').change(function() {
        // Lấy giá trị được chọn
        var selectedDistrict = $(this).val();
        console.log(selectedDistrict)
        console.log(data)
        data.forEach(element => {
            if (element.code === +selectedDistrict) {
                wards(element.wards)
            }
        });
      });
}

function wards(data) {
    console.log(data)
    $('#wards').html('<option value="">-- Phường/ Xã --</option>');

    if (data !== undefined) {
        data.map(value => document.getElementById('wards').innerHTML += `<option value='${value.code}'>${value.name}</option>`);
    }
}