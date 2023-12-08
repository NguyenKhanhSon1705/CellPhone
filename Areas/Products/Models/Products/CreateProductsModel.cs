public class CreateProductsModel : ProductDetailModel
{
    public string Title { set; get; }
    public IFormFile Image { set; get; }
    public string ImageString { set; get; }
    public string Author { set; get; }
    public string Price { set; get; }
    public int Status {set; get;}
    public string Promotion { set; get; }
    public int[] CategoryIDs { get; set; }
    // public List<IFormFile> ListImage { get; set; }

}