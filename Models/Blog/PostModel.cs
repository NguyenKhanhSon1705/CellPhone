using System.ComponentModel.DataAnnotations;

public class PostModel{
    public int ID {get; set;}
    public string Title {get; set;}
    public string AbstractTitle {get; set;}
    public string Image {get; set;}
    public string Link {get; set;}
    public int PostOrder {get; set;}
    public string Author {get; set;}
    public DateTime CreationDate {get; set;}
    [Display(Name = "Ngày cập nhật")]
            public DateTime DateUpdated {set; get;}
    public int IsActive {get; set;}
    public int Status {get; set;}
    public int ViewCount {get; set;}

}