using System.ComponentModel.DataAnnotations.Schema;

public class OrderDetailsModel{
    public int ProductID {get;set;}
    public int OrderID {get;set;}
    public int Quantity {set;get;}
    [ForeignKey("ProductID")]
    public ProductModel products {get;set;}
    [ForeignKey("OrderID")]
    public OrderModel order {get;set;}
}