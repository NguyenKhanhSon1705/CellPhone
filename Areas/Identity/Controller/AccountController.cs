using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
[Area("Identity")]
[Route("/Account/[action]")]
public class AccountController : Controller
{
    private readonly UserManager<AppUserModel> _userManager;
    private readonly SignInManager<AppUserModel> _signInManager;
    private readonly IEmailSender _emailSender;
    private readonly ILogger<AccountController> _logger;
    public AccountController(UserManager<AppUserModel> userManager,
            SignInManager<AppUserModel> signInManager,
            IEmailSender emailSender,
            ILogger<AccountController> logger)
    {
        _emailSender = emailSender;
        _signInManager = signInManager;
        _userManager = userManager;
        _logger = logger;
    }
    [HttpGet]
    public IActionResult RegisterConfirmation()
    {
        return View();
    }
    [HttpGet]
    [AllowAnonymous]
    public IActionResult Register(string returnUrl)
    {
        returnUrl ??= Url.Content("~/");
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    [AllowAnonymous]
    public async Task<IActionResult> Register(RegisterModel register, string returnUrl)
    {
        returnUrl ??= Url.Content("~/");
        ViewData["ReturnUrl"] = returnUrl;
        if (ModelState.IsValid)
        {
            var user = new AppUserModel { UserName = register.Email, Email = register.Email };
            var result = await _userManager.CreateAsync(user, register.Password);
            if (result.Succeeded)
            {
                _logger.LogInformation("Created new user");

                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                var callbackUrl = Url.ActionLink(
                    action: nameof(ConfirmEmail),
                    values: new
                    {
                        area = "Identity",
                        userId = user.Id,
                        code = code
                    },
                    protocol: Request.Scheme
                );
                await _emailSender.SendEmailAsync(register.Email,
                "Xác nhận email",
                @$"Hãy <a href= '{HtmlEncoder.Default.Encode(callbackUrl)}'>bấm vào đây</a> 
                để xác nhận tài khoản.");

                if (_userManager.Options.SignIn.RequireConfirmedAccount)
                {
                    return LocalRedirect(Url.Action(nameof(RegisterConfirmation)));
                }
                else
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return LocalRedirect(returnUrl);
                }
            }
            ModelState.AddModelError("result", "Lỗi");
        }
        return View(register);
    }

    public async Task<IActionResult> ConfirmEmail(string userId, string code)
    {
        if (userId == null || code == null)
        {
            return View("ErrorConfirmEmail");
        }
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return View("ErrorConfirmEmail");
        }
        code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
        var result = await _userManager.ConfirmEmailAsync(user, code);
        return View(result.Succeeded ? "ConfirmEmail" : "ErrorConfirmEmail");
    }
    [HttpGet("/admin/login")]
    public IActionResult LoginAdmin(){
        return View();
    }
    [HttpGet]
    [AllowAnonymous]
    public IActionResult Login(string returnUrl = null)
    {
        // ViewData["ReturnUrl"] = returnUrl;
        return View();
    }
    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LogInModel login, string returnUrl = null)
    {
        if (ModelState.IsValid)
        {
            var result = await _signInManager.PasswordSignInAsync(login.Email, login.Password, login.RememberMe, lockoutOnFailure: true);
            if (!result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(login.Email);
                if (user != null)
                {
                    result = await _signInManager.PasswordSignInAsync(user.Email, login.Password, login.RememberMe, lockoutOnFailure: true);
                }
            }
            if (result.Succeeded)
            {
                _logger.LogInformation(1, "User logged in.");

                return LocalRedirect(returnUrl);
            }
            if (result.IsLockedOut)
            {
                _logger.LogWarning(2, "Tài khoản bị khóa");
                return View("Lockout");
            }
            else if (!result.Succeeded)
            {
                ModelState.AddModelError("1", "Tài khoản hoặc mật khẩu không đúng");
                return View(login);
            }
        }
        return View(login);
    }
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        _logger.LogInformation("Logout Successful");
        return RedirectToAction("index", "HOME");
    }

    
}