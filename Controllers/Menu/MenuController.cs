using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class MenuController : Controller
{
    private readonly CellPhoneDB _context;

    public MenuController(CellPhoneDB context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpGet("/menu")]
    public async Task<IActionResult> IndexJson()
    {
        var s = await _context.categoryProducts
                .Include(p => p.CategoryChildren)
                .ThenInclude(p => p.productCategoryProduct)
                .Where(p => p.ParentCategoryId == null)
                .ToListAsync();

        var groupedResult = from cp in _context.productCategoryProducts
                            join c in _context.categoryProducts on cp.CategoryID equals c.Id
                            join p in _context.products on cp.ProductID equals p.ProductID
                            group new { c, p } by new { c.ParentCategoryId, c.Id, c.Title } into grouped
                            select new
                            {
                                CategoryId = grouped.Key.Id,
                                CategoryName = grouped.Key.Title,

                                Products = grouped.Take(4).Select(x => new
                                {
                                    Id = x.p.ProductID,
                                    Name = x.p.Title,
                                    Slug = x.p.Slugp
                                    // Thêm các trường khác nếu cần
                                })
                            };

        var result = groupedResult.ToList();


        return Json(new { code = 200, data = s, products = groupedResult });
    }


    
}