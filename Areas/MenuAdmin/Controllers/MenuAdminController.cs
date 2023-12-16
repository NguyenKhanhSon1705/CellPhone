using CellPhone.Migrations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
[Area("MenuAdmin")]
[Route("/admin/menu/[action]/{id?}")]
[Authorize(Roles = "Administrator")]
public class MenuAdminController : Controller
{
    private readonly CellPhoneDB _context;
    private readonly ILogger<MenuAdminController> _logger;

    public MenuAdminController(CellPhoneDB context, ILogger<MenuAdminController> logger)
    {
        _context = context;
        _logger = logger;
    }
    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }
    [HttpGet]
    public async Task<IActionResult> IndexJson()
    {
        var qr = await _context.menuAdmin.OrderBy(c => c.MenuOrder).ToListAsync();
        return Json(new { code = 200, data = qr, message = "Success" });
    }

    [HttpPost]
    [ValidateAntiForgeryToken] // /admin/menu/CreateMenu
    public async Task<IActionResult> CreateMenu(MenuAdminModel menu)
    {
        Console.WriteLine("=--------------------------------------");
        Console.WriteLine(menu.Name);
        Console.WriteLine(menu.Link);
        if (menu != null)
        {
            _context.menuAdmin.Add(menu);
            await _context.SaveChangesAsync();
            return Json(new { code = 200, data = "success", message = "success" });
        }
        return Json(new { code = 500, data = "error", message = "error" });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var menuAdmin = await _context.menuAdmin
                       .Include(c => c.MenuChildren)
                       .FirstOrDefaultAsync(c => c.ID == id);
        if (menuAdmin == null)
        {
            return Json(new { code = 500, data = " ", message = "error" });
        }

        foreach (var menu in menuAdmin.MenuChildren)
        {
            menu.ParentMenuId = menuAdmin.ParentMenuId;
        }
        _context.menuAdmin.Remove(menuAdmin);
        await _context.SaveChangesAsync();

        return Json(new { code = 200, data = "Success", message = "Success" });
    }

    [HttpGet]
    public async Task<IActionResult> DetailsJson(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var menuAdmin = await _context.menuAdmin
            .Include(c => c.ParentsMenu)
            // .Include(c => c.CategoryChildren)
            .FirstOrDefaultAsync(m => m.ID == id);
        if (menuAdmin == null)
        {
            return Json(new { code = 500, data = "", message = "error" });
        }

        return Json(new { code = 200, data = menuAdmin, message = "success" });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> EditMenu(MenuAdminModel menu)
    {
        try
        {
            // Tìm đối tượng theo Id
            var existing = await _context.menuAdmin.FindAsync(menu.ID);
            if (existing == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy đối tượng
            }
            // Cập nhật các thuộc tính của đối tượng hiện tại với giá trị từ đối tượng category
            _context.Entry(existing).CurrentValues.SetValues(menu);
            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();
            return Json(new { code = 200, data = "success", message = "success" });
        }
        catch (Exception ex)
        {
            // Xử lý exception nếu có
            return Json(new { code = 500, data = ex.Message, message = "error" });
        }

        // Trả về ModelState.Errors nếu ModelState không hợp lệ
        // return Json(new { code = 400, data = ModelState, message = "invalid data" });
    }
}