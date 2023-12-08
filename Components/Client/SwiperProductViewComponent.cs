using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CellPhone.Components.Client
{
    [ViewComponent(Name ="SwiperProducts")]
    public class SwiperProductsViewComponent : ViewComponent
    {
        private readonly CellPhoneDB _context;
        public SwiperProductsViewComponent(CellPhoneDB context) { 
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var p = await _context.products.Take(20).Where(pr => pr.Published == true).ToListAsync();
            return View(p);
        }
    }
}
