
using Microsoft.EntityFrameworkCore;var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions();
var maisetting = builder.Configuration.GetSection("MailSettings");
builder.Services.Configure<MailSettings>(maisetting);
builder.Services.AddSingleton<IEmailSender,SendMailService>();


// Add services to the container.
builder.Services.AddDbContext<CellPhoneDB>(options =>
{
    string connect = builder.Configuration.GetConnectionString("connection");
    options.UseMySQL(connect);
});

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.MapControllers();

// app.MapAreaControllerRoute(
//     name: "default",
//     pattern: "/{controller=LogIn}/{action=LogIn}/{id?}",
//     areaName: "LogIn"
// );

app.MapControllerRoute(
    name: "default",
    pattern: "/{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages();

app.Run();
