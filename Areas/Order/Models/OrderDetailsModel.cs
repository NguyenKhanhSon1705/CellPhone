using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class OrderDetailsModel
{
    [Key]
    public int ID { get; set; }
    public int ProductID { get; set; }
    public int OrderID { get; set; }
    public int Quantity { set; get; }
    [ForeignKey("ProductID")]
    public ProductModel products { get; set; }
    [ForeignKey("OrderID")]

    [JsonIgnore]
    public OrderModel order { get; set; }
}