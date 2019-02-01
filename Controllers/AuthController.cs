using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Fuse.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        public AuthController()
        {
        }

        [System.Web.Http.AllowAnonymous]
        [HttpPost]
        [ActionName("signin")]
        public bool SignIn(string email, string password)
        {
            var user = new User
            {
                Email = email,
                Password = password
            };
            return false;
        }

        public new class User
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

    }
}
