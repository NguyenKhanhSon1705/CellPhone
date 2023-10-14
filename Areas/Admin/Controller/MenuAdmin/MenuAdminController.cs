using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
[Area("Admin")]
[Route("/MenuManage/[action]")]
// /menumanage/index
public class MenuAdminController : Controller
{
    private readonly CellPhoneDB _menuadmin;
    public MenuAdminController(CellPhoneDB menuAdmin)
    {
        _menuadmin = menuAdmin;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        
        return View();
    }
    
    [BindProperty]
    public MenuAdminModel menuAdmin { get; set; }

    [HttpGet]
    public async Task<IActionResult> Create()
    {
    //    await _mailService.SendEmailAsync("nks5k3@gmail.com" , "Notications","Tôi đã gửi thành công email rồi kakaan");
        
        return View();
    }
}