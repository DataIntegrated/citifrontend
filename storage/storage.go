package storage

import (
	"encoding/hex"
	"math/rand"
)

// RandomID generates secure random bytes
// returns an error if something fails
func RandomID() (string, error) {
	m := make([]byte, 16)
	_, err := rand.Read(m)
	if err != nil {
		return "", err
	}
	return hex.EncodeToString(m), nil
}

// User provides the schema for a user entity
type User struct {
	ID           string // primary key
	Email        string `storm:"unique"` // this field will be indexed with a unique constraint
	Password     string
	PasswordSalt string
}
