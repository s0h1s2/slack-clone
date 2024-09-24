package infrastructure

type jwtGenerator struct{}

func NewJwtGenerator() *jwtGenerator {
	return &jwtGenerator{}
}
func (a *jwtGenerator) GenerateAccessToken() (string, error) {
	return "token", nil
}
