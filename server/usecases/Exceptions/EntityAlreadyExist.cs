namespace Usecases.exceptions;

public class EntityAlreadyExist:Exception
{
    public EntityAlreadyExist(){}
    public EntityAlreadyExist(string message):base(message)
    {
    }
}