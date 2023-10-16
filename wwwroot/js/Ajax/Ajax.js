import { LoadingStart, LoadingStop } from '../loading.js'

export function deleteItem(url, id , callback) {
    let btn = `
        <div class="c-transparent-bg">
            <div class=" d-flex justify-content-center align-items-center h-100">
                <div class="confirm p-4 bg-white c-boxshow rounded">
                    <div class="text-center">
                        <div>
                            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="#d5541d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h4 class="center p-3">Bạn có chắc chắn muốn xóa không</h4>
                    </div>
                    <div class="d-flex justify-content-around">
                        <button  class="btn c-btn-no no" >Hủy</button>
                        <button class="btn c-btn-yes yes">Tôi đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
      `
    $(".confirm").append(btn)
   
    $(document).on('click', '.no', function () {
        $(".confirm").empty()
    });
    $(document).on('click', '.yes', function () {
        $.ajax({
            url: url,
            type: "POST",
            data: {
                id: id
            },
            success: function (data) {
                if (data.code == 200) {
                    callback(data.code)
                }
            },
            error: function (xhr) {
                alert('error');
            }
        });
        $(".confirm").empty()
    });
}

export function GetList(url, callback) {
    LoadingStart();
    $.ajax({
        url: url,
        type: "Get",
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                callback(data)
                LoadingStop();
            }
        },
        error: function (xhr) {
            alert("error");
        }
    });
}

export function DetailsItem(url, id, callback) {
    LoadingStart();
    $.ajax({
        url: url,
        type: "POST",
        data: {
            id: id
        },
        success: function (data) {
            if (data.code == 200) {
                callback(data)
                LoadingStop();
            }
        },
        error: function (xhr) {
            alert('error');
        }
    });
}

// export function deleteItem(url, id) {
//     if(true){
//           $.ajax({
//             url: url,
//             type: "POST",
//             data: {
//                 id: id
//             },
//             success: function (data) {
//                 if (data.code == 200) {
                  
//                 }
//             },
//             error: function (xhr) {
//                 alert('error');
//             }
//         });
//     }
      
//         // document.querySelector('.confirm').innerHTML = " "
// }



