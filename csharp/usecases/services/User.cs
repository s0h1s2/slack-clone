using usecases.entites;
using usecases.repository;

namespace usecases.services;

public class UserService
{
    IUserRepository userRepository;
    public UserService(IUserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public LoginReponse? LoginUser(string email, string password)
    {
        var user=userRepository.GetUserByEmail(email);
        return null;
    }
}

public class LoginReponse
{
    string accessToken { get; set; }
    string refreshToken { get; set; }
}

