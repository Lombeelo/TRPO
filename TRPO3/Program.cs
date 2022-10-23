using Microsoft.EntityFrameworkCore;
using TRPO3.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite("Data Source = Db.sqlite",
    o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SingleQuery)));
builder.Services.AddScoped<IScheduleTable, ScheduleTable>();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.Run();
