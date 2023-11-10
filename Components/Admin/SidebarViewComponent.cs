using Microsoft.AspNetCore.Mvc;

[ViewComponent(Name = "SidebarAdmin")]
public class SidebarAdmin : ViewComponent{
    private readonly CellPhoneDB _cellPhone;
    public SidebarAdmin (CellPhoneDB cellPhone){
        _cellPhone = cellPhone;
    }
    public async Task<IViewComponentResult> InvokeAsync() {

            return await Task.FromResult((IViewComponentResult)View("SidebarAdmin"));
        }
}