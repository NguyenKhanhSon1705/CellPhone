using Microsoft.AspNetCore.Mvc;

namespace CellPhone.Components.Client
{
    [ViewComponent(Name ="SwiperProducts")]
    public class SwiperProductsViewComponent : ViewComponent
    {
        public SwiperProductsViewComponent() { 
            
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            return View("Default");
        }
    }
}
