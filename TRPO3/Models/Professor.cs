public sealed class Professor
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public ICollection<Subject> Subjects { get; set; }
}