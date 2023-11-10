export function ConvertDate(data , time = true) {
    const dateObject = new Date(data);
    // Sử dụng các phương thức của Date để định dạng ngày tháng
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${time == true ? `${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}` :" "}`;
    return formattedDate
}