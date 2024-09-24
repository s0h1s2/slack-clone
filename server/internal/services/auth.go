package services

type Auth interface {
	GenerateAccessToken() (string, error)
}
