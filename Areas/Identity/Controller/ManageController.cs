using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

[Area("Identity")]
[Route("/Manage/[action]")]
[Authorize]
public class ManageController : Controller
{
    private readonly UserManager<AppUserModel> _userManager;
    private readonly SignInManager<AppUserModel> _signInManager;
    private readonly ILogger<ManageController> _logger;

    public ManageController(UserManager<AppUserModel> userManager,
        SignInManager<AppUserModel> signInManager,
        ILogger<ManageController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _logger = logger;
    }
    public Task<AppUserModel> GetCurrentUserAsync()
    {
        return _userManager.GetUserAsync(HttpContext.User);
    }
    [HttpGet]
    public IActionResult ProfileUser()
    {
        return View();
    }
    public async Task<IActionResult> ProfileUserJson()
    {
        var user = await GetCurrentUserAsync();
        var profileUser = new ProfileUserModel()
        {
            FullName = user.FullName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            Address = user.Address,
            BirthDay = user.Birthday,
            CreationDate = user.CreationDate,
            Gender = user.Gender
        };
        return Json(new { code = 200, data = profileUser, message = "Success" });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> EditProfile(ProfileUserModel profile)
    {
        var infoUser = await GetCurrentUserAsync();
        var findUser = await _userManager.FindByEmailAsync(infoUser.Email);
        if (findUser != null)
        {
            findUser.FullName = profile.FullName;
            findUser.PhoneNumber = profile.PhoneNumber;
            findUser.Address = profile.Address;
            findUser.Birthday = profile.BirthDay;
            findUser.Gender = profile.Gender;
            var result = await _userManager.UpdateAsync(findUser);
            // await _signInManager.RefreshSignInAsync(findUser);
            if (result.Succeeded)
            {
                return Json(new { code = 200, message = "success" });
            }
        }
        return Json(new { code = 500, message = "error" });
    }

    [HttpGet]
    public IActionResult ChangePassword()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }
        var user = await GetCurrentUserAsync();
        if (user != null)
        {
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                _logger.LogInformation(3, "User changed their password successfully.");
                return RedirectToAction("ProfileUser");
            }
            else
            {
                ModelState.AddModelError("OldPasswordError", "Sai mật khẩu cũ");
                // Thay vì chuyển hướng, quay lại view ChangePassword với thông báo lỗi
                return View(model);
            }
        }
        return RedirectToAction("ChangePassword");
    }

}