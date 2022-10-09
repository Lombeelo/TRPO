public sealed class Subject
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Professor> Professors { get; set; } = new List<Professor>();
}