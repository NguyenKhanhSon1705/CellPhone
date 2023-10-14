
function DetailsItem(id) {
    if (true) {
        $.ajax({
            url: '/Admin/Contact/Details',
            type: "POST",
            data: {
                id: id
            },
            success: function (data) {
                if (data.code == 200) {
                    Details(data.details);
                }
            },
            error: function (xhr) {
                alert('error');
            }
        });
    }
}
function Details(data){
    var details = `
            <div class="c-transparent-bg">
                <div class="d-flex justify-content-center align-items-center h-100">
                    <div class="confirm  bg-white c-boxshow  rounded p-4 c-w-60 text-dark">
                        <div class="row border-bottom">
                            <div class="col l-6">
                                <label class="p-1 c-font-weight">Người gửi: </label>
                                <label class="p-1  border-bottom  ">${data.fullName}</label>
                            </div>
                            <div class="col l-6 ">
                                <label class="p-1 c-font-weight ">Email: </label>
                                <label class="p-1  border-bottom  ">${data.email} </label>
                            </div>
                        </div>
                        <div class="row border-bottom">
                            <div class="col l-6">
                                <label class="p-1 c-font-weight">Số điện thoại: </label>
                                <label class="p-1  border-bottom  ">${data.phone}</label>
                            </div>
                            <div class="col l-6">
                                <label class="p-1 c-font-weight">Ngày gửi: </label>
                                <label class="p-1  border-bottom  ">${data.dateSend}</label>
                            </div>
                        </div>
                        <div class="row border-bottom">
                            <div class="col l-12">
                                <label class="p-1 center c-font-weight">Nội dung</label>
                                <label class="p-1 center ">${data.message}</label>
                            </div>
                        </div>
                        <div class="p-1  d-flex justify-content-between">
                            <div class="">
                                <label class="c-font-weight">Trạng thái: </label>
                                <label>${data.status?"Đã xem":"Chưa xem"}</label>
                            </div>
                            <button onclick ="HidenConfirm('details')" class="btn c-btn-yes" >Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
    `
    document.querySelector('.details').innerHTML = details;
}
function deleteItem(itemId) {
    if (true) {
        $.ajax({
            url: '/Admin/Contact/Delete',
            type: "POST",
            data: {
                id: itemId
            },
            success: function (data) {
                if (data.code == 200) {
                    handleRenderView();
                }
            },
            error: function (xhr) {
                alert('error');
            }
        });
    }
    // $(".confirm").remove( )
    document.querySelector('.confirm').innerHTML = " "
}
function HidenConfirm(string) {
    document.querySelector(`.${string}`).innerHTML = " "
}
function handle(id) {
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
                        <button class="btn c-btn-no" onclick="HidenConfirm('confirm')">Hủy</button>
                        <button class="btn c-btn-yes" onclick="deleteItem(${id})">Tôi đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
      `
    $(".confirm").append(btn)

  
}

