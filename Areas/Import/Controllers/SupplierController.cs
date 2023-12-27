using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class SupplierController: Controller{
    private readonly CellPhoneDB _context;

    public SupplierController(CellPhoneDB context)
    {
        _context = context;
    }
    public  IActionResult index(){
      return View();
    }
    public async Task<IActionResult> indexJson(){
        var sp =  await _context.suppliers.ToListAsync();
        return Json(new{code = 200, data = sp, message = "success"});
    }
    public async Task<IActionResult> Create(CreateSupplier sp){
        
        return Json(new{code =200, data = "success", message = "success"});
    }
}