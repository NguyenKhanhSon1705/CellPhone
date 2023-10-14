using Microsoft.AspNetCore.Mvc;

[Area("Database")]
[Route("/DbManage/[action]")]
public class DbManageController : Controller{

    public IActionResult Index(){
        return View();
    }
    
}