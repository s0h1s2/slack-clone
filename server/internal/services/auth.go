package services

type Auth interface {
	GenerateAccessToken(email string) (string, error)
}
