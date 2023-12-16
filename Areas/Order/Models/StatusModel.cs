using System.ComponentModel.DataAnnotations;

public class StatusModel{
    [Key]
    public int ID {set;get;}
    public string StatusName {set;get;}
    public string Description {set;get;}
}