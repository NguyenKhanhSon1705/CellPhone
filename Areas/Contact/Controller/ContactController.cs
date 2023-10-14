
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
[Area("Contact")]
[Route("/admin/contact/[action]")]
// /Contact/Contact/Index
public class ContactController : Controller
{
    private readonly CellPhoneDB _context;
    private IEmailSender _emailSender;
    [TempData]
    public string StatusMessage { get; set; }
    public ContactController(CellPhoneDB context , IEmailSender sendmail)
    {
        _context = context;
        _emailSender = sendmail;
    }
    [HttpGet]
    public async Task<IActionResult> Index()
    {
        return View();
        // return Json(new {code = 200 , list = ListContact, message = "Success"});
    }
    [HttpGet]
    public JsonResult ViewContact()
    {
        var ListContact = _context.contacts.ToList();
        // return View();
        return Json(new {code = 200 , list = ListContact, message = "Success"});
    }

    [HttpPost()]
    public async Task<IActionResult> Details(int id)
    {
        try{
            var detail = await _context.contacts.Where(i => i.Id == id).FirstOrDefaultAsync();
              return Json(new{code = 200 , details = detail , message = "Thành Công"});
            
        }catch (Exception ex){
              return Json(new{code = 200 , message = ex.Message});

        }
    }

    [HttpPost()]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var contact = await _context.contacts.FindAsync(id);
            _context.contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return Json(new { code = 200, message = "thành công" });
        }
        catch (Exception ex)
        {
            return Json(new
            {
                code = 500,
                message = "Xóa không thành công"
            });
        }
    }

    [HttpGet("/contact")]
    public  IActionResult SendContact()
    {
        return View();
    }

    [HttpPost("/contact")]
    public async Task<IActionResult> SendContact([Bind("FullName,Email,Message,Phone")] ContactModel contact)
    {
        if (ModelState.IsValid)
        {
            contact.DateSend = DateTime.Now;
            contact.Status = 0;
            _context.Add(contact);
            await _context.SaveChangesAsync();
            // await _emailSender.SendEmailAsync("nguyenkhanhsonzero@gmail.com", "Liên hệ", contact.Message);
            StatusMessage = "Liên hệ của bạn đã được gửi";
            return RedirectToAction("Thanks");
        }
        return View(contact);
    }
    [HttpGet("/Thanks")]
    public IActionResult Thanks()
    {
        return View();
    }



}