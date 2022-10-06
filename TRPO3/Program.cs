using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

string DbPath = $"{Directory.GetCurrentDirectory()}/TestingDb.sqlite";

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite("Data Source={DbPath}"));
builder.Services.AddScoped<IScheduleTable, ScheduleTable>();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.Run();
