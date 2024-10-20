namespace services

public class UserService{
    private IJwtGenerator _jwtGenerator
    private IUserRepoistory _userRepoistory
    public Login(IUserRepoistory userRepoistory,IJwtGenerator jwtGenerator)
    {   
        _userRepoistory=userRepoistory
        _jwtGenerator=jwtGenerator;
    }
    public void Login(){

    }
}
