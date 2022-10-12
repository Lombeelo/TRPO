using Microsoft.EntityFrameworkCore;
using TRPO3.Data;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite("Data Source = TestingDb.sqlite"));
builder.Services.AddScoped<IScheduleTable, ScheduleTable>();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.Run();
