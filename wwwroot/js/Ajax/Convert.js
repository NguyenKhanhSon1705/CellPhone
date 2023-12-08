export function ConvertDate(data , time = true) {
    const dateObject = new Date(data);
    // Sử dụng các phương thức của Date để định dạng ngày tháng
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${time == true ? `${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}` :" "}`;
    return formattedDate
}

export function formatCurrency(inputId) {
    // Lấy giá trị từ ô input
    var inputElement = document.getElementById(inputId);
    var inputValue = inputElement.value;

    // Loại bỏ các ký tự không phải số từ giá trị
    var numericValue = parseFloat(inputValue.replace(/[^\d.]/g, ''));

    // Kiểm tra nếu giá trị là một số hợp lệ
    if (!isNaN(numericValue)) {
      // Format giá trị thành chuỗi số tiền với 2 số thập phân và dấu phân cách hàng nghìn
      var formattedValue = numericValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      
      // Đặt lại giá trị của ô input
      inputElement.value = formattedValue;
    } else {
      // Nếu giá trị không phải là số hợp lệ, loại bỏ ký tự không hợp lệ
      inputElement.value = inputValue.replace(/[^\d.]/g, '');
    }
  }