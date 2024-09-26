package services

type Hashing interface {
	HashPassword(password string) (string, error)
	CompareHashAndRawPassword(hashedPassword, rawPassword string) (bool, error)
}
