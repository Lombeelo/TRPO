namespace TRPO3.Models;
public sealed class Subject
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Professor> Professors { get; set; } = new List<Professor>();
    public ICollection<Group> Groups { get; set; } = new List<Group>();
}