using System.ComponentModel.DataAnnotations;

public class MenuAdminModel
{
    [Key]
    public int MenuID { get; set; }
    public string? MenuName { get; set; }
    public string? ControllerName { get; set; }
    public string? ActionName { get; set; }
    public string? Link { get; set; }
    public string? Icon { get; set; }
    public int Levels { get; set; }
    public int ParentID { get; set; }
    public int MenuOrder { get; set; }
    public int Position { get; set; }
    public bool? IsActive { get; set; }
}