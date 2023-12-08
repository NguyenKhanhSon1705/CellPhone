using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Area("Products")]
[Route("/admin/products/[action]/{id?}")]
[Authorize]
public class ProductsController : Controller
{
    private readonly CellPhoneDB _context;
    private readonly UserManager<AppUserModel> _userManager;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(CellPhoneDB context, UserManager<AppUserModel> userManager, ILogger<ProductsController> logger)
    {
        _context = context;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult index()
    {
        return View();
    }

    // /admin/products/indexJson
    [HttpGet]
    public async Task<IActionResult> indexJson(int CurrentPage = 1, int SizePage = 10)
    {
        var model = new ListProductModel();
        model.CurrentPage = CurrentPage;
        model.SizePage = SizePage;
        var products = _context.products
                            .Include(p => p.Author)
                            .OrderByDescending(p => p.DateUpdated);
        int total = await products.CountAsync();
        if (total > 0)
        {
            model.Total = total;
            model.CountPage = (int)Math.Ceiling((double)model.Total / model.SizePage);

            if (model.CurrentPage < 1)
                model.CurrentPage = 1;
            if (model.CurrentPage > model.CountPage)
                model.CurrentPage = model.CountPage;

            model.listProducts = await products.Skip((model.CurrentPage - 1) * model.SizePage)
                     .Take(model.SizePage)
                     .Include(p => p.ListImage)
                     .Include(p => p.ProductCategoryProducts)
                     .ThenInclude(pc => pc.Category)
                     .Select(p => new ProductModel()
                     {
                         ProductID = p.ProductID,
                         Title = p.Title,
                         Image = p.Image,
                         Slugp = p.Slugp,
                         AuthorId = p.Author.FullName,
                         Price = p.Price,
                         Promotion = p.Promotion,
                         Inventory = p.Inventory,
                         DateCreated = p.DateCreated,
                         DateUpdated = p.DateUpdated,
                         Published = p.Published,
                         ProductCategoryProducts = p.ProductCategoryProducts,
                         ListImage = p.ListImage
                     })
                     .ToListAsync();

            model.Total = total;
            model.CurrentPage = CurrentPage;
            return Json(new { code = 200, data = model, message = "success" });
        }
        return Json(new { code = 200, data = " Chưa có bài viết nào", message = "success" });
    }


    [HttpGet]
    public IActionResult create()
    {
        return View();
    }

    // /admin/products/CreateJson
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateJson(CreateProductsModel p)
    {
        var user = await _userManager.GetUserAsync(this.User);
        if (user == null) return NotFound();
        var products = new ProductModel();
        products.AuthorId = user.Id;
        products.DateCreated = products.DateUpdated = DateTime.Now;
        products.Slugp = Functions.GenerateSlug(p.Title);
        products.Price = Convert.ToDecimal(p.Price);
        products.Promotion = Convert.ToInt16(p.Promotion);
        products.Published = Convert.ToBoolean(p.Status);
        products.Title = p.Title;

        if (p.Image != null && p.Image.Length > 0)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images/products", p.Image.FileName);
            using (var stream = System.IO.File.Create(path))
            {
                await p.Image.CopyToAsync(stream);
            }
            products.Image = "/images/products/" + p.Image.FileName;
        }
        else
        {
            products.Image = "";
        }
        _context.products.Add(products);
        if (p.CategoryIDs != null)
        {
            foreach (var CateId in p.CategoryIDs)
            {
                _context.Add(new ProductCategoryProductModel()
                {
                    CategoryID = CateId,
                    Product = products
                });
            }
        }
        await _context.SaveChangesAsync();
        return Json(new { code = 200, data = "Success", message = "Success" });

    }


    // /admin/products/details/20
    [HttpGet]
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null) return NotFound();

        var product =await _context.products
                        .Include(p => p.ListImage)
                     .Include(p => p.ProductCategoryProducts)
                     .ThenInclude(pc => pc.Category)
                     .Select(p => new ProductModel()
                     {
                         ProductID = p.ProductID,
                         Title = p.Title,
                         Image = p.Image,
                         Slugp = p.Slugp,
                         AuthorId = p.Author.FullName,
                         Price = p.Price,
                         Promotion = p.Promotion,
                         Inventory = p.Inventory,
                         DateCreated = p.DateCreated,
                         DateUpdated = p.DateUpdated,
                         Published = p.Published,
                         ProductCategoryProducts = p.ProductCategoryProducts,
                         ListImage = p.ListImage
                     }).FirstOrDefaultAsync(p=> p.ProductID == id);

                     return View(product);
        return Json(new { code = 200, data = product  , message = "Success"});
    }




}