using CellPhone.Migrations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Area("order")]
[Route("/admin/orders/[action]/{id?}")]
[Authorize]
public class OrderManageController : Controller{
    private readonly CellPhoneDB _context;

    public OrderManageController(CellPhoneDB context)
    {
        _context = context;
    }

    public IActionResult index(){
        return View();
    }
    public async Task<IActionResult> IndexJson(int CurrentPage = 1, int SizePage = 10){
        var model = new ListOrderModel();
        model.CurrentPage = CurrentPage;
        model.SizePage = SizePage;


        var order =  _context.orders
                            .Include(st=> st.Status)
                            .Include(u=> u.User)
                            .OrderByDescending(p => p.CreatedDate);

        int total = await order.CountAsync();
        if (total > 0)
        {
            model.Total = total;
            model.CountPage = (int)Math.Ceiling((double)model.Total / model.SizePage);

            if (model.CurrentPage < 1)
                model.CurrentPage = 1;
            if (model.CurrentPage > model.CountPage)
                model.CurrentPage = model.CountPage;

            model.listOrder = await order.Skip((model.CurrentPage - 1) * model.SizePage)
                     .Take(model.SizePage)
                     .Include(p => p.User)
                     .Include(p => p.Status)
                     .Select(p => new OrderModel()
                     {
                         FullName = p.FullName,
                         TotalPrice = p.TotalPrice,
                         TotalQuantity = p.TotalQuantity,
                         PhoneNumber = p.PhoneNumber,
                         Status = p.Status,
                         CreatedDate = p.CreatedDate,
                         ID = p.ID
                     })
                     .ToListAsync();

            model.Total = total;
            model.CurrentPage = CurrentPage;
            return Json(new { code = 200, data = model, message = "success" });
        }

        return Json(new { code = 300, data = " Chưa có bài viết nào", message = "success" });

    }
}