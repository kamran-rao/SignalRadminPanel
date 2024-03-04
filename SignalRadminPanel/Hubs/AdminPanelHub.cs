using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SignalRadminPanel.Data;
using SignalRadminPanel.Models;

namespace SignalRadminPanel.Hubs
{
    public class AdminPanelHub: Hub
    {
        private readonly ApplicationDbContext _db;
        public AdminPanelHub(ApplicationDbContext db)
        {
            _db = db;
        }
        //custom work
        public async Task NewUserInserted(User newUser)
        {
            // Add logic to insert the new user into the database
            _db.Users.Add(newUser);
            await _db.SaveChangesAsync();

            // Notify all clients about the new user
            await Clients.All.SendAsync("updateUsers", await GetAllUsers());
        }
        public async Task<List<User>> GetAllUsers()
        {
            // Retrieve all users from the database
            var users = await _db.Users.ToListAsync(); // Adjust this based on your actual query

            // Notify all clients about the updated user list
            await Clients.All.SendAsync("updateUsers", users);
            return users;
        }
    }
}
