using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

public class CartService
{
        // Key lưu chuỗi json của Cart
    public const string CARTKEY = "cart";
    public const string CHECKOUTKEY = "checkout";

    private readonly IHttpContextAccessor _context;

    private readonly HttpContext HttpContext;

    public CartService(IHttpContextAccessor context)
    {
        _context = context;
        HttpContext = context.HttpContext;
    }


    // Lấy cart từ Session (danh sách CartItem)
    public List<CartItem> GetCartItems () {

        var session = HttpContext.Session;
        string jsoncart = session.GetString (CARTKEY);
        if (jsoncart != null) {
            return JsonConvert.DeserializeObject<List<CartItem>> (jsoncart);
        }
        return new List<CartItem> ();
    }

    // Xóa cart khỏi session
    public  void ClearCart () {
        var session = HttpContext.Session;
        session.Remove (CARTKEY);
    }
    public  void ClearCartCheckout () {
        var session = HttpContext.Session;
        session.Remove (CHECKOUTKEY);
    }

    // Lưu Cart (Danh sách CartItem) vào session
    public  void SaveCartSession (List<CartItem> ls) {
        var session = HttpContext.Session;
        string jsoncart = JsonConvert.SerializeObject (ls);
        session.SetString (CARTKEY, jsoncart);
    }       

    public  void SaveCartCheckout (List<CartItem> ls) {
        var session = HttpContext.Session;
        string jsoncart = JsonConvert.SerializeObject (ls);
        session.SetString (CHECKOUTKEY, jsoncart);
    }   

    public List<CartItem> GetCheckout () {

        var session = HttpContext.Session;
        string jsoncart = session.GetString (CHECKOUTKEY);
        if (jsoncart != null) {
            return JsonConvert.DeserializeObject<List<CartItem>> (jsoncart);
        }
        return new List<CartItem> ();
    }   

}